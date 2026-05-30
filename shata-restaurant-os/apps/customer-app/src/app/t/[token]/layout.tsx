"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCartStore } from "@/store/cart";
import { OfflineBanner } from "@shata/ui";
import { CartBar } from "@/components/cart-bar";

export default function SessionLayout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const token = params["token"] as string;
  const [isOffline, setIsOffline] = useState(false);
  const itemCount = useCartStore((s) => s.items.reduce((a, i) => a + i.quantity, 0));
  const total = useCartStore((s) => s.total);
  const currency = useCartStore((s) => s.currency);
  const locale = useCartStore((s) => s.locale);

  useEffect(() => {
    const onOnline = () => setIsOffline(false);
    const onOffline = () => setIsOffline(true);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => { window.removeEventListener("online", onOnline); window.removeEventListener("offline", onOffline); };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {isOffline && <OfflineBanner />}
      <main className="flex-1 pb-24">{children}</main>
      {itemCount > 0 && (
        <CartBar
          token={token}
          itemCount={itemCount}
          total={total}
          currency={currency}
          locale={locale}
        />
      )}
    </div>
  );
}
