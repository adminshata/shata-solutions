import { Module } from "@nestjs/common";
import { PaymentsController } from "./payments.controller";
import { PaymentsService } from "./payments.service";
import { StripeProvider } from "./providers/stripe.provider";
import { PaymobProvider } from "./providers/paymob.provider";
import { FawryProvider } from "./providers/fawry.provider";
import { TabbyProvider } from "./providers/tabby.provider";
import { TamaraProvider } from "./providers/tamara.provider";

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, StripeProvider, PaymobProvider, FawryProvider, TabbyProvider, TamaraProvider],
  exports: [PaymentsService, PaymobProvider, FawryProvider, TabbyProvider, TamaraProvider],
})
export class PaymentsModule {}
