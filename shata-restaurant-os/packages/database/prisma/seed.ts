import { PrismaClient } from "../generated/client";

const prisma = new PrismaClient();

async function main() {
  console.warn("🌱 Seeding database...");

  // Create a demo organization
  const org = await prisma.organization.upsert({
    where: { id: "demo-org-1" },
    update: {},
    create: {
      id: "demo-org-1",
      name: "Demo Restaurant Group",
      plan: "STARTER",
    },
  });

  // Create a demo restaurant (USD, no tax — neutral defaults)
  const restaurant = await prisma.restaurant.upsert({
    where: { id: "demo-restaurant-1" },
    update: {},
    create: {
      id: "demo-restaurant-1",
      orgId: org.id,
      name: "The Demo Kitchen",
      slug: "demo-kitchen",
      currency: "USD",
      locale: "en",
      timezone: "UTC",
      taxRate: 0.0,
      taxLabel: "Tax",
      taxInclusive: false,
      settings: {
        orderConfirmationMode: "manual",
        kitchenStations: ["ALL", "GRILL", "BAR", "COLD"],
        enabledPaymentProviders: ["STRIPE", "MANUAL"],
        preferredPaymentProvider: "STRIPE",
      },
    },
  });

  // Create demo table
  const table = await prisma.table.upsert({
    where: { id: "demo-table-1" },
    update: {},
    create: {
      id: "demo-table-1",
      restaurantId: restaurant.id,
      number: "1",
      label: "Window Table",
      qrCode: "demo-qr-table-1",
      status: "AVAILABLE",
      capacity: 4,
    },
  });

  // Create menu categories
  const burgers = await prisma.category.upsert({
    where: { id: "cat-burgers" },
    update: {},
    create: {
      id: "cat-burgers",
      restaurantId: restaurant.id,
      name: "Burgers",
      nameAr: "برغر",
      sortOrder: 1,
      isAvailable: true,
    },
  });

  const drinks = await prisma.category.upsert({
    where: { id: "cat-drinks" },
    update: {},
    create: {
      id: "cat-drinks",
      restaurantId: restaurant.id,
      name: "Drinks",
      nameAr: "مشروبات",
      sortOrder: 2,
      isAvailable: true,
    },
  });

  // Create demo products
  await prisma.product.upsert({
    where: { id: "prod-classic-burger" },
    update: {},
    create: {
      id: "prod-classic-burger",
      restaurantId: restaurant.id,
      categoryId: burgers.id,
      name: "Classic Burger",
      nameAr: "برغر كلاسيك",
      description: "Juicy beef patty with fresh vegetables and special sauce.",
      price: 12.99,
      isAvailable: true,
      isFeatured: true,
      sortOrder: 1,
      modifierGroups: {
        create: [
          {
            name: "Size",
            nameAr: "الحجم",
            type: "SINGLE",
            required: true,
            minSelect: 1,
            maxSelect: 1,
            options: {
              create: [
                { name: "Regular", nameAr: "عادي", priceDelta: 0 },
                { name: "Large", nameAr: "كبير", priceDelta: 2.5 },
              ],
            },
          },
          {
            name: "Add-ons",
            nameAr: "إضافات",
            type: "MULTI",
            required: false,
            minSelect: 0,
            maxSelect: 3,
            options: {
              create: [
                { name: "Extra Cheese", nameAr: "جبن إضافي", priceDelta: 1.0 },
                { name: "Bacon", nameAr: "بيكون", priceDelta: 1.5 },
                { name: "Avocado", nameAr: "أفوكادو", priceDelta: 2.0 },
              ],
            },
          },
        ],
      },
    },
  });

  await prisma.product.upsert({
    where: { id: "prod-cola" },
    update: {},
    create: {
      id: "prod-cola",
      restaurantId: restaurant.id,
      categoryId: drinks.id,
      name: "Cola",
      nameAr: "كولا",
      price: 2.99,
      isAvailable: true,
      sortOrder: 1,
    },
  });

  console.warn("✅ Seed complete.");
  console.warn(`   Org: ${org.name}`);
  console.warn(`   Restaurant: ${restaurant.name}`);
  console.warn(`   Table: ${table.number} — QR: ${table.qrCode}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
