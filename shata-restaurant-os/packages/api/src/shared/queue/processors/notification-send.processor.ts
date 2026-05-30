import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Logger } from "@nestjs/common";
import { Job } from "bullmq";
import { ConfigService } from "@nestjs/config";
import { QUEUES, JOBS } from "../queue.constants";

export interface PushNotificationJob {
  playerIds: string[];
  title: string;
  body: string;
  data?: Record<string, string>;
}

@Processor(QUEUES.NOTIFICATION_SEND)
export class NotificationSendProcessor extends WorkerHost {
  private readonly logger = new Logger(NotificationSendProcessor.name);
  private readonly appId: string;
  private readonly apiKey: string;

  constructor(private readonly config: ConfigService) {
    super();
    this.appId = config.get<string>("app.onesignal.appId") ?? "";
    this.apiKey = config.get<string>("app.onesignal.apiKey") ?? "";
  }

  async process(job: Job<PushNotificationJob>): Promise<void> {
    if (job.name !== JOBS.SEND_PUSH) return;

    const { playerIds, title, body, data } = job.data;

    if (!this.appId || !this.apiKey) {
      this.logger.warn("OneSignal not configured — skip notification");
      return;
    }

    if (!playerIds.length) return;

    try {
      const res = await fetch("https://onesignal.com/api/v1/notifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${this.apiKey}`,
        },
        body: JSON.stringify({
          app_id: this.appId,
          include_player_ids: playerIds,
          headings: { en: title },
          contents: { en: body },
          data: data ?? {},
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(`OneSignal error ${res.status}: ${err}`);
      }

      this.logger.debug(`Push sent to ${playerIds.length} device(s): ${title}`);
    } catch (err) {
      this.logger.error("Push notification failed", err);
      throw err; // BullMQ will retry per job options
    }
  }
}
