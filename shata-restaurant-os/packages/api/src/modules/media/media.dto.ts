import { IsString, IsIn, IsInt, Min, Max, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class PresignUploadDto {
  @ApiProperty({ example: "menu-item.jpg" })
  @IsString()
  @Matches(/^[\w\-. ]+$/, { message: "fileName contains invalid characters" })
  fileName!: string;

  @ApiProperty({ example: "image/jpeg", enum: ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"] })
  @IsIn(["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"])
  contentType!: string;

  @ApiProperty({ example: 204800 })
  @IsInt()
  @Min(1)
  @Max(10 * 1024 * 1024)
  contentLength!: number;

  @ApiProperty({ example: "products", enum: ["products", "categories", "logos", "banners"] })
  @IsIn(["products", "categories", "logos", "banners"])
  folder!: string;
}

export class UpdateProductImageDto {
  @ApiProperty({ example: "https://media.shataos.com/products/rest-id/uuid.jpg" })
  @IsString()
  imageUrl!: string;
}
