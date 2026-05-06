import { ReferencePageShell } from "@/components/templates/supermarket2/pages/ReferencePageShell";

export default function CookiesPolicyPage() {
  return (
    <ReferencePageShell title="Cookies Policy" subtitle="Cookies keep carts, preferences, and storefront settings working.">
      <div style={{ background: "#fff", borderRadius: 12, padding: 32, lineHeight: 1.9 }}>
        <h4>Essential cookies</h4>
        <p>Essential cookies keep the cart, login, checkout, and order tracking features available.</p>
        <h4>Preference cookies</h4>
        <p>Preference cookies remember language, currency, store, and display choices.</p>
        <h4>Analytics cookies</h4>
        <p>Analytics cookies help QuickMart improve product discovery, checkout steps, and vendor pages.</p>
      </div>
    </ReferencePageShell>
  );
}
