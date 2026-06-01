import { Controller, Post, Get, Patch, Body, Param, Query } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { ReviewsService, SubmitReviewDto } from "./reviews.service";
import { Public } from "../auth/clerk.guard";

@ApiTags("Reviews")
@Controller()
export class ReviewsController {
  constructor(private readonly svc: ReviewsService) {}

  @Public()
  @Post("orders/:orderId/review")
  @ApiOperation({ summary: "Submit a review for an order (public, one per order)" })
  submit(@Param("orderId") orderId: string, @Body() dto: SubmitReviewDto) {
    return this.svc.submitReview(orderId, dto);
  }

  @ApiBearerAuth()
  @Get("dashboard/reviews")
  @ApiOperation({ summary: "Get reviews with KPIs and rating breakdown" })
  getReviews(
    @Query("restaurantId") restaurantId: string,
    @Query("rating") rating?: string,
    @Query("page") page = "1",
    @Query("from") from?: string,
    @Query("to") to?: string,
  ) {
    return this.svc.getReviews(restaurantId, { rating: rating ? parseInt(rating) : undefined, page: parseInt(page), from, to });
  }

  @ApiBearerAuth()
  @Patch("dashboard/reviews/:id/reply")
  @ApiOperation({ summary: "Reply to a review (manager/owner only)" })
  reply(@Param("id") id: string, @Body() body: { reply: string }) {
    return this.svc.replyToReview(id, body.reply);
  }
}
