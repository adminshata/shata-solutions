import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SignJWT, jwtVerify } from "jose";
import { TextEncoder } from "util";

export interface SessionTokenPayload {
  tableId: string;
  restaurantId: string;
}

@Injectable()
export class SessionTokenService {
  private secret: Uint8Array;

  constructor(private readonly config: ConfigService) {
    const raw = config.get<string>("app.sessionTokenSecret") ?? "";
    this.secret = new TextEncoder().encode(raw);
  }

  async sign(payload: SessionTokenPayload): Promise<string> {
    return new SignJWT({ ...payload })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(this.secret);
  }

  async verify(token: string): Promise<SessionTokenPayload> {
    const { payload } = await jwtVerify(token, this.secret);
    return {
      tableId: payload["tableId"] as string,
      restaurantId: payload["restaurantId"] as string,
    };
  }
}
