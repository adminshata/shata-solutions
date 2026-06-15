import { PrismaClient } from "../generated/client";
import { SignJWT } from "jose";
import { TextEncoder } from "util";

const prisma = new PrismaClient();

const SESSION_SECRET = process.env["SESSION_TOKEN_SECRET"] ?? "shata-session-token-secret-minimum-32-chars-dev";

async function signQrToken(tableId: string, restaurantId: string): Promise<string> {
  const secret = new TextEncoder().encode(SESSION_SECRET);
  return new SignJWT({ tableId, restaurantId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("365d")
    .sign(secret);
}

function randomDate(daysAgo: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - Math.floor(Math.random() * daysAgo));
  d.setHours(Math.floor(Math.random() * 14) + 9); // 9am–11pm
  return d;
}

async function main() {
  console.warn("🌱 Seeding Shata Café demo restaurant...");

  // ── Organization ────────────────────────────────────────────────────────
  const org = await prisma.organization.upsert({
    where: { id: "demo-org-1" },
    update: { name: "Shata Demo Group", plan: "GROWTH" },
    create: { id: "demo-org-1", name: "Shata Demo Group", plan: "GROWTH" },
  });

  // ── Restaurant ───────────────────────────────────────────────────────────
  const restaurant = await prisma.restaurant.upsert({
    where: { id: "demo-restaurant-1" },
    update: {},
    create: {
      id: "demo-restaurant-1",
      orgId: org.id,
      name: "Shata Café — Demo",
      slug: "shata-cafe-demo",
      currency: "EGP",
      locale: "ar",
      timezone: "Africa/Cairo",
      taxRate: 0.14,
      taxLabel: "VAT",
      taxInclusive: false,
      settings: {
        enabledPaymentProviders: ["STRIPE", "PAYMOB", "INSTAPAY", "MANUAL"],
        preferredPaymentProvider: "PAYMOB",
        kitchenStations: ["ALL", "BAR", "COLD"],
      },
    },
  });

  // ── Tables (10) ─────────────────────────────────────────────────────────
  const tables: Array<{ id: string; number: string; token: string }> = [];
  for (let i = 1; i <= 10; i++) {
    const id = `demo-table-${i}`;
    const table = await prisma.table.upsert({
      where: { id },
      update: {},
      create: {
        id,
        restaurantId: restaurant.id,
        number: String(i),
        label: `Table ${i}`,
        qrCode: `demo-qr-${id}`,
        status: "AVAILABLE",
        capacity: i <= 4 ? 2 : i <= 7 ? 4 : 6,
      },
    });
    const token = await signQrToken(table.id, restaurant.id);
    tables.push({ id: table.id, number: table.number, token });
  }

  // ── Categories ───────────────────────────────────────────────────────────
  const hotDrinks = await prisma.category.upsert({
    where: { id: "cat-hot-drinks" },
    update: {},
    create: { id: "cat-hot-drinks", restaurantId: restaurant.id, name: "Hot Drinks", nameAr: "مشروبات ساخنة", sortOrder: 1 },
  });
  const coldDrinks = await prisma.category.upsert({
    where: { id: "cat-cold-drinks" },
    update: { name: "Cold & Iced Drinks", nameAr: "مشروبات بارده ومثلجة" },
    create: { id: "cat-cold-drinks", restaurantId: restaurant.id, name: "Cold & Iced Drinks", nameAr: "مشروبات بارده ومثلجة", sortOrder: 2 },
  });
  const food = await prisma.category.upsert({
    where: { id: "cat-food" },
    update: {},
    create: { id: "cat-food", restaurantId: restaurant.id, name: "Food", nameAr: "مأكولات", sortOrder: 3 },
  });

  // ── Size + Sugar + Milk modifier groups (reused across hot drinks) ────────
  const coffeeModifiers = {
    create: [
      {
        name: "Size", nameAr: "الحجم", type: "SINGLE" as const, required: true, minSelect: 1, maxSelect: 1,
        options: { create: [
          { name: "Small", nameAr: "صغير", priceDelta: 0, sortOrder: 1 },
          { name: "Medium", nameAr: "وسط", priceDelta: 10, sortOrder: 2 },
          { name: "Large", nameAr: "كبير", priceDelta: 15, sortOrder: 3 },
        ]},
      },
      {
        name: "Sugar", nameAr: "السكر", type: "SINGLE" as const, required: false, minSelect: 0, maxSelect: 1,
        options: { create: [
          { name: "No Sugar", nameAr: "بدون سكر", priceDelta: 0, sortOrder: 1 },
          { name: "Normal", nameAr: "سكر عادي", priceDelta: 0, sortOrder: 2 },
          { name: "Extra Sugar", nameAr: "سكر زيادة", priceDelta: 0, sortOrder: 3 },
        ]},
      },
      {
        name: "Milk", nameAr: "الحليب", type: "SINGLE" as const, required: false, minSelect: 0, maxSelect: 1,
        options: { create: [
          { name: "Regular Milk", nameAr: "حليب عادي", priceDelta: 0, sortOrder: 1 },
          { name: "Almond Milk", nameAr: "حليب لوز", priceDelta: 10, sortOrder: 2 },
          { name: "Oat Milk", nameAr: "حليب شوفان", priceDelta: 10, sortOrder: 3 },
        ]},
      },
    ],
  };

  // ── Hot Drinks ───────────────────────────────────────────────────────────
  const hotItems = [
    { id: "prod-espresso",   name: "Espresso",   nameAr: "إسبريسو",     price: 45, avgPrepMinutes: 3, withModifiers: true },
    { id: "prod-cappuccino", name: "Cappuccino", nameAr: "كابتشينو",    price: 55, avgPrepMinutes: 4, withModifiers: true },
    { id: "prod-latte",      name: "Latte",      nameAr: "لاتيه",       price: 60, avgPrepMinutes: 4, withModifiers: true },
    { id: "prod-americano",  name: "Americano",  nameAr: "أمريكانو",    price: 45, avgPrepMinutes: 3, withModifiers: true },
    { id: "prod-mint-tea",   name: "Mint Tea",   nameAr: "شاي بالنعناع", price: 35, avgPrepMinutes: 5, withModifiers: false },
  ];
  const hotProducts: string[] = [];
  for (const item of hotItems) {
    await prisma.product.upsert({
      where: { id: item.id },
      update: {},
      create: {
        id: item.id, restaurantId: restaurant.id, categoryId: hotDrinks.id,
        name: item.name, nameAr: item.nameAr, price: item.price, avgPrepMinutes: item.avgPrepMinutes,
        isAvailable: true, isFeatured: item.id === "prod-cappuccino",
        modifierGroups: item.withModifiers ? coffeeModifiers : undefined,
      },
    });
    hotProducts.push(item.id);
  }

  // ── Cold Drinks ──────────────────────────────────────────────────────────
  const coldItems = [
    { id: "prod-oj",        name: "Orange Juice",  nameAr: "عصير برتقال",    price: 55, avgPrepMinutes: 5 },
    { id: "prod-lemon",     name: "Lemon Mint",    nameAr: "ليمون بالنعناع", price: 50, avgPrepMinutes: 5 },
    { id: "prod-mojito",    name: "Mojito",        nameAr: "موهيتو",         price: 65, avgPrepMinutes: 6 },
    { id: "prod-cold-brew", name: "Cold Brew",     nameAr: "كولد برو",       price: 70, avgPrepMinutes: 2 },
  ];
  const coldProducts: string[] = [];
  for (const item of coldItems) {
    await prisma.product.upsert({
      where: { id: item.id },
      update: {},
      create: {
        id: item.id, restaurantId: restaurant.id, categoryId: coldDrinks.id,
        name: item.name, nameAr: item.nameAr, price: item.price, avgPrepMinutes: item.avgPrepMinutes,
        isAvailable: true,
      },
    });
    coldProducts.push(item.id);
  }

  // ── Food ─────────────────────────────────────────────────────────────────
  const foodItems = [
    { id: "prod-croissant",  name: "Croissant",       nameAr: "كرواسون",    price: 45, avgPrepMinutes: 8 },
    { id: "prod-toast",      name: "Breakfast Toast", nameAr: "توست إفطار", price: 75, avgPrepMinutes: 10 },
    { id: "prod-pancakes",   name: "Pancakes",        nameAr: "بان كيك",    price: 95, avgPrepMinutes: 12 },
    { id: "prod-salad",      name: "Salad",           nameAr: "سلطة",       price: 85, avgPrepMinutes: 8 },
  ];
  const foodProductIds: string[] = [];
  for (const item of foodItems) {
    await prisma.product.upsert({
      where: { id: item.id },
      update: {},
      create: {
        id: item.id, restaurantId: restaurant.id, categoryId: food.id,
        name: item.name, nameAr: item.nameAr, price: item.price, avgPrepMinutes: item.avgPrepMinutes,
        isAvailable: true,
      },
    });
    foodProductIds.push(item.id);
  }

  // ── FRÍO Menu (real client menu — expands/replaces demo placeholders) ────

  // New categories from the FRÍO menu PDF
  const bakery = await prisma.category.upsert({
    where: { id: "cat-bakery" },
    update: {},
    create: { id: "cat-bakery", restaurantId: restaurant.id, name: "Bakery", sortOrder: 4 },
  });
  const freshSalad = await prisma.category.upsert({
    where: { id: "cat-fresh-salad" },
    update: {},
    create: { id: "cat-fresh-salad", restaurantId: restaurant.id, name: "Fresh Salad", sortOrder: 5 },
  });
  const sandwich = await prisma.category.upsert({
    where: { id: "cat-sandwich" },
    update: {},
    create: { id: "cat-sandwich", restaurantId: restaurant.id, name: "Sandwich", sortOrder: 6 },
  });
  const classicCoffee = await prisma.category.upsert({
    where: { id: "cat-classic-coffee" },
    update: {},
    create: { id: "cat-classic-coffee", restaurantId: restaurant.id, name: "Classic Coffee", sortOrder: 7 },
  });

  // Shared "Customizations" modifier groups from the FRÍO menu (milk type / extra flavor / extra additions)
  const frioCustomizationGroups = [
    {
      name: "Milk Type", type: "SINGLE" as const, required: false, minSelect: 0, maxSelect: 1, sortOrder: 2,
      options: { create: [
        { name: "Whole Milk", priceDelta: 0, sortOrder: 1 },
        { name: "Skimmed Milk", priceDelta: 0, sortOrder: 2 },
        { name: "Almond Milk", priceDelta: 15, sortOrder: 3 },
        { name: "Coconut Milk", priceDelta: 0, sortOrder: 4 },
        { name: "Oat Milk", priceDelta: 0, sortOrder: 5 },
      ]},
    },
    {
      name: "Extra Flavor", type: "MULTI" as const, required: false, minSelect: 0, maxSelect: 3, sortOrder: 3,
      options: { create: [
        { name: "Caramel", priceDelta: 10, sortOrder: 1 },
        { name: "Vanilla", priceDelta: 10, sortOrder: 2 },
        { name: "Hazelnut", priceDelta: 10, sortOrder: 3 },
        { name: "Irish", priceDelta: 10, sortOrder: 4 },
        { name: "Cinnamon", priceDelta: 10, sortOrder: 5 },
        { name: "Honey", priceDelta: 10, sortOrder: 6 },
      ]},
    },
    {
      name: "Extra Additions", type: "MULTI" as const, required: false, minSelect: 0, maxSelect: 4, sortOrder: 4,
      options: { create: [
        { name: "Whipped Cream", priceDelta: 5, sortOrder: 1 },
        { name: "Marshmallow", priceDelta: 5, sortOrder: 2 },
        { name: "Espresso Shot", priceDelta: 10, sortOrder: 3 },
        { name: "Cookies", priceDelta: 10, sortOrder: 4 },
      ]},
    },
  ];
  const frioCustomizations = { create: frioCustomizationGroups };

  // "Size" modifier group — required single-select; option priceDeltas are relative to
  // product.price (the Small price), e.g. a "Large" delta of 10 means Large = price + 10.
  function frioSizeGroup(options: { name: string; priceDelta: number }[]) {
    return {
      name: "Size", type: "SINGLE" as const, required: true, minSelect: 1, maxSelect: 1, sortOrder: 1,
      options: { create: options.map((o, i) => ({ name: o.name, priceDelta: o.priceDelta, sortOrder: i + 1 })) },
    };
  }

  // Full modifier set for a sized hot-drink product: Size (required) + Milk/Flavor/Extras
  function frioSizedModifiers(sizeOptions: { name: string; priceDelta: number }[]) {
    return { create: [frioSizeGroup(sizeOptions), ...frioCustomizationGroups] };
  }

  // Idempotently replace a product's modifier groups (delete then recreate) — used for
  // products that already exist from earlier seed runs with different/legacy modifiers.
  async function replaceModifierGroups(
    productId: string,
    groups: Array<{
      name: string; type: "SINGLE" | "MULTI"; required: boolean; minSelect: number; maxSelect: number; sortOrder: number;
      options: { create: Array<{ name: string; priceDelta: number; sortOrder: number }> };
    }>
  ) {
    await prisma.modifierGroup.deleteMany({ where: { productId } });
    for (const group of groups) {
      await prisma.modifierGroup.create({ data: { productId, ...group } });
    }
  }

  // Repurpose existing placeholder products into FRÍO base products. Size is now
  // represented via a "Size" modifier group (Small = product.price) rather than
  // separate "<Name> Small"/"<Name> Large" rows — keeps the IDs already referenced by
  // demo orders intact, just updates name/price/modifiers to the real menu.
  await prisma.product.update({ where: { id: "prod-espresso" }, data: { name: "Espresso", price: 20 } });
  await replaceModifierGroups("prod-espresso", [
    frioSizeGroup([{ name: "Small", priceDelta: 0 }, { name: "Double", priceDelta: 5 }]),
    ...frioCustomizationGroups,
  ]);

  await prisma.product.update({ where: { id: "prod-cappuccino" }, data: { name: "Cappuccino", price: 30 } });
  await replaceModifierGroups("prod-cappuccino", [
    frioSizeGroup([{ name: "Small", priceDelta: 0 }, { name: "Large", priceDelta: 10 }]),
    ...frioCustomizationGroups,
  ]);

  await prisma.product.update({ where: { id: "prod-latte" }, data: { name: "Latte", price: 25 } });
  await replaceModifierGroups("prod-latte", [
    frioSizeGroup([{ name: "Small", priceDelta: 0 }, { name: "Large", priceDelta: 10 }]),
    ...frioCustomizationGroups,
  ]);

  await prisma.product.update({ where: { id: "prod-americano" }, data: { name: "Americano", price: 20 } });
  await replaceModifierGroups("prod-americano", [
    frioSizeGroup([{ name: "Small", priceDelta: 0 }, { name: "Large", priceDelta: 10 }]),
    ...frioCustomizationGroups,
  ]);

  await prisma.product.update({ where: { id: "prod-croissant" }, data: { name: "Croissant", price: 15, categoryId: bakery.id } });

  // ── FRÍO Hot Drinks (PDF page 1) — single-price items (no Size variants) ────
  const frioHotSingleItems = [
    { id: "prod-flat-white", name: "Flat White", price: 25 },
    { id: "prod-cortado",    name: "Cortado",     price: 25 },
  ];
  const frioHotProductIds: string[] = [];
  for (const item of frioHotSingleItems) {
    await prisma.product.upsert({
      where: { id: item.id },
      update: {},
      create: {
        id: item.id, restaurantId: restaurant.id, categoryId: hotDrinks.id,
        name: item.name, price: item.price, avgPrepMinutes: 4,
        isAvailable: true, modifierGroups: frioCustomizations,
      },
    });
    frioHotProductIds.push(item.id);
  }

  // ── FRÍO Hot Drinks — sized items: base product (Small price) + "Size" modifier ──
  const frioHotSizedItems = [
    { id: "prod-macchiato",         name: "Macchiato",              price: 25, sizes: [{ name: "Small", priceDelta: 0 }, { name: "Double", priceDelta: 5 }] },
    { id: "prod-spanish-latte",     name: "Spanish Latte",          price: 30, sizes: [{ name: "Small", priceDelta: 0 }, { name: "Large", priceDelta: 10 }] },
    { id: "prod-mocha",             name: "Mocha",                  price: 30, sizes: [{ name: "Small", priceDelta: 0 }, { name: "Large", priceDelta: 10 }] },
    { id: "prod-caramel-macchiato", name: "Caramel Macchiato",      price: 30, sizes: [{ name: "Small", priceDelta: 0 }, { name: "Large", priceDelta: 10 }] },
    { id: "prod-matcha-latte",      name: "Matcha Green Tea Latte", price: 30, sizes: [{ name: "Small", priceDelta: 0 }, { name: "Large", priceDelta: 10 }] },
    { id: "prod-hot-chocolate",     name: "Hot Chocolate",          price: 30, sizes: [{ name: "Small", priceDelta: 0 }, { name: "Large", priceDelta: 5 }] },
    { id: "prod-hot-cider",         name: "Hot Cider",              price: 25, sizes: [{ name: "Small", priceDelta: 0 }, { name: "Large", priceDelta: 5 }] },
    { id: "prod-cinnamon-milk",     name: "Cinnamon Milk",          price: 20, sizes: [{ name: "Small", priceDelta: 0 }, { name: "Large", priceDelta: 10 }] },
  ];
  for (const item of frioHotSizedItems) {
    await prisma.product.upsert({
      where: { id: item.id },
      update: {},
      create: {
        id: item.id, restaurantId: restaurant.id, categoryId: hotDrinks.id,
        name: item.name, price: item.price, avgPrepMinutes: 4,
        isAvailable: true, modifierGroups: frioSizedModifiers(item.sizes),
      },
    });
    frioHotProductIds.push(item.id);
  }

  // Tea — has its own flavor add-on list (Latte/Lemon/Mango/Strawberry/Green), not modeled here
  await prisma.product.upsert({
    where: { id: "prod-tea" },
    update: {},
    create: {
      id: "prod-tea", restaurantId: restaurant.id, categoryId: hotDrinks.id,
      name: "Tea", price: 10, avgPrepMinutes: 3, isAvailable: true,
    },
  });
  frioHotProductIds.push("prod-tea");

  // ── FRÍO Cold & Iced Drinks (PDF page 2) ─────────────────────────────────
  const frioColdItems = [
    { id: "prod-iced-latte",             name: "Iced Latte",                  price: 35, withCustomizations: true },
    { id: "prod-iced-mocha",             name: "Iced Mocha",                  price: 40, withCustomizations: true },
    { id: "prod-frappuccino",            name: "Frappuccino",                 price: 40, withCustomizations: false },
    { id: "prod-iced-caramel-macchiato", name: "Ice Caramel Macchiato",       price: 40, withCustomizations: true },
    { id: "prod-iced-chocolate",         name: "Iced Chocolate",              price: 35, withCustomizations: true },
    { id: "prod-oreo",                   name: "Oreo",                        price: 40, withCustomizations: false },
    { id: "prod-milkshake",              name: "Milkshake",                   price: 35, withCustomizations: false },
    { id: "prod-smoothie",               name: "Smoothie",                    price: 35, withCustomizations: false },
    { id: "prod-sunshine",               name: "Sunshine",                    price: 30, withCustomizations: false },
    { id: "prod-cherry-cola",            name: "Cherry Cola",                 price: 25, withCustomizations: false },
    { id: "prod-espresso-redbull",       name: "Espresso Redbull",            price: 45, withCustomizations: false },
    { id: "prod-redbull",                name: "Redbull",                     price: 35, withCustomizations: false },
    { id: "prod-redbull-white",          name: "Redbull White",               price: 35, withCustomizations: false },
    { id: "prod-redbull-white-mixes",    name: "Redbull White Mixes",         price: 40, withCustomizations: false },
    { id: "prod-redbull-sugar-free",     name: "Redbull Sugar Free",          price: 35, withCustomizations: false },
    { id: "prod-redbull-mixes",          name: "Redbull Mixes",               price: 40, withCustomizations: false },
    { id: "prod-iced-matcha-latte",      name: "Iced Matcha Green Tea Latte", price: 40, withCustomizations: true },
    { id: "prod-iced-tea",               name: "Iced Tea",                    price: 30, withCustomizations: false },
    { id: "prod-water",                  name: "Water",                       price: 5,  withCustomizations: false },
  ];
  const frioColdProductIds: string[] = [];
  for (const item of frioColdItems) {
    await prisma.product.upsert({
      where: { id: item.id },
      update: {},
      create: {
        id: item.id, restaurantId: restaurant.id, categoryId: coldDrinks.id,
        name: item.name, price: item.price, avgPrepMinutes: 4,
        isAvailable: true, modifierGroups: item.withCustomizations ? frioCustomizations : undefined,
      },
    });
    frioColdProductIds.push(item.id);
  }

  // ── FRÍO Bakery (PDF page 3) — Croissant repurposed above, two new items here ──
  const frioBakeryItems = [
    { id: "prod-cookies",        name: "Cookies",              price: 15 },
    { id: "prod-granola-yogurt", name: "Granola Greek Yogurt", price: 35 },
  ];
  const frioBakeryProductIds: string[] = [];
  for (const item of frioBakeryItems) {
    await prisma.product.upsert({
      where: { id: item.id },
      update: {},
      create: {
        id: item.id, restaurantId: restaurant.id, categoryId: bakery.id,
        name: item.name, price: item.price, avgPrepMinutes: 5, isAvailable: true,
      },
    });
    frioBakeryProductIds.push(item.id);
  }

  // ── FRÍO Fresh Salad (PDF page 3) — no prices listed, created unavailable (price 0) ──
  const frioSaladItems = [
    { id: "prod-pasta-salad",   name: "Pasta Salad" },
    { id: "prod-chicken-salad", name: "Chicken Salad" },
    { id: "prod-cezer-salad",   name: "Cezer Salad" },
    { id: "prod-greek-salad",   name: "Greek Salad" },
    { id: "prod-avocado-salad", name: "Avocado Salad" },
  ];
  for (const item of frioSaladItems) {
    await prisma.product.upsert({
      where: { id: item.id },
      update: {},
      create: {
        id: item.id, restaurantId: restaurant.id, categoryId: freshSalad.id,
        name: item.name, price: 0, avgPrepMinutes: 8, isAvailable: false,
      },
    });
  }

  // ── FRÍO Sandwich (PDF page 3) — no prices listed, created unavailable (price 0) ──
  const frioSandwichItems = [
    { id: "prod-smoke-turkey-sandwich", name: "Smoke Turkey Baguette Sandwich" },
    { id: "prod-smoke-beef-sandwich",   name: "Smoke Beef Baguette Sandwich" },
    { id: "prod-salami-sandwich",       name: "Salami Baguette Sandwich" },
    { id: "prod-pastarami-sandwich",    name: "Pastarami Baguette Sandwich" },
  ];
  for (const item of frioSandwichItems) {
    await prisma.product.upsert({
      where: { id: item.id },
      update: {},
      create: {
        id: item.id, restaurantId: restaurant.id, categoryId: sandwich.id,
        name: item.name, price: 0, avgPrepMinutes: 8, isAvailable: false,
      },
    });
  }

  // ── FRÍO Classic Coffee (PDF page 4) — base product (Small price) + "Size" modifier ──
  const frioClassicItems = [
    { id: "prod-turkish-coffee",        name: "Turkish Coffee",        price: 20, sizes: [{ name: "Small", priceDelta: 0 }, { name: "Double", priceDelta: 5 }] },
    { id: "prod-french-coffee",         name: "French Coffee",         price: 25, sizes: [{ name: "Small", priceDelta: 0 }, { name: "Double", priceDelta: 5 }] },
    { id: "prod-nutella-french-coffee", name: "Nutella French Coffee", price: 30, sizes: [{ name: "Small", priceDelta: 0 }, { name: "Double", priceDelta: 5 }] },
  ];
  const frioClassicProductIds: string[] = [];
  for (const item of frioClassicItems) {
    await prisma.product.upsert({
      where: { id: item.id },
      update: {},
      create: {
        id: item.id, restaurantId: restaurant.id, categoryId: classicCoffee.id,
        name: item.name, price: item.price, avgPrepMinutes: 5,
        isAvailable: true, modifierGroups: frioSizedModifiers(item.sizes),
      },
    });
    frioClassicProductIds.push(item.id);
  }

  // ── Hide deprecated size-specific product rows from earlier seed runs ───
  // These rows are now represented as a single base product + "Size" modifier
  // (see frioHotSizedItems / frioClassicItems above). They can't be hard-deleted
  // because OrderItem.product is a restricted FK, so mark them unavailable instead.
  // updateMany is a no-op for IDs that don't exist, so this is safe on any DB state.
  const deprecatedProductIds = [
    "prod-espresso-double",
    "prod-macchiato-small", "prod-macchiato-double",
    "prod-latte-large",
    "prod-spanish-latte-small", "prod-spanish-latte-large",
    "prod-cappuccino-large",
    "prod-mocha-small", "prod-mocha-large",
    "prod-americano-large",
    "prod-caramel-macchiato-small", "prod-caramel-macchiato-large",
    "prod-matcha-latte-small", "prod-matcha-latte-large",
    "prod-hot-chocolate-small", "prod-hot-chocolate-large",
    "prod-hot-cider-small", "prod-hot-cider-large",
    "prod-cinnamon-milk-small", "prod-cinnamon-milk-large",
    "prod-turkish-coffee-small", "prod-turkish-coffee-double",
    "prod-french-coffee-small", "prod-french-coffee-double",
    "prod-nutella-french-coffee-small", "prod-nutella-french-coffee-double",
  ];
  await prisma.product.updateMany({
    where: { id: { in: deprecatedProductIds } },
    data: { isAvailable: false },
  });

  const allProductIds = [
    ...hotProducts, ...coldProducts, ...foodProductIds,
    ...frioHotProductIds, ...frioColdProductIds, ...frioBakeryProductIds, ...frioClassicProductIds,
  ];

  // ── Customers ────────────────────────────────────────────────────────────
  const customerData = [
    { id: "cust-1", phone: "+201000000001", name: "Ahmed Mohamed" },
    { id: "cust-2", phone: "+201000000002", name: "Sara Ali" },
    { id: "cust-3", phone: "+201000000003", name: "Mohamed Hassan" },
    { id: "cust-4", phone: "+201000000004", name: "Nour Ibrahim" },
    { id: "cust-5", phone: "+201000000005", name: "Karim Youssef" },
  ];
  const customers = await Promise.all(customerData.map(c =>
    prisma.customer.upsert({ where: { id: c.id }, update: {}, create: c })
  ));

  // ── Pre-create one CLOSED session per table (unique constraint allows one per table+status) ──
  const sessions: string[] = [];
  for (const table of tables) {
    const existing = await prisma.session.findFirst({ where: { tableId: table.id, restaurantId: restaurant.id, status: "CLOSED" } });
    if (existing) {
      sessions.push(existing.id);
    } else {
      const openedAt = randomDate(30);
      const s = await prisma.session.create({
        data: { tableId: table.id, restaurantId: restaurant.id, status: "CLOSED", openedAt, closedAt: new Date(openedAt.getTime() + 60 * 60 * 1000) },
      });
      sessions.push(s.id);
    }
  }

  // ── Demo orders (25 historical, spread across 30 days) ──────────────────
  let ordersCreated = 0;
  for (let i = 0; i < 25; i++) {
    const cust = customers[i % customers.length]!;
    const sessionId = sessions[i % sessions.length]!;
    const createdAt = randomDate(30);

    // Pick 2-3 random products
    const shuffled = [...allProductIds].sort(() => Math.random() - 0.5);
    const pickedIds = shuffled.slice(0, Math.floor(Math.random() * 2) + 2);
    const products = await prisma.product.findMany({ where: { id: { in: pickedIds } }, select: { id: true, price: true } });

    const items = products.map(p => ({ productId: p.id, quantity: 1, unitPrice: Number(p.price), totalPrice: Number(p.price) }));
    const subtotal = items.reduce((s, x) => s + x.totalPrice, 0);
    const tax = Math.round(subtotal * 0.14 * 100) / 100;
    const total = subtotal + tax;

    const orderCount = await prisma.order.count({ where: { restaurantId: restaurant.id } });
    await prisma.order.create({
      data: {
        orderNumber: orderCount + 1,
        sessionId,
        restaurantId: restaurant.id,
        customerId: cust.id,
        status: "SERVED",
        type: "DINE_IN",
        currency: "EGP",
        subtotal,
        tax,
        total,
        createdAt,
        items: { create: items },
      },
    });
    ordersCreated++;
  }

  // ── Loyalty program (stamp card) ─────────────────────────────────────────
  await prisma.loyaltyProgram.upsert({
    where: { restaurantId: restaurant.id },
    update: {},
    create: { restaurantId: restaurant.id, type: "STAMP", isActive: true },
  });

  const stampConfigs = [
    { customerId: customers[0]!.id, stamps: 9 },
    { customerId: customers[1]!.id, stamps: 5 },
    { customerId: customers[2]!.id, stamps: 3 },
  ];
  for (const cfg of stampConfigs) {
    await prisma.stampCard.upsert({
      where: { restaurantId_customerId: { restaurantId: restaurant.id, customerId: cfg.customerId } },
      update: { stamps: cfg.stamps },
      create: { restaurantId: restaurant.id, customerId: cfg.customerId, stamps: cfg.stamps, stampsRequired: 10, rewardType: "FREE_ITEM" },
    });
  }

  // ── Inventory ────────────────────────────────────────────────────────────
  const ingredients = [
    { name: "Coffee Beans", nameAr: "حبوب القهوة", unit: "kg", currentStock: 5, minStock: 1, costPerUnit: 150 },
    { name: "Milk",         nameAr: "حليب",         unit: "L",  currentStock: 10, minStock: 2, costPerUnit: 20 },
    { name: "Oat Milk",     nameAr: "حليب شوفان",   unit: "L",  currentStock: 3,  minStock: 1, costPerUnit: 45 },
    { name: "Sugar",        nameAr: "سكر",           unit: "kg", currentStock: 2,  minStock: 0.5, costPerUnit: 10 },
  ];
  for (const ing of ingredients) {
    const existing = await prisma.ingredientStock.findFirst({ where: { restaurantId: restaurant.id, name: ing.name } });
    if (!existing) {
      await prisma.ingredientStock.create({ data: { ...ing, restaurantId: restaurant.id } });
    }
  }

  // ── Staff ────────────────────────────────────────────────────────────────
  const staffData = [
    { id: "staff-owner",   clerkUserId: "demo-clerk-owner",   name: "Demo Owner",   role: "OWNER" as const },
    { id: "staff-manager", clerkUserId: "demo-clerk-manager", name: "Demo Manager", role: "MANAGER" as const },
    { id: "staff-cashier", clerkUserId: "demo-clerk-cashier", name: "Demo Cashier", role: "CASHIER" as const },
    { id: "staff-kitchen", clerkUserId: "demo-clerk-kitchen", name: "Demo Kitchen", role: "KITCHEN" as const },
  ];
  for (const s of staffData) {
    await prisma.staff.upsert({ where: { id: s.id }, update: {}, create: { ...s, restaurantId: restaurant.id } });
  }

  // ── Happy Hour pricing rule ──────────────────────────────────────────────
  await prisma.pricingRule.upsert({
    where: { id: "demo-happy-hour" },
    update: {},
    create: {
      id: "demo-happy-hour",
      restaurantId: restaurant.id,
      name: "Happy Hour",
      nameAr: "ساعة سعيدة",
      type: "PERCENTAGE_OFF",
      value: 20,
      daysOfWeek: [1, 2, 3, 4, 5], // Mon–Fri
      startTime: "15:00",
      endTime: "17:00",
      productIds: [],
      categoryIds: [],
      isActive: true,
    },
  });

  // ── Demo reviews ─────────────────────────────────────────────────────────
  const orders = await prisma.order.findMany({ where: { restaurantId: restaurant.id }, take: 10, orderBy: { createdAt: "desc" } });
  const reviewData = [
    { rating: 5, tags: ["سريع", "لذيذ"], comment: "رائع جداً، سأعود مجدداً" },
    { rating: 4, tags: ["لذيذ", "نظيف"] },
    { rating: 5, tags: ["موظفين ممتازين", "سريع"], comment: "خدمة ممتازة" },
    { rating: 4, tags: ["لذيذ"] },
    { rating: 5, tags: ["سريع", "نظيف"] },
    { rating: 4, tags: ["لذيذ", "موظفين ممتازين"] },
    { rating: 3, tags: [], comment: "كان جيداً" },
    { rating: 5, tags: ["سريع", "لذيذ"] },
    { rating: 5, tags: ["نظيف"] },
    { rating: 4, tags: ["لذيذ"] },
  ];
  let reviewsCreated = 0;
  for (let i = 0; i < Math.min(orders.length, reviewData.length); i++) {
    const order = orders[i]!;
    const existing = await prisma.orderReview.findUnique({ where: { orderId: order.id } });
    if (!existing) {
      await prisma.orderReview.create({
        data: {
          orderId: order.id,
          restaurantId: restaurant.id,
          customerId: order.customerId,
          rating: reviewData[i]!.rating,
          comment: reviewData[i]!.comment,
          tags: reviewData[i]!.tags,
        },
      });
      reviewsCreated++;
    }
  }

  // ── Summary ──────────────────────────────────────────────────────────────
  const table1Token = tables[0]!.token;
  const table1Url = `http://localhost:3000/t/${table1Token}`;

  console.warn("\n✅ Demo restaurant ready!");
  console.warn(`   Restaurant: ${restaurant.name} (EGP, 14% VAT, Africa/Cairo)`);
  console.warn(`   Tables created: ${tables.length}`);
  console.warn(`   Products created/updated: ${allProductIds.length} order-eligible (plus 9 unavailable FRÍO salad/sandwich placeholders)`);
  console.warn(`   Demo orders: ${ordersCreated}`);
  console.warn(`   Reviews: ${reviewsCreated}`);
  console.warn(`   Staff: ${staffData.length}`);
  console.warn(`\n   Demo Table 1 customer URL:`);
  console.warn(`   ${table1Url}`);
  console.warn(`\n   Dashboard: http://localhost:3001`);
  console.warn(`   Kitchen:   http://localhost:3002`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
