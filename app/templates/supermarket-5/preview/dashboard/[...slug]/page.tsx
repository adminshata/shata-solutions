import { DashboardShell, DataTable } from "@/components/templates/supermarket5/dashboard/DashboardShell";

const TITLES: Record<string, string> = {
  "order-details": "Order Details",
  "add-product": "Add Product",
  "vendor-grid": "Vendor Grid",
  "vendor-list": "Vendor List",
  "vendor-details": "Vendor Details",
  "vendor-create": "Create Vendor",
  "create-vendors": "Create Vendors",
  transaction: "Transactions",
  review: "Reviews",
  brand: "Brand",
  payment: "Payment",
  "profile-setting": "Profile Setting",
  "log-in": "Log In",
  registration: "Registration",
};

export default async function DashboardFallbackPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug: parts } = await params;
  const slug = parts.join("/");
  const title = TITLES[slug] ?? slug.split("-").map((part) => part[0]?.toUpperCase() + part.slice(1)).join(" ");
  return (
    <DashboardShell title={title} subtitle="Reference dashboard page restored for navigation completeness.">
      <DataTable
        headers={["Section", "Status", "Owner"]}
        rows={[
          [title, "Ready", "VividMart"],
          ["Reference conversion", "Available", "Supermarket 2"],
          ["Admin editor", "Separate Shata template editor", "/preview/admin"],
        ]}
      />
    </DashboardShell>
  );
}
