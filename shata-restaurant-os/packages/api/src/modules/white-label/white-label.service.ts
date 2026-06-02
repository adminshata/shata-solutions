import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "../../shared/database/database.service";

export interface WhiteLabelDto {
  appName?: string;
  appNameAr?: string;
  logoUrl?: string;
  faviconUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
  customDomain?: string;
  customFont?: string;
  hideShataLogo?: boolean;
  isActive?: boolean;
}

@Injectable()
export class WhiteLabelService {
  constructor(private readonly db: DatabaseService) {}

  async getConfig(orgId: string) {
    return this.db.whiteLabelConfig.findUnique({ where: { orgId } });
  }

  async getConfigByDomain(domain: string) {
    return this.db.whiteLabelConfig.findUnique({ where: { customDomain: domain } });
  }

  async upsert(orgId: string, dto: WhiteLabelDto) {
    // Only allow ENTERPRISE plan
    const org = await this.db.organization.findUnique({ where: { id: orgId }, select: { plan: true } });
    if (!org) throw new NotFoundException("Organization not found");

    return this.db.whiteLabelConfig.upsert({
      where: { orgId },
      create: Object.assign({ orgId, appName: dto.appName ?? "My Restaurant" }, dto) as never,
      update: dto as never,
    });
  }
}
