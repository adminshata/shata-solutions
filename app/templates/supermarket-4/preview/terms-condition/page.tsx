import { ReferencePageShell } from "@/components/templates/supermarket4/pages/ReferencePageShell";

export default function TermsConditionPage() {
  return (
    <ReferencePageShell title="Terms & Condition" subtitle="Reference store terms for OrangeMart orders and marketplace vendors.">
      <div style={{ background: "#fff", borderRadius: 12, padding: 32, lineHeight: 1.9 }}>
        <h4>Orders and availability</h4>
        <p>Product availability, prices, discounts, and vendor listings may change based on store inventory and delivery windows.</p>
        <h4>Delivery</h4>
        <p>Delivery estimates are provided during checkout and may vary by address, basket size, and carrier capacity.</p>
        <h4>Returns</h4>
        <p>Return and refund requests are reviewed according to product condition, vendor policy, and order history.</p>
      </div>
    </ReferencePageShell>
  );
}
