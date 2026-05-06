/**
 * Items Manager — reusable across every Shata industry template.
 *
 * The base interface is intentionally minimal. Specific industries extend
 * it with their own fields (e.g. ecommerce Product adds price/inventory/
 * options; clinic Service adds duration/practitioner; hotel Room adds beds/
 * occupancy). Industry-specific fields are rendered via the schema's
 * `renderExtras` slot — the manager itself stays domain-agnostic.
 */

import type { ReactNode } from "react";

/** Universal fields every "managed item" has across all templates. */
export interface ManagedItemBase {
  id: string;
  handle: string;
  name: string;
  shortDescription?: string;
  description?: string;
  category?: string;
  images: string[];
  badge?: string | null;
  featured?: boolean;
  active?: boolean;
}

export type ItemsManagerLabels = {
  /** "product", "service", "room"… (lowercase). */
  entitySingular: string;
  /** "products", "services", "rooms"… */
  entityPlural: string;
  /** Override the "+ Add product" button text. */
  addLabel?: string;
  /** Title in the empty state. */
  emptyTitle?: string;
  /** Body in the empty state. */
  emptyCopy?: string;
};

/** Visibility flags for each core field. Set to `false` to hide. Defaults shown. */
export type FieldVisibility = {
  category?: boolean;          // default: true
  shortDescription?: boolean;  // default: true
  description?: boolean;       // default: true
  price?: boolean;             // default: true
  priceLabel?: boolean;        // default: false (string-style price)
  images?: boolean;            // default: true
  badge?: boolean;             // default: false
  featured?: boolean;          // default: true
  active?: boolean;            // default: true
};

export type CategoryOption = {
  handle: string;
  label: string;
};

export type BadgeOption = {
  /** Empty string allowed for "no badge". */
  value: string;
  label: string;
};

/** A row-level action surfaced in the actions menu. */
export type RowAction<T extends ManagedItemBase> = {
  id: string;
  label: string;
  onClick: (item: T) => void;
  danger?: boolean;
  /** Optional hide condition. */
  hidden?: (item: T) => boolean;
};

export type ItemsManagerSchema<T extends ManagedItemBase> = {
  labels: ItemsManagerLabels;
  fields?: FieldVisibility;

  categories?: CategoryOption[];
  badgeOptions?: BadgeOption[];

  /** Image candidates for the image picker. Pass empty if images are off. */
  imagePool: string[];

  /** Build a fresh, blank item (with new id). */
  createNew: () => T;

  /** Override duplicate behavior. Default: shallow copy + new id + " (copy)" name + regenerated handle. */
  duplicate?: (item: T) => T;

  /** Optional industry-specific fields rendered after the core form fields. */
  renderExtras?: (item: T, patch: (delta: Partial<T>) => void) => ReactNode;

  /** Optional override for the price control (defaults to a cents input). */
  renderPrice?: (item: T, patch: (delta: Partial<T>) => void) => ReactNode;

  /** Display the price in the list view. Defaults to "—". */
  formatPriceForList?: (item: T) => string;

  /** Optional row-level actions appended to Edit/Duplicate/Delete. */
  extraActions?: RowAction<T>[];
};

export type ItemsManagerProps<T extends ManagedItemBase> = {
  items: T[];
  onChange: (next: T[]) => void;
  schema: ItemsManagerSchema<T>;
  /** Theme — "light" | "dark". Defaults to "dark" since the Shata editor is dark. */
  theme?: "light" | "dark";
};
