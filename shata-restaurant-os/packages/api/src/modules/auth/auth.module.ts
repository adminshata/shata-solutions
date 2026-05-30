import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { ClerkGuard } from "./clerk.guard";
import { SessionTokenService } from "./session-token.service";

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>("app.jwtSecret"),
        signOptions: { expiresIn: "7d" },
      }),
    }),
  ],
  providers: [ClerkGuard, SessionTokenService],
  exports: [ClerkGuard, SessionTokenService, JwtModule],
})
export class AuthModule {}
