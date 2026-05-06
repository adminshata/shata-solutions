"use client";
import React, { useState } from "react";
import Link from "next/link";

const BASE_PATH = "/templates/supermarket-1/preview";

const TABS = [
  { key: "overview", label: "Overview", icon: "fa-chart-line" },
  { key: "products", label: "Products", icon: "fa-box" },
  { key: "orders", label: "Orders", icon: "fa-bag-shopping" },
  { key: "settings", label: "Settings", icon: "fa-gear" },
];

const MOCK_PRODUCTS = [
  { id: 1, title: "Fresh Organic Apple", price: 4.99, stock: 120, category: "Fruits" },
  { id: 2, title: "Premium Broccoli", price: 2.49, stock: 85, category: "Vegetables" },
  { id: 3, title: "Whole Milk 1L", price: 1.99, stock: 200, category: "Dairy" },
  { id: 4, title: "Sourdough Bread", price: 3.49, stock: 45, category: "Bakery" },
  { id: 5, title: "Orange Juice 1L", price: 3.99, stock: 90, category: "Beverages" },
];

const MOCK_ORDERS = [
  { id: "#1357", customer: "John Doe", date: "2024-05-01", status: "Processing", total: 125.00 },
  { id: "#1358", customer: "Jane Smith", date: "2024-05-02", status: "Completed", total: 87.50 },
  { id: "#1359", customer: "Bob Johnson", date: "2024-05-03", status: "Shipped", total: 244.00 },
  { id: "#1360", customer: "Alice Brown", date: "2024-05-04", status: "Completed", total: 55.99 },
];

const STATUS_COLORS: Record<string, string> = {
  Processing: "#f39c12",
  Completed: "#629D23",
  Shipped: "#3498db",
  Cancelled: "#e74c3c",
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div style={{ minHeight: "100vh", background: "#f5f7f5", fontFamily: "inherit" }}>
      {/* Top Bar */}
      <div style={{ background: "#2C3C28", color: "#fff", padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ fontWeight: 800, fontSize: "20px", color: "#629D23" }}>FreshMart</span>
          <span style={{ opacity: 0.5 }}>|</span>
          <span style={{ fontSize: "14px", opacity: 0.8 }}>Admin Panel</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Link href={BASE_PATH} style={{ color: "#fff", fontSize: "13px", opacity: 0.7, textDecoration: "none" }}>
            <i className="fa-regular fa-arrow-left" style={{ marginRight: "6px" }} />View Site
          </Link>
          <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#629D23", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>
            <i className="fa-regular fa-user" />
          </div>
        </div>
      </div>

      <div style={{ display: "flex", minHeight: "calc(100vh - 56px)" }}>
        {/* Sidebar */}
        <div style={{ width: "220px", background: "#fff", borderRight: "1px solid #e8ede8", padding: "24px 0", flexShrink: 0 }}>
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                width: "100%",
                padding: "12px 24px",
                background: activeTab === tab.key ? "#f0f7ea" : "transparent",
                border: "none",
                borderLeft: activeTab === tab.key ? "3px solid #629D23" : "3px solid transparent",
                color: activeTab === tab.key ? "#629D23" : "#555",
                fontWeight: activeTab === tab.key ? 600 : 400,
                fontSize: "14px",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <i className={`fa-regular ${tab.icon}`} style={{ width: "18px" }} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: "32px" }}>

          {/* Overview */}
          {activeTab === "overview" && (
            <div>
              <h2 style={{ marginBottom: "24px", color: "#2C3C28" }}>Dashboard Overview</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "32px" }}>
                {[
                  { label: "Total Orders", value: "1,248", icon: "fa-bag-shopping", color: "#629D23" },
                  { label: "Total Revenue", value: "$48,290", icon: "fa-dollar-sign", color: "#3498db" },
                  { label: "Products", value: "523", icon: "fa-box", color: "#f39c12" },
                  { label: "Customers", value: "3,841", icon: "fa-users", color: "#9b59b6" },
                ].map((stat) => (
                  <div key={stat.label} style={{ background: "#fff", borderRadius: "10px", padding: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                      <span style={{ fontSize: "13px", color: "#888" }}>{stat.label}</span>
                      <div style={{ width: "38px", height: "38px", borderRadius: "8px", background: stat.color + "20", display: "flex", alignItems: "center", justifyContent: "center", color: stat.color }}>
                        <i className={`fa-regular ${stat.icon}`} />
                      </div>
                    </div>
                    <h3 style={{ margin: 0, fontSize: "28px", color: "#2C3C28", fontWeight: 700 }}>{stat.value}</h3>
                  </div>
                ))}
              </div>

              <div style={{ background: "#fff", borderRadius: "10px", padding: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                <h4 style={{ marginBottom: "16px", color: "#2C3C28" }}>Recent Orders</h4>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #f0f0f0" }}>
                      {["Order", "Customer", "Date", "Status", "Total"].map((h) => (
                        <th key={h} style={{ padding: "10px 12px", textAlign: "left", color: "#888", fontWeight: 600 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_ORDERS.map((order) => (
                      <tr key={order.id} style={{ borderBottom: "1px solid #f5f5f5" }}>
                        <td style={{ padding: "12px" }}>{order.id}</td>
                        <td style={{ padding: "12px" }}>{order.customer}</td>
                        <td style={{ padding: "12px", color: "#888" }}>{order.date}</td>
                        <td style={{ padding: "12px" }}>
                          <span style={{ padding: "3px 10px", borderRadius: "20px", fontSize: "12px", background: (STATUS_COLORS[order.status] ?? "#888") + "20", color: STATUS_COLORS[order.status] ?? "#888", fontWeight: 600 }}>
                            {order.status}
                          </span>
                        </td>
                        <td style={{ padding: "12px", fontWeight: 600, color: "#629D23" }}>${order.total.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Products */}
          {activeTab === "products" && (
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
                <h2 style={{ margin: 0, color: "#2C3C28" }}>Products</h2>
                <button style={{ background: "#629D23", color: "#fff", border: "none", borderRadius: "6px", padding: "10px 20px", cursor: "pointer", fontSize: "14px", fontWeight: 600 }}>
                  <i className="fa-regular fa-plus" style={{ marginRight: "6px" }} />Add Product
                </button>
              </div>
              <div style={{ background: "#fff", borderRadius: "10px", padding: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #f0f0f0" }}>
                      {["ID", "Product", "Price", "Stock", "Category", "Actions"].map((h) => (
                        <th key={h} style={{ padding: "10px 12px", textAlign: "left", color: "#888", fontWeight: 600 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_PRODUCTS.map((product) => (
                      <tr key={product.id} style={{ borderBottom: "1px solid #f5f5f5" }}>
                        <td style={{ padding: "12px", color: "#888" }}>#{product.id}</td>
                        <td style={{ padding: "12px", fontWeight: 500 }}>{product.title}</td>
                        <td style={{ padding: "12px" }}>${product.price.toFixed(2)}</td>
                        <td style={{ padding: "12px" }}>
                          <span style={{ color: product.stock < 50 ? "#e74c3c" : "#629D23", fontWeight: 600 }}>{product.stock}</span>
                        </td>
                        <td style={{ padding: "12px", color: "#888" }}>{product.category}</td>
                        <td style={{ padding: "12px" }}>
                          <button style={{ background: "none", border: "1px solid #629D23", color: "#629D23", borderRadius: "4px", padding: "4px 10px", cursor: "pointer", fontSize: "12px", marginRight: "6px" }}>Edit</button>
                          <button style={{ background: "none", border: "1px solid #e74c3c", color: "#e74c3c", borderRadius: "4px", padding: "4px 10px", cursor: "pointer", fontSize: "12px" }}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Orders */}
          {activeTab === "orders" && (
            <div>
              <h2 style={{ marginBottom: "24px", color: "#2C3C28" }}>Orders</h2>
              <div style={{ background: "#fff", borderRadius: "10px", padding: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #f0f0f0" }}>
                      {["Order", "Customer", "Date", "Status", "Total", "Actions"].map((h) => (
                        <th key={h} style={{ padding: "10px 12px", textAlign: "left", color: "#888", fontWeight: 600 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_ORDERS.map((order) => (
                      <tr key={order.id} style={{ borderBottom: "1px solid #f5f5f5" }}>
                        <td style={{ padding: "12px" }}>{order.id}</td>
                        <td style={{ padding: "12px" }}>{order.customer}</td>
                        <td style={{ padding: "12px", color: "#888" }}>{order.date}</td>
                        <td style={{ padding: "12px" }}>
                          <span style={{ padding: "3px 10px", borderRadius: "20px", fontSize: "12px", background: (STATUS_COLORS[order.status] ?? "#888") + "20", color: STATUS_COLORS[order.status] ?? "#888", fontWeight: 600 }}>
                            {order.status}
                          </span>
                        </td>
                        <td style={{ padding: "12px", fontWeight: 600, color: "#629D23" }}>${order.total.toFixed(2)}</td>
                        <td style={{ padding: "12px" }}>
                          <button style={{ background: "none", border: "1px solid #629D23", color: "#629D23", borderRadius: "4px", padding: "4px 10px", cursor: "pointer", fontSize: "12px" }}>View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Settings */}
          {activeTab === "settings" && (
            <div>
              <h2 style={{ marginBottom: "24px", color: "#2C3C28" }}>Store Settings</h2>
              <div style={{ background: "#fff", borderRadius: "10px", padding: "32px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", maxWidth: "600px" }}>
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", marginBottom: "6px", fontWeight: 600, fontSize: "14px", color: "#444" }}>Store Name</label>
                  <input type="text" defaultValue="FreshMart" style={{ width: "100%", padding: "10px 14px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }} />
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", marginBottom: "6px", fontWeight: 600, fontSize: "14px", color: "#444" }}>Store Email</label>
                  <input type="email" defaultValue="info@freshmart.com" style={{ width: "100%", padding: "10px 14px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }} />
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", marginBottom: "6px", fontWeight: 600, fontSize: "14px", color: "#444" }}>Currency</label>
                  <select style={{ width: "100%", padding: "10px 14px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }}>
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>GBP (£)</option>
                  </select>
                </div>
                <div style={{ marginBottom: "28px" }}>
                  <label style={{ display: "block", marginBottom: "6px", fontWeight: 600, fontSize: "14px", color: "#444" }}>Free Shipping Threshold</label>
                  <input type="number" defaultValue="50" style={{ width: "100%", padding: "10px 14px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }} />
                </div>
                <button style={{ background: "#629D23", color: "#fff", border: "none", borderRadius: "6px", padding: "12px 28px", cursor: "pointer", fontSize: "14px", fontWeight: 600 }}>
                  Save Settings
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
