import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { SessionsService } from "./sessions.service";
import { Public } from "../auth/clerk.guard";

@ApiTags("Sessions")
@Controller("sessions")
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Public()
  @Get(":token")
  @ApiOperation({ summary: "Load table session context (public)" })
  getContext(@Param("token") token: string) {
    return this.sessionsService.getContext(token);
  }
}
