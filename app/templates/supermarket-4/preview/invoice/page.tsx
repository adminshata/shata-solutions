import { ReferencePageShell } from "@/components/templates/supermarket4/pages/ReferencePageShell";

export default function InvoicePage() {
  return (
    <ReferencePageShell title="Invoice" subtitle="Printable reference invoice for OrangeMart grocery orders.">
      <div style={{ background: "#fff", borderRadius: 12, padding: 32, boxShadow: "0 8px 30px rgba(0,0,0,.06)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 24, flexWrap: "wrap", borderBottom: "1px solid #eee", paddingBottom: 24 }}>
          <div><h3>OrangeMart</h3><p>258 Fresh Market Street, Berlin</p><p>hello@orangemart.com</p></div>
          <div><h4>Invoice #QM-1048</h4><p>Date: May 6, 2026</p><p>Status: Paid</p></div>
        </div>
        <table style={{ width: "100%", marginTop: 24 }}>
          <tbody>
            {["Organic Fresh Fruit", "Super Fresh Meat", "Lite Fresh Fruit"].map((item, index) => (
              <tr key={item} style={{ borderBottom: "1px solid #f1f1f1" }}>
                <td style={{ padding: "16px 0" }}>{item}</td>
                <td style={{ padding: "16px 0" }}>Qty {index + 1}</td>
                <td style={{ padding: "16px 0", textAlign: "right", fontWeight: 700 }}>${(24 + index * 12).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h4 style={{ textAlign: "right", marginTop: 24 }}>Total: $108.00</h4>
      </div>
    </ReferencePageShell>
  );
}
