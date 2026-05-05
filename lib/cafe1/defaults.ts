import type { MenuItem, SiteConfig } from "./types";

function item(
  id: string,
  category: string,
  name: string,
  price: string,
  desc = "",
  badge?: string
): MenuItem {
  return {
    id,
    handle: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""),
    name,
    category,
    price,
    description: desc,
    images: ["/templates/cafe1/menu/placeholder.jpg"],
    ...(badge ? { badge } : {}),
    active: true,
  };
}

export const CAFE1_DEFAULTS: SiteConfig = {
  brand: {
    name: "Cafert",
    tagline: "Good Food & Good Mood",
  },
  theme: {
    headerColor: "#534931",
    bodyColor:   "#5C5C5C",
    accentColor: "#B38E6A",
    primaryBg:   "#E5DCD2",
    lightBg:     "#F7F7F7",
    radius:      "4px",
  },
  sections: {
    hero: {
      subtitle:  "Breakfast",
      heading:   "Welcome to Cafert",
      ctaLabel:  "Reservations",
    },
    offer: {
      enabled:  true,
      heading:  "Free Breakfast!",
      subtitle: "Every 5th breakfast as a gift.",
    },
    menu: {
      enabled:  true,
      heading:  "Special Menu",
      subtitle: "our menu",
    },
    about: {
      enabled:  true,
      heading:  "Our Story",
      subtitle: "About Us",
      body: "We believe great food brings people together. Since opening our doors, we have been dedicated to crafting memorable dining experiences with the freshest ingredients and warmest hospitality.",
    },
    testimonials: {
      enabled: true,
      heading: "What Our Guests Say",
      items: [
        { name: "Kristin Watson", role: "Regular Guest",  text: "At integer duis duis enim, auctor ultrices eu, natoque eget. Leo aliquam egestas ac ac suspendisse auctor nunc. Lectus vitae, quis libero sit lorem." },
        { name: "Derek Smith",    role: "Food Critic",    text: "Leo aliquam duis duis enim, auctor ultrices eu, natoque eget. Leo aliquam egestas ac ac suspendisse auctor nunc. Lectus vitae, quis libero sit lorem." },
        { name: "Mary Lynn",      role: "Local Blogger",  text: "Quis auctor nunc, auctor ultrices eu, natoque eget. Leo aliquam egestas ac ac suspendisse auctor nunc. Lectus vitae, quis libero sit lorem." },
      ],
    },
    privateDining: {
      enabled:  true,
      heading:  "Private Dining at Tasty Meals",
      subtitle: "welcome",
      ctaLabel: "Make reservations",
    },
    booking: {
      enabled:  true,
      heading:  "Book Your Reservation Today",
      subtitle: "contact us",
      ctaLabel: "reserve a table",
    },
  },
  menuItems: [
    // Starters
    item("s1", "starters", "Pate with Mushrooms",       "$15", "Classic pâté with fresh mushrooms"),
    item("s2", "starters", "Cheese Slices",              "$25", "Assorted artisan cheese selection"),
    item("s3", "starters", "Chicken Wings",              "$30", "Crispy spiced chicken wings", "spicy"),
    item("s4", "starters", "Shrimps in Butter",          "$18", "Pan-seared shrimps in garlic butter"),
    item("s5", "starters", "Cold Cuts",                  "$32", "Selection of premium cured meats"),
    item("s6", "starters", "Pita Bread with Vegetables", "$28", "Warm pita with seasonal vegetables", "vegan"),
    item("s7", "starters", "Assorted Vegetables",        "$10", "Fresh seasonal vegetable platter", "vegan"),
    item("s8", "starters", "Toast with Salmon",          "$15", "Sourdough toast with smoked salmon"),
    // Breakfasts
    item("b1", "breakfasts", "English Breakfast",    "$25", "Full English with eggs, bacon, beans, and toast"),
    item("b2", "breakfasts", "Classic Breakfast",    "$18", "Eggs your way with hash browns and toast", "spicy"),
    item("b3", "breakfasts", "Nutella French Toast", "$16", "Thick-cut brioche with Nutella and berries"),
    item("b4", "breakfasts", "Avocado Toast",        "$16", "Multigrain toast with smashed avocado and poached egg"),
    item("b5", "breakfasts", "Buttermilk Pancakes",  "$12", "Fluffy stack with maple syrup and fresh berries"),
    item("b6", "breakfasts", "Huevos Rancheros",     "$16", "Eggs on crispy tortillas with salsa roja", "spicy"),
    item("b7", "breakfasts", "Avenue Club",          "$19", "Triple-decker sandwich with turkey and avocado"),
    item("b8", "breakfasts", "Penne Alfredo",        "$24", "Al dente penne in a rich cream parmesan sauce"),
    // Desserts
    item("d1", "desserts", "Nutella Chocolate", "$12", "Warm chocolate cake with Nutella center", "vegan"),
    item("d2", "desserts", "Romeo and Juliet",  "$15", "Guava paste with cream cheese", "vegan"),
    item("d3", "desserts", "Very Berry",        "$15", "Mixed berry tart with vanilla cream", "vegan"),
    item("d4", "desserts", "Biscotti",          "$14", "Traditional Italian almond biscotti"),
    item("d5", "desserts", "Brownie",           "$15", "Rich dark chocolate brownie"),
    item("d6", "desserts", "Brownie Sundae",    "$15", "Brownie topped with vanilla ice cream"),
    item("d7", "desserts", "Cheese Cake",       "$10", "Classic New York style cheesecake"),
    item("d8", "desserts", "Fruit Parfait",     "$14", "Layered yogurt, granola, and fresh fruit"),
    // Beverages
    item("v1", "beverages", "Strawberry Lychee",          "$13", "Fresh strawberry and lychee cooler"),
    item("v2", "beverages", "Blueberry Mojito",            "$13", "Blueberry mint mocktail over ice"),
    item("v3", "beverages", "Spicy Rita",                  "$15", "Jalapeño-infused citrus cocktail", "spicy"),
    item("v4", "beverages", "Puebla Old Fashioned",        "$15", "Mezcal old fashioned with chili bitters"),
    item("v5", "beverages", "Santorini Mule",              "$15", "Greek-inspired mule with ouzo"),
    item("v6", "beverages", "Tropical Cooler",             "$17", "Mango, pineapple, and coconut blend"),
    item("v7", "beverages", "Fig Dark & Stormy",           "$17", "Dark rum with fig syrup and ginger beer"),
    item("v8", "beverages", "Maple Makers Old Fashion",    "$17", "Bourbon with maple syrup and orange bitters"),
  ],
  contact: {
    address: "2464 Royal Ln. Mesa, New Jersey 45463",
    phone:   "+1 (800) 234-65-78",
    phone2:  "+1 (800) 999-23-59",
    email:   "cafert@example.com",
    hours: [
      { day: "Mon – Fri",  time: "8am – 9pm" },
      { day: "Saturday",   time: "9am – 4pm" },
      { day: "Sunday",     time: "9am – 4pm" },
    ],
    instagram: "https://instagram.com",
    facebook:  "https://facebook.com",
    twitter:   "https://twitter.com",
  },
  navigation: [
    { label: "Home",        href: "/templates/cafe-1/preview" },
    { label: "About",       href: "/templates/cafe-1/preview/about" },
    { label: "Menu",        href: "/templates/cafe-1/preview/menu" },
    { label: "Reservation", href: "/templates/cafe-1/preview/reservation" },
    { label: "Contact",     href: "/templates/cafe-1/preview/contact" },
  ],
};
