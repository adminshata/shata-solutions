"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn, formatCurrency } from "@shata/ui";
import { useCartStore } from "@/store/cart";
import { useSessionInfo } from "@/components/session-context";
import { WaiterCallButton } from "@/components/waiter-call-button";
import type { Category, ModifierGroup, Product } from "@shata/types";

interface LastOrderItem {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  isAvailable: boolean;
}

interface LastOrder {
  id: string;
  orderNumber: number;
  total: number;
  currency: string;
  items: LastOrderItem[];
}

type VisualType = "hot" | "cold" | "food";

const ALL_CATEGORY_ID = "__all__";

function getVisualType(categoryName: string): VisualType {
  const name = categoryName.toLowerCase();
  if (name.includes("cold") || name.includes("ice") || name.includes("juice") || name.includes("soda")) {
    return "cold";
  }
  if (name.includes("hot") || name.includes("coffee") || name.includes("tea") || name.includes("drink")) {
    return "hot";
  }
  return "food";
}

/** Deterministic product-image mapping by product name, falling back to the category's visual type. */
type ProductAsset =
  | "hot-coffee"
  | "cappuccino"
  | "espresso"
  | "iced-coffee"
  | "frappe"
  | "food-dessert"
  | "croissant"
  | "donut";

function getProductAsset(product: Product, visualType: VisualType): ProductAsset {
  const name = product.name.toLowerCase();
  if (visualType === "hot") {
    if (name.includes("cappuccino") || name.includes("latte") || name.includes("macchiato")) return "cappuccino";
    if (name.includes("espresso") || name.includes("americano") || name.includes("ristretto")) return "espresso";
    return "hot-coffee";
  }
  if (visualType === "cold") {
    if (name.includes("frapp") || name.includes("milkshake") || name.includes("smoothie")) return "frappe";
    return "iced-coffee";
  }
  if (name.includes("croissant")) return "croissant";
  if (name.includes("donut") || name.includes("doughnut")) return "donut";
  return "food-dessert";
}

/* ------------------------------------------------------------------ */
/* Localization                                                          */
/* ------------------------------------------------------------------ */

interface Copy {
  welcome: string;
  table: (n: string) => string;
  searchPlaceholder: string;
  all: string;
  filter: string;
  menuLabel: string;
  cartLabel: string;
  favoritesLabel: string;
  profileLabel: string;
  addToFavorites: (name: string) => string;
  removeFromFavorites: (name: string) => string;
  addToCart: (name: string) => string;
  resultsFor: (q: string) => string;
  noResultsFor: (q: string) => string;
  nothingMatches: string;
  tryDifferentName: string;
  menuComingSoon: string;
  checkBackShortly: string;
  noItemsCategory: string;
  tryAnotherCategory: string;
  reorderPrefix: string;
  moreItems: (n: number) => string;
  reorderButton: string;
  reorderingButton: string;
  dismiss: string;
  menuFailedToLoad: string;
  retry: string;
  restaurantFallback: string;
  fromPrefix: string;
  sheetRequired: string;
  sheetOptional: string;
  sheetSelectUpTo: (n: number) => string;
  sheetNotesLabel: string;
  sheetNotesPlaceholder: string;
  sheetAddToCart: string;
  sheetClose: string;
}

const COPY: { en: Copy; ar: Copy } = {
  en: {
    welcome: "Welcome",
    table: (n) => `Table ${n}`,
    searchPlaceholder: "Search menu",
    all: "All",
    filter: "Filter",
    menuLabel: "Menu",
    cartLabel: "Cart",
    favoritesLabel: "Favorites",
    profileLabel: "Profile",
    addToFavorites: (name) => `Add ${name} to favorites`,
    removeFromFavorites: (name) => `Remove ${name} from favorites`,
    addToCart: (name) => `Add ${name}`,
    resultsFor: (q) => `Results for "${q}"`,
    noResultsFor: (q) => `No results for "${q}"`,
    nothingMatches: "Nothing matches that search",
    tryDifferentName: "Try a different name or browse categories.",
    menuComingSoon: "Menu coming soon",
    checkBackShortly: "Please check back shortly.",
    noItemsCategory: "No items in this category yet",
    tryAnotherCategory: "Try another category from above.",
    reorderPrefix: "Reorder:",
    moreItems: (n) => `+${n} more`,
    reorderButton: "Reorder",
    reorderingButton: "...",
    dismiss: "Dismiss",
    menuFailedToLoad: "Menu failed to load",
    retry: "Retry",
    restaurantFallback: "Shata Café",
    fromPrefix: "From ",
    sheetRequired: "Required",
    sheetOptional: "Optional",
    sheetSelectUpTo: (n) => `Select up to ${n}`,
    sheetNotesLabel: "Special instructions",
    sheetNotesPlaceholder: "e.g. less ice, extra hot...",
    sheetAddToCart: "Add to Cart",
    sheetClose: "Close",
  },
  ar: {
    welcome: "أهلاً بك",
    table: (n) => `طاولة ${n}`,
    searchPlaceholder: "بحث في القائمة",
    all: "الكل",
    filter: "تصفية",
    menuLabel: "القائمة",
    cartLabel: "السلة",
    favoritesLabel: "المفضلة",
    profileLabel: "الحساب",
    addToFavorites: (name) => `إضافة ${name} للمفضلة`,
    removeFromFavorites: (name) => `إزالة ${name} من المفضلة`,
    addToCart: (name) => `إضافة ${name}`,
    resultsFor: (q) => `نتائج البحث عن "${q}"`,
    noResultsFor: (q) => `لا توجد نتائج لـ "${q}"`,
    nothingMatches: "لا يوجد ما يطابق بحثك",
    tryDifferentName: "جرّب اسمًا مختلفًا أو تصفح الأقسام.",
    menuComingSoon: "القائمة قريبًا",
    checkBackShortly: "يرجى المحاولة مرة أخرى قريبًا.",
    noItemsCategory: "لا توجد عناصر في هذا القسم حتى الآن",
    tryAnotherCategory: "جرّب قسمًا آخر من الأعلى.",
    reorderPrefix: "إعادة الطلب:",
    moreItems: (n) => `+${n} أخرى`,
    reorderButton: "إعادة الطلب",
    reorderingButton: "...",
    dismiss: "إغلاق",
    menuFailedToLoad: "تعذر تحميل القائمة",
    retry: "إعادة المحاولة",
    restaurantFallback: "شطا كافيه",
    fromPrefix: "يبدأ من ",
    sheetRequired: "مطلوب",
    sheetOptional: "اختياري",
    sheetSelectUpTo: (n) => `اختر حتى ${n}`,
    sheetNotesLabel: "تعليمات خاصة",
    sheetNotesPlaceholder: "مثال: بدون ثلج، سخن أكثر...",
    sheetAddToCart: "أضف إلى السلة",
    sheetClose: "إغلاق",
  },
};

function pickName(en: string, ar: string | null | undefined, isArabic: boolean): string {
  return isArabic && ar ? ar : en;
}

/** True if the product has a required single-select group (e.g. "Size") whose
 *  options can change the price — the product card should show "From {price}". */
function hasRequiredSizeGroup(product: Product): boolean {
  return (product.modifierGroups ?? []).some(
    (g) => g.required && g.type === "SINGLE" && g.options.length > 1
  );
}

function hasModifierGroups(product: Product): boolean {
  return (product.modifierGroups ?? []).length > 0;
}

/* ------------------------------------------------------------------ */
/* Icons                                                                */
/* ------------------------------------------------------------------ */

function CartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.84 3.15M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 1.81-3.866 2.84-7.5H5.357M16.5 17.25a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm-9 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={2}>
      <circle cx="11" cy="11" r="7" />
      <path strokeLinecap="round" d="M20 20l-3-3" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

function HamburgerIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function FilterIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
      <circle cx="9" cy="7" r="1.75" fill="currentColor" stroke="none" />
      <circle cx="15" cy="12" r="1.75" fill="currentColor" stroke="none" />
      <circle cx="9" cy="17" r="1.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 20.5s-7.5-4.55-9.5-8.95A5.5 5.5 0 0 1 12 6.3a5.5 5.5 0 0 1 9.5 5.25c-2 4.4-9.5 8.95-9.5 8.95Z"
      />
    </svg>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" d="M12 5v14M5 12h14" />
    </svg>
  );
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5Z" />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="8" r="3.5" />
      <path strokeLinecap="round" d="M4.5 20a7.5 7.5 0 0 1 15 0" />
    </svg>
  );
}

function PlateIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.75}>
      <circle cx="12" cy="12" r="9" strokeOpacity="0.4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 10.5h11M6.5 12.5h11M7.5 14.5h9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 10.5a6 3 0 0 1 12 0" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Product tile                                                          */
/* ------------------------------------------------------------------ */

function ProductTile({
  product,
  name,
  asset,
  categoryLabel,
  currency,
  locale,
  isArabic,
  dict,
  onAdd,
  onOpenSheet,
  bouncing,
  favorited,
  onToggleFavorite,
}: {
  product: Product;
  name: string;
  asset: ProductAsset;
  categoryLabel?: string;
  currency: string;
  locale: string;
  isArabic: boolean;
  dict: Copy;
  onAdd: (product: Product) => void;
  onOpenSheet: (product: Product) => void;
  bouncing: boolean;
  favorited: boolean;
  onToggleFavorite: (id: string) => void;
}) {
  const customizable = hasModifierGroups(product);
  const fromPrice = hasRequiredSizeGroup(product);

  function handleTap() {
    if (customizable) onOpenSheet(product);
    else onAdd(product);
  }

  return (
    <motion.div
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      onClick={handleTap}
      className="flex cursor-pointer flex-col overflow-hidden rounded-[1.25rem] bg-white ring-1 ring-black/[0.05] shadow-[0_2px_10px_rgba(22,163,107,0.05)] transition-shadow duration-300 hover:shadow-[0_6px_18px_rgba(22,163,107,0.12)]"
    >
      <div className="relative aspect-square w-full bg-[#F8FAF7]">
        <img src={`/products/${asset}.svg`} alt="" className="h-full w-full object-contain p-6" />
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.85 }}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product.id);
          }}
          className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#1F2A24] shadow-[0_1px_4px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.04]"
          aria-label={favorited ? dict.removeFromFavorites(name) : dict.addToFavorites(name)}
        >
          <HeartIcon
            className={cn(
              "h-3.5 w-3.5 transition-colors",
              favorited ? "fill-[#E3A23C] text-[#E3A23C]" : "fill-none text-[#1F2A24]/30"
            )}
          />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.82 }}
          animate={bouncing ? { scale: [1, 1.25, 1] } : { scale: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={(e) => {
            e.stopPropagation();
            handleTap();
          }}
          className="absolute -bottom-4 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#18A86F] to-[#129463] text-white shadow-[0_6px_14px_rgba(22,163,107,0.4)] ring-4 ring-white"
          aria-label={dict.addToCart(name)}
        >
          <PlusIcon className="h-4 w-4" />
        </motion.button>
      </div>
      <div className="flex flex-1 flex-col px-3 pb-3 pt-4">
        {categoryLabel && (
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9AA8A1]" dir={isArabic ? "rtl" : "ltr"}>
            {categoryLabel}
          </p>
        )}
        <p
          className="mt-0.5 text-[13.5px] font-bold leading-snug text-[#1F2A24] line-clamp-1"
          dir={isArabic ? "rtl" : "ltr"}
        >
          {name}
        </p>
        <span className="mt-1.5 text-sm font-extrabold tracking-tight text-[#16A36B]">
          {fromPrice ? dict.fromPrefix : ""}{formatCurrency(product.price, currency, locale)}
        </span>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Product customization bottom sheet                                   */
/* ------------------------------------------------------------------ */

interface SheetSelections {
  [groupId: string]: string[];
}

function ProductSheet({
  product,
  name,
  asset,
  categoryLabel,
  currency,
  locale,
  isArabic,
  dict,
  onClose,
  onConfirm,
}: {
  product: Product;
  name: string;
  asset: ProductAsset;
  categoryLabel?: string;
  currency: string;
  locale: string;
  isArabic: boolean;
  dict: Copy;
  onClose: () => void;
  onConfirm: (payload: {
    selectedOptionIds: string[];
    selectedOptionsLabel?: string;
    notes?: string;
    quantity: number;
    unitPrice: number;
  }) => void;
}) {
  const groups = product.modifierGroups ?? [];

  const [selections, setSelections] = useState<SheetSelections>(() => {
    const initial: SheetSelections = {};
    for (const group of groups) {
      if (group.required && group.type === "SINGLE" && group.options.length > 0) {
        const sorted = [...group.options].sort((a, b) => (a.priceDelta ?? 0) - (b.priceDelta ?? 0));
        initial[group.id] = [sorted[0]!.id];
      } else {
        initial[group.id] = [];
      }
    }
    return initial;
  });
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");

  function toggleOption(group: ModifierGroup, optionId: string) {
    setSelections((prev) => {
      const current = prev[group.id] ?? [];
      if (group.type === "SINGLE") {
        return { ...prev, [group.id]: [optionId] };
      }
      const has = current.includes(optionId);
      if (has) {
        return { ...prev, [group.id]: current.filter((id) => id !== optionId) };
      }
      if (group.maxSelect > 0 && current.length >= group.maxSelect) {
        return prev;
      }
      return { ...prev, [group.id]: [...current, optionId] };
    });
  }

  const allOptions = groups.flatMap((g) => g.options);
  const selectedOptionIds = Object.values(selections).flat();
  const selectedOptions = allOptions.filter((o) => selectedOptionIds.includes(o.id));
  const unitPrice = product.price + selectedOptions.reduce((sum, o) => sum + (o.priceDelta ?? 0), 0);
  const total = unitPrice * quantity;
  const selectedOptionsLabel = selectedOptions
    .map((o) => pickName(o.name, o.nameAr, isArabic))
    .join(", ");

  const canConfirm = groups.every((g) => !g.required || (selections[g.id]?.length ?? 0) > 0);

  function handleConfirm() {
    if (!canConfirm) return;
    onConfirm({
      selectedOptionIds,
      selectedOptionsLabel: selectedOptionsLabel || undefined,
      notes: notes.trim() || undefined,
      quantity,
      unitPrice,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30" />
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 320, damping: 32 }}
        className="relative flex max-h-[85vh] w-full max-w-[430px] flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl"
        dir={isArabic ? "rtl" : "ltr"}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle + close */}
        <div className="flex items-center justify-center pt-3">
          <div className="h-1.5 w-10 rounded-full bg-[#E7ECE9]" />
        </div>
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#F6F8F6] text-[#1F2A24]"
          aria-label={dict.sheetClose}
        >
          <CloseIcon className="h-3.5 w-3.5" />
        </button>

        <div className="flex-1 overflow-y-auto px-5 pb-4 pt-2">
          {/* Header */}
          <div className="flex items-center gap-3 py-2">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#F8FAF7]">
              <img src={`/products/${asset}.svg`} alt="" className="h-12 w-12 object-contain" />
            </div>
            <div className="min-w-0">
              {categoryLabel && (
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9AA8A1]">{categoryLabel}</p>
              )}
              <p className="truncate text-base font-extrabold text-[#1F2A24]">{name}</p>
              <p className="text-sm font-bold text-[#16A36B]">{formatCurrency(unitPrice, currency, locale)}</p>
            </div>
          </div>

          {/* Modifier groups */}
          <div className="mt-3 space-y-5">
            {groups.map((group) => (
              <div key={group.id}>
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-bold text-[#1F2A24]">{pickName(group.name, group.nameAr, isArabic)}</p>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-[10px] font-bold",
                      group.required ? "bg-[#16A36B]/10 text-[#16A36B]" : "bg-[#F6F8F6] text-[#9AA8A1]"
                    )}
                  >
                    {group.required
                      ? dict.sheetRequired
                      : group.type === "MULTI" && group.maxSelect > 0
                        ? dict.sheetSelectUpTo(group.maxSelect)
                        : dict.sheetOptional}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.options.map((option) => {
                    const selected = (selections[group.id] ?? []).includes(option.id);
                    return (
                      <button
                        key={option.id}
                        onClick={() => toggleOption(group, option.id)}
                        className={cn(
                          "rounded-full px-4 py-2 text-xs font-semibold ring-1 transition-colors",
                          selected
                            ? "bg-[#16A36B] text-white ring-[#16A36B]"
                            : "bg-[#F6F8F6] text-[#1F2A24] ring-black/[0.04] hover:ring-[#16A36B]/40"
                        )}
                      >
                        {pickName(option.name, option.nameAr, isArabic)}
                        {option.priceDelta !== 0 && (
                          <span className={cn("ml-1.5", selected ? "text-white/80" : "text-[#9AA8A1]")}>
                            {option.priceDelta > 0 ? "+" : ""}
                            {formatCurrency(option.priceDelta, currency, locale)}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Notes */}
          <div className="mt-5">
            <p className="mb-2 text-sm font-bold text-[#1F2A24]">{dict.sheetNotesLabel}</p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={dict.sheetNotesPlaceholder}
              rows={2}
              className="w-full resize-none rounded-2xl bg-[#F6F8F6] p-3 text-sm text-[#1F2A24] placeholder:text-[#9AA8A1] focus:outline-none focus:ring-2 focus:ring-[#16A36B]/20"
            />
          </div>
        </div>

        {/* Footer: quantity + add to cart */}
        <div className="flex items-center gap-3 border-t border-black/[0.04] px-5 py-4">
          <div className="flex items-center gap-3 rounded-full bg-[#F6F8F6] px-2 py-1.5">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#1F2A24] shadow-[0_1px_4px_rgba(0,0,0,0.06)]"
              aria-label="-"
            >
              −
            </button>
            <span className="w-5 text-center text-sm font-bold text-[#1F2A24]">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#1F2A24] shadow-[0_1px_4px_rgba(0,0,0,0.06)]"
              aria-label="+"
            >
              +
            </button>
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleConfirm}
            disabled={!canConfirm}
            className="flex flex-1 items-center justify-between rounded-full bg-gradient-to-br from-[#18A86F] to-[#129463] px-5 py-3 text-sm font-bold text-white shadow-[0_6px_14px_rgba(22,163,107,0.3)] transition-opacity disabled:opacity-50"
          >
            <span>{dict.sheetAddToCart}</span>
            <span>{formatCurrency(total, currency, locale)}</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Skeleton                                                              */
/* ------------------------------------------------------------------ */

function MenuSkeleton() {
  return (
    <div className="mx-auto flex h-screen w-full max-w-[430px] flex-col bg-white">
      <div className="shrink-0 space-y-3 px-4 pt-4 pb-3">
        <div className="flex items-center justify-between">
          <div className="h-10 w-10 animate-pulse rounded-full bg-[#F6F8F6]" />
          <div className="space-y-1.5">
            <div className="h-2.5 w-16 animate-pulse rounded-full bg-[#F6F8F6]" />
            <div className="h-4 w-32 animate-pulse rounded-full bg-[#F6F8F6]" />
          </div>
          <div className="h-10 w-10 animate-pulse rounded-full bg-[#F6F8F6]" />
        </div>
        <div className="h-11 animate-pulse rounded-full bg-[#F6F8F6]" />
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-7 w-20 shrink-0 animate-pulse rounded-full bg-[#F6F8F6]" />
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-hidden px-4">
        <div className="mb-4 h-20 animate-pulse rounded-2xl bg-[#F6F8F6]" />
        <div className="grid grid-cols-2 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="overflow-hidden rounded-[1.25rem] bg-white ring-1 ring-black/[0.04]">
              <div className="aspect-square w-full animate-pulse bg-[#F8FAF7]" />
              <div className="space-y-2 p-3">
                <div className="h-2.5 w-1/2 animate-pulse rounded bg-[#F6F8F6]" />
                <div className="h-3.5 w-3/4 animate-pulse rounded bg-[#F6F8F6]" />
                <div className="h-4 w-1/3 animate-pulse rounded bg-[#F6F8F6]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                  */
/* ------------------------------------------------------------------ */

export default function MenuPage() {
  const { token } = useParams<{ token: string }>();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>(ALL_CATEGORY_ID);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [lastOrder, setLastOrder] = useState<LastOrder | null>(null);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [reordering, setReordering] = useState(false);
  const [bouncingIds, setBouncingIds] = useState<Set<string>>(new Set());
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [sheetEntry, setSheetEntry] = useState<{ product: Product; name: string; asset: ProductAsset; categoryName: string } | null>(null);
  const { addItem, currency, locale, items } = useCartStore();
  const { restaurantName, tableNumber } = useSessionInfo();
  const itemCount = items.reduce((a, i) => a + i.quantity, 0);

  // Language is exclusive: English UI + product.name/category.name, or Arabic UI +
  // product.nameAr/category.nameAr (falling back to English if no translation exists).
  const isArabic = locale.toLowerCase().startsWith("ar");
  const dict = isArabic ? COPY.ar : COPY.en;
  const dir = isArabic ? "rtl" : "ltr";

  useEffect(() => {
    const apiUrl = process.env["NEXT_PUBLIC_API_URL"] ?? "";
    Promise.all([
      fetch(`${apiUrl}/api/sessions/${token}/menu`).then((r) => {
        if (!r.ok) throw new Error(`Menu API ${r.status}: ${r.url}`);
        return r.json();
      }),
      fetch(`${apiUrl}/api/sessions/${token}/last-order`).then((r) =>
        r.status === 200 ? r.json() : null
      ).catch(() => null),
    ])
      .then(([menuData, lastOrderData]: [unknown, LastOrder | null]) => {
        // Guard: API must return an array of categories
        const cats = Array.isArray(menuData) ? (menuData as Category[]) : [];
        if (!Array.isArray(menuData)) {
          console.error("Menu API returned non-array:", menuData);
          setFetchError(`Menu data format unexpected. API URL: ${apiUrl}`);
        }
        setCategories(cats);
        if (lastOrderData) setLastOrder(lastOrderData);
      })
      .catch((err: Error) => {
        console.error("Menu fetch failed:", err);
        setFetchError(err.message ?? "Failed to load menu. Check NEXT_PUBLIC_API_URL.");
      })
      .finally(() => setLoading(false));
  }, [token]);

  async function handleReorder() {
    if (!lastOrder) return;
    setReordering(true);
    try {
      const apiUrl = process.env["NEXT_PUBLIC_API_URL"] ?? "";
      const res = await fetch(
        `${apiUrl}/api/sessions/${token}/reorder/${lastOrder.id}`,
        { method: "POST" }
      );
      if (res.ok) {
        const order = await res.json() as { id: string };
        router.push(`/t/${token}/order/${order.id}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setReordering(false);
    }
  }

  function handleAdd(product: Product) {
    addItem({ productId: product.id, name: product.name, price: product.price, quantity: 1 });
    setBouncingIds((prev) => new Set(prev).add(product.id));
    setTimeout(() => {
      setBouncingIds((prev) => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 300);
  }

  function handleConfirmCustomized(payload: {
    selectedOptionIds: string[];
    selectedOptionsLabel?: string;
    notes?: string;
    quantity: number;
    unitPrice: number;
  }) {
    if (!sheetEntry) return;
    addItem({
      productId: sheetEntry.product.id,
      name: sheetEntry.name,
      price: payload.unitPrice,
      quantity: payload.quantity,
      selectedOptionIds: payload.selectedOptionIds,
      selectedOptionsLabel: payload.selectedOptionsLabel,
      notes: payload.notes,
    });
    setSheetEntry(null);
  }

  function toggleFavorite(id: string) {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const query = search.trim().toLowerCase();
  const isSearching = query.length > 0;

  const categoryChips = useMemo(
    () => [
      { id: ALL_CATEGORY_ID, name: dict.all },
      ...categories.map((c) => ({ id: c.id, name: pickName(c.name, c.nameAr, isArabic) })),
    ],
    [categories, isArabic, dict]
  );

  const searchResults = useMemo(() => {
    if (!isSearching) return [];
    const results: { product: Product; name: string; asset: ProductAsset; categoryName: string }[] = [];
    for (const cat of categories) {
      const visualType = getVisualType(cat.name);
      const categoryName = pickName(cat.name, cat.nameAr, isArabic);
      for (const p of cat.products ?? []) {
        if (p.name.toLowerCase().includes(query) || (p.nameAr ?? "").toLowerCase().includes(query)) {
          results.push({ product: p, name: pickName(p.name, p.nameAr, isArabic), asset: getProductAsset(p, visualType), categoryName });
        }
      }
    }
    return results;
  }, [categories, query, isSearching, isArabic]);

  // Products for the active category chip — "All" flattens every category into one grid
  const displayedEntries = useMemo(() => {
    const entries: { product: Product; name: string; asset: ProductAsset; categoryName: string }[] = [];
    const cats = activeCategory === ALL_CATEGORY_ID ? categories : categories.filter((c) => c.id === activeCategory);
    for (const cat of cats) {
      const visualType = getVisualType(cat.name);
      const categoryName = pickName(cat.name, cat.nameAr, isArabic);
      for (const p of cat.products ?? []) {
        entries.push({ product: p, name: pickName(p.name, p.nameAr, isArabic), asset: getProductAsset(p, visualType), categoryName });
      }
    }
    return entries;
  }, [categories, activeCategory, isArabic]);

  if (loading) {
    return <MenuSkeleton />;
  }

  if (fetchError) {
    return (
      <div className="mx-auto flex h-screen w-full max-w-[430px] flex-col items-center justify-center gap-4 bg-white px-6 text-center" dir={dir}>
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
          <CloseIcon className="h-6 w-6" />
        </div>
        <p className="font-semibold text-red-600">{dict.menuFailedToLoad}</p>
        <p className="text-xs text-[#9AA8A1] font-mono break-all">{fetchError}</p>
        <button
          onClick={() => { setFetchError(null); setLoading(true); }}
          className="rounded-full bg-[#16A36B] px-6 py-2.5 text-sm font-bold text-white transition-all duration-200"
        >
          {dict.retry}
        </button>
      </div>
    );
  }

  const availableLastItems = lastOrder?.items.filter((i) => i.isAvailable) ?? [];

  return (
    <div className="relative mx-auto flex h-screen w-full max-w-[430px] flex-col bg-white" dir={dir}>
      {/* App header: hamburger, location/table info, cart, search, category chips */}
      <div className="sticky top-0 z-20 shrink-0 space-y-3 border-b border-black/[0.04] bg-white px-4 pt-4 pb-3">
        <div className="flex items-center justify-between gap-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F6F8F6] text-[#1F2A24]"
            aria-label={dict.menuLabel}
          >
            <HamburgerIcon className="h-4 w-4" />
          </motion.button>

          <div className="min-w-0 flex-1 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#16A36B]">
              {tableNumber ? dict.table(tableNumber) : dict.welcome}
            </p>
            <h1 className="truncate text-base font-extrabold leading-tight text-[#1F2A24]">
              {restaurantName ?? dict.restaurantFallback}
            </h1>
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => router.push(`/t/${token}/cart`)}
            className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F6F8F6] text-[#1F2A24]"
            aria-label={dict.cartLabel}
          >
            <CartIcon className="h-4 w-4" />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#E3A23C] px-1 text-[10px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </motion.button>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2">
          <div className="relative flex flex-1 items-center rounded-full bg-[#F6F8F6] transition-shadow focus-within:ring-2 focus-within:ring-[#16A36B]/20">
            <SearchIcon className="pointer-events-none absolute left-4 h-4 w-4 text-[#9AA8A1]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={dict.searchPlaceholder}
              className="w-full rounded-full bg-transparent py-2.5 pl-11 pr-10 text-sm text-[#1F2A24] placeholder:text-[#9AA8A1] focus:outline-none"
            />
            {search && (
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => setSearch("")}
                className="absolute right-3.5 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#9AA8A1]"
                aria-label={dict.dismiss}
              >
                <CloseIcon className="h-3 w-3" />
              </motion.button>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#16A36B] text-white shadow-[0_4px_12px_rgba(22,163,107,0.25)]"
            aria-label={dict.filter}
          >
            <FilterIcon className="h-4 w-4" />
          </motion.button>
        </div>

        {/* Category chips */}
        {!isSearching && categories.length > 0 && (
          <nav className="-mx-4 flex gap-1.5 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categoryChips.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <motion.button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  whileTap={{ scale: 0.94 }}
                  className={cn(
                    "relative shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors",
                    isActive ? "text-white" : "bg-[#F6F8F6] text-[#1F2A24]"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="categoryPill"
                      className="absolute inset-0 rounded-full bg-[#16A36B]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat.name}</span>
                </motion.button>
              );
            })}
          </nav>
        )}
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto bg-[#FBFCFB] px-4 py-4 pb-[190px]">
        {/* Reorder banner — compact, dismissible */}
        <AnimatePresence>
          {lastOrder && !bannerDismissed && availableLastItems.length > 0 && !isSearching && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="mb-3 flex items-center gap-2 rounded-2xl bg-white px-3 py-2 ring-1 ring-black/[0.04]">
                <p className="min-w-0 flex-1 truncate text-xs font-semibold text-[#1F2A24]">
                  {dict.reorderPrefix} {availableLastItems.slice(0, 2).map((i) => i.name).join(", ")}
                  {availableLastItems.length > 2 && ` ${dict.moreItems(availableLastItems.length - 2)}`}
                </p>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReorder}
                  disabled={reordering}
                  className="shrink-0 rounded-full bg-[#16A36B] px-3 py-1 text-xs font-bold text-white transition-opacity disabled:opacity-60"
                >
                  {reordering ? dict.reorderingButton : dict.reorderButton}
                </motion.button>
                <button
                  onClick={() => setBannerDismissed(true)}
                  className="shrink-0 text-[#9AA8A1] transition-colors hover:text-[#1F2A24]"
                  aria-label={dict.dismiss}
                >
                  <CloseIcon className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {isSearching ? (
          <section>
            <p className="mb-3 text-sm font-bold text-[#1F2A24]">
              {searchResults.length > 0 ? dict.resultsFor(search.trim()) : dict.noResultsFor(search.trim())}
            </p>
            {searchResults.length === 0 ? (
              <div className="flex flex-col items-center gap-2 rounded-3xl bg-white px-6 py-10 text-center ring-1 ring-black/[0.04]">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#16A36B]/10 text-[#16A36B]">
                  <SearchIcon className="h-5 w-5" />
                </div>
                <p className="font-semibold text-[#1F2A24]">{dict.nothingMatches}</p>
                <p className="text-sm text-[#9AA8A1]">{dict.tryDifferentName}</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 pb-2">
                {searchResults.map(({ product, name, asset, categoryName }) => (
                  <ProductTile
                    key={product.id}
                    product={product}
                    name={name}
                    asset={asset}
                    categoryLabel={categoryName}
                    currency={currency}
                    locale={locale}
                    isArabic={isArabic}
                    dict={dict}
                    onAdd={handleAdd}
                    onOpenSheet={(p) => setSheetEntry({ product: p, name, asset, categoryName })}
                    bouncing={bouncingIds.has(product.id)}
                    favorited={favorites.has(product.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            )}
          </section>
        ) : (
          <section>
            {categories.length === 0 ? (
              <div className="flex flex-col items-center gap-2 rounded-3xl bg-white px-6 py-10 text-center ring-1 ring-black/[0.04]">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#16A36B]/10 text-[#16A36B]">
                  <PlateIcon className="h-5 w-5" />
                </div>
                <p className="font-semibold text-[#1F2A24]">{dict.menuComingSoon}</p>
                <p className="text-sm text-[#9AA8A1]">{dict.checkBackShortly}</p>
              </div>
            ) : displayedEntries.length === 0 ? (
              <div className="flex flex-col items-center gap-2 rounded-3xl bg-white px-6 py-10 text-center ring-1 ring-black/[0.04]">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#16A36B]/10 text-[#16A36B]">
                  <PlateIcon className="h-5 w-5" />
                </div>
                <p className="font-semibold text-[#1F2A24]">{dict.noItemsCategory}</p>
                <p className="text-sm text-[#9AA8A1]">{dict.tryAnotherCategory}</p>
              </div>
            ) : (
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-2 gap-3 pb-2"
              >
                {displayedEntries.map(({ product, name, asset, categoryName }) => (
                  <ProductTile
                    key={product.id}
                    product={product}
                    name={name}
                    asset={asset}
                    categoryLabel={categoryName}
                    currency={currency}
                    locale={locale}
                    isArabic={isArabic}
                    dict={dict}
                    onAdd={handleAdd}
                    onOpenSheet={(p) => setSheetEntry({ product: p, name, asset, categoryName })}
                    bouncing={bouncingIds.has(product.id)}
                    favorited={favorites.has(product.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </motion.div>
            )}
          </section>
        )}
      </div>

      {/* Bottom navigation */}
      <div className="fixed inset-x-0 bottom-0 z-20 flex justify-center px-4 pb-safe pb-2 pt-2">
        <nav className="flex w-full max-w-[430px] items-center justify-between rounded-full bg-white px-10 py-2 shadow-[0_-2px_16px_rgba(0,0,0,0.05)] ring-1 ring-black/[0.04]">
          <motion.button
            whileTap={{ scale: 0.88 }}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#16A36B] text-white"
            aria-label={dict.menuLabel}
          >
            <HomeIcon className="h-[18px] w-[18px]" />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.88 }}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#9AA8A1] transition-colors hover:text-[#16A36B]"
            aria-label={dict.favoritesLabel}
          >
            <HeartIcon className="h-[18px] w-[18px] fill-none" />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => router.push(`/t/${token}/cart`)}
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-[#9AA8A1] transition-colors hover:text-[#16A36B]"
            aria-label={dict.cartLabel}
          >
            <CartIcon className="h-[18px] w-[18px]" />
            {itemCount > 0 && (
              <span className="absolute right-1.5 top-1 h-2 w-2 rounded-full bg-[#E3A23C]" />
            )}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.88 }}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#9AA8A1] transition-colors hover:text-[#16A36B]"
            aria-label={dict.profileLabel}
          >
            <UserIcon className="h-[18px] w-[18px]" />
          </motion.button>
        </nav>
      </div>

      <WaiterCallButton sessionToken={token} isArabic={isArabic} />

      {/* Product customization bottom sheet */}
      <AnimatePresence>
        {sheetEntry && (
          <ProductSheet
            key={sheetEntry.product.id}
            product={sheetEntry.product}
            name={sheetEntry.name}
            asset={sheetEntry.asset}
            categoryLabel={sheetEntry.categoryName}
            currency={currency}
            locale={locale}
            isArabic={isArabic}
            dict={dict}
            onClose={() => setSheetEntry(null)}
            onConfirm={handleConfirmCustomized}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
