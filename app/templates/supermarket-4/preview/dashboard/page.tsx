import { DashboardShell, StatCard, DataTable } from "@/components/templates/supermarket4/dashboard/DashboardShell";

export default function DashboardPage() {
  return (
    <DashboardShell title="Dashboard" subtitle="Reference ecommerce account and vendor overview.">
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Total sales" value="$24,560" note="12% up this month" />
        <StatCard label="Orders" value="1,248" note="168 pending delivery" />
        <StatCard label="Products" value="238" note="OrangeMart catalog" />
        <StatCard label="Vendors" value="32" note="Active marketplace stores" />
      </div>
      <div className="mt-6">
        <DataTable
          headers={["Order", "Customer", "Status", "Total"]}
          rows={[
            ["#QM-1042", "Jenny Wilson", "Processing", "$125.00"],
            ["#QM-1041", "Brooklyn Simmons", "Delivered", "$89.40"],
            ["#QM-1040", "Robert Fox", "On the way", "$234.20"],
          ]}
        />
      </div>
    </DashboardShell>
  );
}
