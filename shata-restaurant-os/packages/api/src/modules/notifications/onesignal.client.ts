import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

export interface PushPayload {
  headings: { en: string; ar?: string };
  contents: { en: string; ar?: string };
  /** Tag filters to target restaurant devices */
  restaurantId?: string;
  /** External user IDs (customer IDs) */
  externalUserIds?: string[];
  data?: Record<string, string>;
  url?: string;
}

interface OneSignalNotificationBody {
  app_id: string;
  headings: Record<string, string>;
  contents: Record<string, string>;
  filters?: Array<Record<string, string>>;
  include_aliases?: { external_id: string[] };
  target_channel?: string;
  data?: Record<string, string>;
  url?: string;
}

@Injectable()
export class OneSignalClient {
  private readonly logger = new Logger(OneSignalClient.name);
  private readonly appId: string;
  private readonly apiKey: string;
  private readonly enabled: boolean;

  constructor(private readonly config: ConfigService) {
    this.appId = this.config.get<string>("app.onesignal.appId") ?? "";
    this.apiKey = this.config.get<string>("app.onesignal.apiKey") ?? "";
    this.enabled = !!(this.appId && this.apiKey);
  }

  async send(payload: PushPayload): Promise<void> {
    if (!this.enabled) {
      this.logger.debug({ payload }, "OneSignal not configured — skipping push");
      return;
    }

    const body: OneSignalNotificationBody = {
      app_id: this.appId,
      headings: this.buildI18n(payload.headings),
      contents: this.buildI18n(payload.contents),
      data: payload.data,
      url: payload.url,
    };

    if (payload.externalUserIds?.length) {
      // Target specific customers by their external ID
      body.include_aliases = { external_id: payload.externalUserIds };
      body.target_channel = "push";
    } else if (payload.restaurantId) {
      // Target all staff devices registered to this restaurant
      body.filters = [
        { field: "tag", key: "restaurant_id", relation: "=", value: payload.restaurantId },
      ];
    } else {
      this.logger.warn("push sent with no target — skipping");
      return;
    }

    try {
      const res = await fetch("https://onesignal.com/api/v1/notifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Key ${this.apiKey}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const text = await res.text();
        this.logger.warn({ status: res.status, body: text }, "OneSignal push failed");
      }
    } catch (err) {
      this.logger.error({ err }, "OneSignal network error");
    }
  }

  private buildI18n(obj: { en: string; ar?: string }): Record<string, string> {
    const result: Record<string, string> = { en: obj.en };
    if (obj.ar) result["ar"] = obj.ar;
    return result;
  }
}
