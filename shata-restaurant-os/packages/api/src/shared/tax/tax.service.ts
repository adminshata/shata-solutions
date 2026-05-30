import { Injectable } from "@nestjs/common";
import type { TaxResult } from "@shata/types";

@Injectable()
export class TaxService {
  /**
   * Calculate tax for a given subtotal.
   * Never hardcodes any country's rate — all values come from restaurant config.
   *
   * @param subtotal  Pre-tax amount (or inclusive amount if taxInclusive=true)
   * @param taxRate   Decimal rate from restaurant, e.g. 0.14 = 14%
   * @param taxInclusive  Whether the subtotal already includes tax
   */
  calculate(subtotal: number, taxRate: number, taxInclusive: boolean): TaxResult {
    if (taxRate === 0) {
      return { subtotal, tax: 0, total: subtotal };
    }

    if (taxInclusive) {
      // Extract tax from inclusive price: tax = price * rate / (1 + rate)
      const tax = round2(subtotal * taxRate / (1 + taxRate));
      const base = round2(subtotal - tax);
      return { subtotal: base, tax, total: round2(base + tax) };
    } else {
      const tax = round2(subtotal * taxRate);
      return { subtotal, tax, total: round2(subtotal + tax) };
    }
  }
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
