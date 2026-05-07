import { ReferencePageShell } from "@/components/templates/supermarket5/pages/ReferencePageShell";

export default function PrivacyPolicyPage() {
  return (
    <ReferencePageShell title="Privacy Policy" subtitle="How VividMart handles customer and delivery information.">
      <PolicyCopy />
    </ReferencePageShell>
  );
}

function PolicyCopy() {
  return (
    <div style={{ background: "#fff", borderRadius: 12, padding: 32, lineHeight: 1.9 }}>
      <h4>Information we collect</h4>
      <p>VividMart stores customer, account, order, delivery, and support details needed to process grocery purchases and marketplace vendor services.</p>
      <h4>How we use it</h4>
      <p>Information is used for checkout, delivery, order tracking, customer support, fraud prevention, and improving the storefront experience.</p>
      <h4>Customer choices</h4>
      <p>Customers can update account details, manage communication preferences, and request support for stored order information.</p>
    </div>
  );
}
