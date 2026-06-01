import { Controller, Post, Patch, Body, Param, Query, Delete } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { StorageService } from "../../shared/storage/storage.service";
import { DatabaseService } from "../../shared/database/database.service";
import { PresignUploadDto, UpdateProductImageDto } from "./media.dto";

@ApiTags("Media")
@ApiBearerAuth()
@Controller("dashboard/media")
export class MediaController {
  constructor(
    private readonly storage: StorageService,
    private readonly db: DatabaseService,
  ) {}

  @Post("presign")
  @ApiOperation({ summary: "Get a presigned R2 upload URL (expires in 5 min)" })
  async presignUpload(
    @Query("restaurantId") restaurantId: string,
    @Body() dto: PresignUploadDto,
  ) {
    return this.storage.presignUpload({
      restaurantId,
      folder: dto.folder,
      fileName: dto.fileName,
      contentType: dto.contentType,
      contentLength: dto.contentLength,
    });
  }

  @Patch("products/:productId/image")
  @ApiOperation({ summary: "Set or replace the image URL on a product" })
  async setProductImage(
    @Query("restaurantId") restaurantId: string,
    @Param("productId") productId: string,
    @Body() dto: UpdateProductImageDto,
  ) {
    const existing = await this.db.product.findFirstOrThrow({
      where: { id: productId, restaurantId },
      select: { id: true, imageUrl: true },
    });

    // Delete old R2 object if it's ours
    if (existing.imageUrl) {
      const key = this.keyFromUrl(existing.imageUrl);
      if (key) await this.storage.deleteObject(key);
    }

    return this.db.product.update({
      where: { id: productId },
      data: { imageUrl: dto.imageUrl },
      select: { id: true, imageUrl: true },
    });
  }

  @Delete("products/:productId/image")
  @ApiOperation({ summary: "Remove the image from a product and delete from R2" })
  async removeProductImage(
    @Query("restaurantId") restaurantId: string,
    @Param("productId") productId: string,
  ) {
    const existing = await this.db.product.findFirstOrThrow({
      where: { id: productId, restaurantId },
      select: { id: true, imageUrl: true },
    });

    if (existing.imageUrl) {
      const key = this.keyFromUrl(existing.imageUrl);
      if (key) await this.storage.deleteObject(key);
    }

    return this.db.product.update({
      where: { id: productId },
      data: { imageUrl: null },
      select: { id: true, imageUrl: true },
    });
  }

  private keyFromUrl(url: string): string | null {
    try {
      const publicBase = process.env["CLOUDFLARE_R2_PUBLIC_URL"] ?? "";
      if (!publicBase || !url.startsWith(publicBase)) return null;
      return url.slice(publicBase.length + 1); // strip leading slash
    } catch {
      return null;
    }
  }
}
