"use server";

import { revalidatePath } from "next/cache";
import {
  addNote,
  createRequest,
  generatePaymentLink,
  getRequest,
  markPaid,
  updateStatus,
} from "@/lib/formation/store";
import type { FormationInput, FormationStatus } from "@/lib/formation/types";

/**
 * Customer-facing: submit a new formation request from the wizard.
 * Returns the generated reference code.
 */
export async function submitFormationRequest(
  input: FormationInput
): Promise<{ ok: true; code: string } | { ok: false; error: string }> {
  try {
    const req = await createRequest(input);
    revalidatePath("/admin/formation");
    revalidatePath("/admin/formation/requests");
    return { ok: true, code: req.code };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Unknown error" };
  }
}

/**
 * Customer-facing: fetch a request by reference code for the public
 * status page. Returns only the customer-safe shape (no internal notes).
 */
export async function getPublicRequest(code: string) {
  const req = await getRequest(code);
  if (!req) return null;
  // Drop internal-only notes from the customer-facing payload.
  const { notes: _ignored, ...safe } = req;
  void _ignored;
  return safe;
}

/* -------------------- Operator actions ---------------------------- */

export async function opsSetStatus(code: string, next: FormationStatus, message?: string) {
  const req = await updateStatus(code, next, message);
  revalidatePath("/admin/formation");
  revalidatePath("/admin/formation/requests");
  revalidatePath(`/admin/formation/requests/${code}`);
  revalidatePath(`/formation/${code}`);
  return req;
}

export async function opsAddNote(code: string, body: string) {
  const trimmed = body.trim();
  if (!trimmed) return null;
  const req = await addNote(code, trimmed);
  revalidatePath(`/admin/formation/requests/${code}`);
  return req;
}

export async function opsGeneratePaymentLink(code: string) {
  const req = await generatePaymentLink(code);
  revalidatePath("/admin/formation");
  revalidatePath("/admin/formation/requests");
  revalidatePath(`/admin/formation/requests/${code}`);
  revalidatePath(`/formation/${code}`);
  return req;
}

export async function opsMarkPaid(code: string) {
  const req = await markPaid(code);
  revalidatePath("/admin/formation");
  revalidatePath("/admin/formation/requests");
  revalidatePath(`/admin/formation/requests/${code}`);
  revalidatePath(`/formation/${code}`);
  return req;
}
