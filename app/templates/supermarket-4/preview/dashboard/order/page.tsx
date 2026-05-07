import { DashboardShell, DataTable } from "@/components/templates/supermarket4/dashboard/DashboardShell";

export default function DashboardOrderPage() {
  return (
    <DashboardShell title="Orders" subtitle="Customer grocery orders from the reference dashboard.">
      <DataTable
        headers={["Order ID", "Date", "Customer", "Payment", "Status", "Total"]}
        rows={[
          ["#QM-1050", "May 6, 2026", "Floyd Miles", "Card", "Processing", "$142.80"],
          ["#QM-1049", "May 5, 2026", "Dianne Russell", "Cash", "On the way", "$67.25"],
          ["#QM-1048", "May 5, 2026", "Cody Fisher", "Card", "Delivered", "$218.10"],
          ["#QM-1047", "May 4, 2026", "Kristin Watson", "Wallet", "Delivered", "$94.60"],
        ]}
      />
    </DashboardShell>
  );
}
