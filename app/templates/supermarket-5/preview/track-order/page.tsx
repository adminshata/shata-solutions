"use client";
import HeaderTwo from "@/components/templates/supermarket5/header/HeaderTwo";
import FooterTwo from "@/components/templates/supermarket5/footer/FooterTwo";
import BackToTop from "@/components/templates/supermarket5/common/BackToTop";
import Link from "next/link";
import { useState } from "react";

const BASE_PATH = "/templates/supermarket-5/preview";

const SAMPLE_ORDERS = [
  { id: "QM-10041", status: "Delivered", date: "2025-04-28", items: 5, total: "$78.50", address: "42 Market Street, Cairo" },
  { id: "QM-10035", status: "In Transit", date: "2025-05-01", items: 3, total: "$34.20", address: "42 Market Street, Cairo" },
];

const STATUS_STEPS = ["Order Placed", "Processing", "Packed", "In Transit", "Delivered"];

function getStepIndex(status: string) {
  if (status === "Delivered") return 4;
  if (status === "In Transit") return 3;
  if (status === "Packed") return 2;
  if (status === "Processing") return 1;
  return 0;
}

export default function Page() {
  const [orderId, setOrderId] = useState("");
  const [result, setResult] = useState<typeof SAMPLE_ORDERS[0] | null | "notfound">(null);

  function handleTrack(e: React.FormEvent) {
    e.preventDefault();
    const found = SAMPLE_ORDERS.find(o => o.id.toLowerCase() === orderId.trim().toLowerCase());
    setResult(found ?? "notfound");
  }

  return (
    <div className="demo-one">
      <HeaderTwo />
      <div className="rts-navigation-area-breadcrumb bg_light-1">
        <div className="container"><div className="row"><div className="col-lg-12">
          <div className="navigator-breadcrumb-wrapper">
            <Link href={BASE_PATH}>Home</Link>
            <i className="fa-regular fa-chevron-right" />
            <a className="current" href="#">Track Order</a>
          </div>
        </div></div></div>
      </div>

      <div className="rts-section-gap">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <div className="rts-single-wized" style={{ padding: 40 }}>
                <h4 style={{ marginBottom: 8 }}>Track Your Order</h4>
                <p style={{ color: '#666', marginBottom: 28 }}>Enter your order ID to get real-time tracking updates.</p>
                <form onSubmit={handleTrack} style={{ display: 'flex', gap: 12 }}>
                  <input
                    className="input-field"
                    type="text"
                    placeholder="e.g. QM-10041"
                    value={orderId}
                    onChange={e => setOrderId(e.target.value)}
                    style={{ flex: 1, padding: '12px 16px', border: '1px solid #e5e5e5', borderRadius: 8, fontSize: 15 }}
                  />
                  <button type="submit" className="rts-btn btn-primary">Track</button>
                </form>

                {result === "notfound" && (
                  <div style={{ marginTop: 24, padding: '16px 20px', background: '#fff5f5', border: '1px solid #ddd6fe', borderRadius: 8, color: '#7C3AED' }}>
                    No order found with ID <strong>{orderId}</strong>. Please check and try again.
                  </div>
                )}

                {result && result !== "notfound" && (
                  <div style={{ marginTop: 32 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 24, padding: '16px 20px', background: '#f9fafb', borderRadius: 8 }}>
                      <div>
                        <span style={{ fontSize: 12, color: '#888' }}>ORDER ID</span>
                        <div style={{ fontWeight: 700, fontSize: 16 }}>{result.id}</div>
                      </div>
                      <div>
                        <span style={{ fontSize: 12, color: '#888' }}>DATE</span>
                        <div style={{ fontWeight: 600 }}>{result.date}</div>
                      </div>
                      <div>
                        <span style={{ fontSize: 12, color: '#888' }}>TOTAL</span>
                        <div style={{ fontWeight: 700, color: 'var(--color-primary)' }}>{result.total}</div>
                      </div>
                      <div>
                        <span style={{ fontSize: 12, color: '#888' }}>ITEMS</span>
                        <div style={{ fontWeight: 600 }}>{result.items}</div>
                      </div>
                    </div>

                    {/* Progress stepper */}
                    <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ position: 'absolute', top: 18, left: '10%', right: '10%', height: 3, background: '#e5e5e5', zIndex: 0 }}>
                        <div style={{ height: '100%', background: 'var(--color-primary)', width: `${(getStepIndex(result.status) / 4) * 100}%`, transition: 'width 0.5s' }} />
                      </div>
                      {STATUS_STEPS.map((step, i) => {
                        const active = i <= getStepIndex(result.status);
                        return (
                          <div key={step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 1, flex: 1 }}>
                            <div style={{ width: 36, height: 36, borderRadius: '50%', background: active ? 'var(--color-primary)' : '#e5e5e5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: active ? '#fff' : '#aaa', fontSize: 14, fontWeight: 700 }}>
                              {active ? <i className="fa-solid fa-check" /> : i + 1}
                            </div>
                            <span style={{ fontSize: 11, color: active ? 'var(--color-primary)' : '#888', fontWeight: active ? 600 : 400, textAlign: 'center', lineHeight: 1.3 }}>{step}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div style={{ marginTop: 24, padding: '12px 16px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, fontSize: 14, color: '#166534' }}>
                      <i className="fa-solid fa-location-dot" style={{ marginRight: 8 }} />
                      Delivering to: {result.address}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterTwo />
      <BackToTop />
    </div>
  );
}
