import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { ReviewsService } from "./reviews.service";

@Processor("review-prompt")
export class ReviewPromptProcessor extends WorkerHost {
  constructor(private readonly reviewsService: ReviewsService) {
    super();
  }

  async process(job: Job) {
    const { orderId, restaurantId, customerId } = job.data as { orderId: string; restaurantId: string; customerId: string | null };
    await this.reviewsService.sendReviewPrompt(orderId, restaurantId, customerId);
  }
}
