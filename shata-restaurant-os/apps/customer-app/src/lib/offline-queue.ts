import { openDB, IDBPDatabase } from "idb";

export interface QueuedOrder {
  id: string;          // idempotency key (generated at queue time)
  token: string;
  payload: unknown;
  queuedAt: number;    // epoch ms
  attempts: number;
}

const DB_NAME = "shata-offline";
const DB_VERSION = 1;
const STORE = "order-queue";

let _db: IDBPDatabase | null = null;

async function getDb(): Promise<IDBPDatabase> {
  if (_db) return _db;
  _db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: "id" });
      }
    },
  });
  return _db;
}

export async function enqueueOrder(token: string, payload: unknown): Promise<string> {
  const db = await getDb();
  const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const item: QueuedOrder = { id, token, payload, queuedAt: Date.now(), attempts: 0 };
  await db.put(STORE, item);
  return id;
}

export async function listQueued(): Promise<QueuedOrder[]> {
  const db = await getDb();
  return db.getAll(STORE);
}

export async function removeQueued(id: string): Promise<void> {
  const db = await getDb();
  await db.delete(STORE, id);
}

export async function incrementAttempts(id: string): Promise<void> {
  const db = await getDb();
  const item = await db.get(STORE, id) as QueuedOrder | undefined;
  if (item) await db.put(STORE, { ...item, attempts: item.attempts + 1 });
}

// Flush all queued orders by re-posting them with their idempotency key
export async function flushQueue(
  apiUrl: string,
  onFlushed?: (id: string) => void,
  onFailed?: (id: string, error: string) => void
): Promise<void> {
  const queue = await listQueued();
  for (const item of queue) {
    try {
      await incrementAttempts(item.id);
      const res = await fetch(`${apiUrl}/api/sessions/${item.token}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": item.id,
        },
        body: JSON.stringify(item.payload),
      });
      if (res.ok || res.status === 409) {
        // 409 = already processed (server dedup), treat as success
        await removeQueued(item.id);
        onFlushed?.(item.id);
      } else {
        onFailed?.(item.id, `HTTP ${res.status}`);
      }
    } catch (err) {
      onFailed?.(item.id, err instanceof Error ? err.message : String(err));
    }
  }
}
