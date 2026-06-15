"use client";

import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart";
import { formatCurrency } from "@shata/ui";
import { WaiterCallButton } from "@/components/waiter-call-button";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { BottomBar } from "@/components/ui/BottomBar";

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>
  );
}

function EmptyCartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-12 w-12 text-primary-dark/30" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.84 3.15M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 1.81-3.866 2.84-7.5H5.357M16.5 17.25a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm-9 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
    </svg>
  );
}

export default function CartPage({ params }: { params: { token: string } }) {
  const router = useRouter();
  const { items, total, currency, locale, updateQuantity, removeItem } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <EmptyCartIcon />
        <p className="text-xl font-bold text-foreground">Your cart is empty</p>
        <p className="text-sm text-muted-foreground">Add something delicious from the menu.</p>
        <Button variant="primary" onClick={() => router.push(`/t/${params.token}/menu`)}>
          Browse Menu
        </Button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <PageHeader
        title={
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-foreground transition-colors hover:text-primary-dark"
          >
            <BackIcon />
            <span>Your Order</span>
          </button>
        }
      />

      {/* Items */}
      <div className="flex-1 space-y-3 p-4">
        {items.map((item) => (
          <Card key={item.cartItemId} className="flex items-center gap-3 p-4">
            <div className="min-w-0 flex-1">
              <p className="truncate font-bold text-foreground">{item.name}</p>
              {item.selectedOptionsLabel && (
                <p className="mt-0.5 truncate text-xs text-muted-foreground">{item.selectedOptionsLabel}</p>
              )}
              <p className="text-sm font-bold text-accent">
                {formatCurrency(item.price, currency, locale)}
              </p>
              {item.notes && (
                <p className="mt-0.5 text-xs italic text-muted-foreground">&ldquo;{item.notes}&rdquo;</p>
              )}
            </div>

            {/* Quantity controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-primary-dark text-sm font-bold transition-colors hover:bg-secondary/70"
              >
                −
              </button>
              <span className="w-5 text-center font-bold text-foreground">
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-primary-dark text-sm font-bold transition-colors hover:bg-secondary/70"
              >
                +
              </button>
            </div>

            <button
              onClick={() => removeItem(item.cartItemId)}
              className="ml-1 text-lg leading-none text-muted-foreground transition-colors hover:text-error"
              aria-label="Remove item"
            >
              ×
            </button>
          </Card>
        ))}
      </div>

      {/* Footer */}
      <BottomBar className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="font-semibold text-muted-foreground">Total</span>
          <span className="text-lg font-black text-foreground">
            {formatCurrency(total, currency, locale)}
          </span>
        </div>
        <Button
          variant="accent"
          onClick={() => router.push(`/t/${params.token}/checkout`)}
          className="w-full"
        >
          Proceed to Checkout
        </Button>
      </BottomBar>
      <WaiterCallButton sessionToken={params.token} />
    </div>
  );
}
