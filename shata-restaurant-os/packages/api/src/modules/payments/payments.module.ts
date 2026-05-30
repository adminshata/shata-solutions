import { Module } from "@nestjs/common";
import { PaymentsController } from "./payments.controller";
import { PaymentsService } from "./payments.service";
import { StripeProvider } from "./providers/stripe.provider";
import { PaymobProvider } from "./providers/paymob.provider";

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, StripeProvider, PaymobProvider],
  exports: [PaymentsService, PaymobProvider],
})
export class PaymentsModule {}
