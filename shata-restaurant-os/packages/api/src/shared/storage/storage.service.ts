import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  S3Client,
  DeleteObjectCommand,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import * as path from "path";

export interface PresignResult {
  uploadUrl: string;
  publicUrl: string;
  key: string;
}

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
]);

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);
  private readonly s3: S3Client;
  private readonly bucket: string;
  private readonly publicUrl: string;

  constructor(private readonly config: ConfigService) {
    const endpoint = this.config.get<string>("app.cloudflare.r2Endpoint") ?? "";
    const accessKeyId = this.config.get<string>("app.cloudflare.r2AccessKey") ?? "";
    const secretAccessKey = this.config.get<string>("app.cloudflare.r2SecretKey") ?? "";

    this.bucket = this.config.get<string>("app.cloudflare.r2Bucket") ?? "shata-media";
    this.publicUrl = this.config.get<string>("app.cloudflare.r2PublicUrl") ?? "";

    this.s3 = new S3Client({
      region: "auto",
      endpoint,
      credentials: { accessKeyId, secretAccessKey },
    });
  }

  async presignUpload(opts: {
    restaurantId: string;
    folder: string;
    fileName: string;
    contentType: string;
    contentLength: number;
  }): Promise<PresignResult> {
    if (!ALLOWED_MIME_TYPES.has(opts.contentType)) {
      throw new Error(`Unsupported content type: ${opts.contentType}`);
    }
    if (opts.contentLength > MAX_FILE_SIZE_BYTES) {
      throw new Error(`File too large (max ${MAX_FILE_SIZE_BYTES / 1024 / 1024} MB)`);
    }

    const ext = path.extname(opts.fileName) || this.extFromMime(opts.contentType);
    const key = `${opts.folder}/${opts.restaurantId}/${randomUUID()}${ext}`;

    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      ContentType: opts.contentType,
      ContentLength: opts.contentLength,
      CacheControl: "public, max-age=31536000, immutable",
    });

    const uploadUrl = await getSignedUrl(this.s3, command, { expiresIn: 300 });
    const publicUrl = `${this.publicUrl}/${key}`;

    return { uploadUrl, publicUrl, key };
  }

  async deleteObject(key: string): Promise<void> {
    try {
      await this.s3.send(new DeleteObjectCommand({ Bucket: this.bucket, Key: key }));
    } catch (err) {
      this.logger.warn({ key, err }, "Failed to delete R2 object");
    }
  }

  async objectExists(key: string): Promise<boolean> {
    try {
      await this.s3.send(new HeadObjectCommand({ Bucket: this.bucket, Key: key }));
      return true;
    } catch {
      return false;
    }
  }

  private extFromMime(mime: string): string {
    const map: Record<string, string> = {
      "image/jpeg": ".jpg",
      "image/png": ".png",
      "image/webp": ".webp",
      "image/avif": ".avif",
      "image/gif": ".gif",
    };
    return map[mime] ?? ".bin";
  }
}
