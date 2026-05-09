import type { MenuItem, SiteConfig } from "./types";

const B = "/templates/restaurant1/assets/images";

// High-resolution Unsplash image sets (food & restaurant themed)
const U = {
  // Sliders / hero backgrounds
  sliders: [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&h=800&fit=crop&q=85",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&h=800&fit=crop&q=85",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&h=800&fit=crop&q=85",
  ],
  // Page title backgrounds
  pageTitle: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&h=600&fit=crop&q=85",
  // Background sections
  bg1: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=1920&h=900&fit=crop&q=80",
  bg8: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=1920&h=900&fit=crop&q=80",
  // Gallery
  gallery: [
    "https://images.unsplash.com/photo-1559339352-11d035aa65ce?w=800&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1544025162-d76538b367dc?w=800&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1485963631004-f2f00b1d6606?w=800&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&h=800&fit=crop&q=80",
  ],
  // Blog post images
  blog: [
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=560&fit=crop&q=80",
    "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800&h=560&fit=crop&q=80",
    "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&h=560&fit=crop&q=80",
    "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=560&fit=crop&q=80",
    "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=800&h=560&fit=crop&q=80",
    "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&h=560&fit=crop&q=80",
  ],
  // Menu item images
  menu: [
    "https://images.unsplash.com/photo-1559339352-11d035aa65ce?w=600&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1485963631004-f2f00b1d6606?w=600&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1544025162-d76538b367dc?w=600&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&h=600&fit=crop&q=80",
  ],
  // Chef portraits
  team: [
    "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&h=720&fit=crop&q=80",
    "https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=600&h=720&fit=crop&q=80",
    "https://images.unsplash.com/photo-1583394293253-f5f87c38c31f?w=600&h=720&fit=crop&q=80",
    "https://images.unsplash.com/photo-1559339352-11d035aa65ce?w=600&h=720&fit=crop&q=80",
  ],
  // Testimonial avatars
  testimonial: [
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&h=200&fit=crop&q=80",
  ],
  // Specials
  specials: [
    "https://images.unsplash.com/photo-1559339352-11d035aa65ce?w=600&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=600&fit=crop&q=80",
  ],
};

function menuItem(
  id: string,
  category: string,
  name: string,
  price: string,
  description: string,
  image: string,
  badge?: string
): MenuItem {
  return {
    id,
    handle: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""),
    name,
    description,
    price,
    image,
    category,
    badge,
    active: true,
    featured: false,
  };
}

export const R1_DEFAULTS: SiteConfig = {
  brand: {
    name: "La Belle Table",
    tagline: "Elegant Restaurant & Fine Dining",
    logo: `${B}/logo/logo-dark.png`,
    logoLight: `${B}/logo/logo-light.png`,
  },
  theme: {
    primaryColor: "#c8a97e",
    accentColor: "#8c6e4f",
    darkColor: "#1a1a1a",
    lightColor: "#f9f6f2",
    bodyFont: "Raleway",
    headingFont: "Raleway",
  },
  hero: {
    slides: [
      {
        id: "s1",
        image: U.sliders[0],
        subheadline: "La Belle Table Offers You",
        headline: "The Best Tasting Experience!",
        bio: "La Belle Table is a restaurant, bar and coffee roastery. We have awesome recipes and the most talented chefs in town!",
        ctaLabel: "Get A Reservation Now",
        ctaHref: "/templates/restaurant-1/preview/reservation",
      },
      {
        id: "s2",
        image: U.sliders[1],
        subheadline: "Hello, We Are La Belle Table",
        headline: "We Serve Quality Food",
        bio: "La Belle Table is a restaurant, bar and coffee roastery. We have awesome recipes and the most talented chefs in town!",
        ctaLabel: "View Menu",
        ctaHref: "/templates/restaurant-1/preview/menu",
      },
      {
        id: "s3",
        image: U.sliders[2],
        subheadline: "Made With Love",
        headline: "Hot and Ready to Serve",
        bio: "La Belle Table is a restaurant, bar and coffee roastery. We have awesome recipes and the most talented chefs in town!",
        ctaLabel: "About Us",
        ctaHref: "/templates/restaurant-1/preview/about",
      },
    ],
  },
  about: {
    subtitle: "Hello dear",
    heading: "Welcome To La Belle Table",
    description:
      "La Belle Table was the first restaurant to open in our area. The restaurant was designed with history in mind — we created a soft industrial dining room, combined with an open kitchen, coffee take-out bar and on-site coffee roastery.",
    tabs: [
      { id: "About", label: "About" },
      { id: "History", label: "History" },
      { id: "Awards", label: "Awards" },
      { id: "Chefs", label: "Chefs" },
    ],
  },
  specials: {
    subtitle: "What's for lunch?",
    heading: "Check Our Daily Specials",
    bgImage: U.bg8,
    dishes: [
      {
        id: "sp1",
        price: "$24.95",
        title: "Chesapeake Crab and Artichoke Dip",
        description:
          "Creamy chesapeake crab dip with artichoke, baked and topped with cheddar cheese. Served with crusty bread for dipping.",
      },
      {
        id: "sp2",
        price: "$36.95",
        title: "Crispy Shrimp and Grits",
        description:
          "Beer battered jumbo shrimp served with crispy cheddar grit polenta, corn and tomato salsa and old bay remoulade.",
      },
      {
        id: "sp3",
        price: "$21.95",
        title: "Thai Chicken Quesadilla",
        description:
          "A chipotle pepper tortilla stuffed with grilled chicken, fresh cilantro, red cabbage, mozzarella with sweet thai chili sauce.",
      },
    ],
  },
  menuSection: {
    subtitle: "our menu",
    heading: "Our Food Menu",
    description:
      "Explore our carefully curated menus, crafted daily with the freshest seasonal ingredients by our award-winning chefs.",
    categories: [
      { id: "lunch", label: "Lunch", handle: "lunch" },
      { id: "dinner", label: "Dinner", handle: "dinner" },
      { id: "dessert", label: "Desserts", handle: "dessert" },
      { id: "drinks", label: "Drinks", handle: "drinks" },
    ],
  },
  testimonials: {
    subtitle: "People talk",
    heading: "Our Guestbook",
    bgImage: U.bg1,
    items: [
      {
        id: "t1",
        author: "Todd Stephen",
        image: U.testimonial[0],
        rating: 5,
        text: "La Belle Table is simply the best. Great Food, nice atmosphere and very reasonable prices. It just doesn't get any better.",
      },
      {
        id: "t2",
        author: "David Casper",
        image: U.testimonial[1],
        rating: 5,
        text: "We've been to La Belle Table many times over the years. We know what to expect: great food and awesome prices.",
      },
      {
        id: "t3",
        author: "John Arax",
        image: U.testimonial[2],
        rating: 5,
        text: "The reasonable prices, the great atmosphere are only topped by the delicious food. Keep up the great work.",
      },
      {
        id: "t4",
        author: "Anthony Kevin",
        image: U.testimonial[3],
        rating: 5,
        text: "La Belle Table is simply the best. Great Food, nice atmosphere and very reasonable prices. It just doesn't get any better.",
      },
    ],
  },
  blog: {
    subtitle: "Don't miss",
    heading: "Our News & Events",
    description:
      "Follow our latest news updates to know about our offers, recipes and events. One cannot think well, love well, sleep well, if one has not dined well.",
    posts: [
      {
        id: "b1",
        slug: "simple-recipes-for-spring",
        title: "Simple Recipes for Spring",
        excerpt:
          "My favorite form of cold-weather exercise is snow-shoeing, but by chance I haven't been able to go this year.",
        image: U.blog[0],
        category: "Side Dish",
        date: "Feb 22, 2024",
      },
      {
        id: "b2",
        slug: "dinner-party-for-a-chef",
        title: "Dinner Party for a Chef!",
        excerpt:
          "I began my career as a recipe tester for cookbooks, and I did that work for two years. I loved cookbooks and loved browsing for them.",
        image: U.blog[1],
        category: "Apple, Stuffing And Dressing",
        date: "Feb 22, 2024",
      },
      {
        id: "b3",
        slug: "cake-with-cream-cheese",
        title: "Cake with Cream Cheese",
        excerpt:
          "I've been baking this cake for many years, and have experimented with making it into cupcakes, as a layer cake.",
        image: U.blog[2],
        category: "Food, Cheese",
        date: "Feb 22, 2024",
      },
      {
        id: "b4",
        slug: "best-side-dishes-for-dinner",
        title: "The Best Side Dishes for Dinner",
        excerpt:
          "From green bean casserole to mashed potatoes and cranberry sauce, find standout Thanksgiving sides.",
        image: U.blog[3],
        category: "Green, Casserole",
        date: "Feb 22, 2024",
      },
      {
        id: "b5",
        slug: "cornbread-stuffing-apples",
        title: "Cornbread Stuffing Apples",
        excerpt:
          "Cook sausage for 5 to 7 minutes until browned. Add onions and celery and saute until softened.",
        image: U.blog[4],
        category: "Casserole",
        date: "Feb 22, 2024",
      },
      {
        id: "b6",
        slug: "best-ever-green-bean",
        title: "Best Ever Green Bean for Spring",
        excerpt:
          "Combine the onions, flour, panko and salt in a large mixing bowl and toss to combine. Coat a sheet pan with nonstick spray.",
        image: U.blog[5],
        category: "Casserole",
        date: "Feb 22, 2024",
      },
    ],
  },
  gallery: {
    items: [
      { id: "g1", src: U.gallery[0], alt: "Restaurant Ambiance", category: "all" },
      { id: "g2", src: U.gallery[1], alt: "Fine Dining Plating", category: "all" },
      { id: "g3", src: U.gallery[2], alt: "Chef's Special Dish", category: "all" },
      { id: "g4", src: U.gallery[3], alt: "Fresh Ingredients", category: "all" },
      { id: "g5", src: U.gallery[4], alt: "Seasonal Cuisine", category: "all" },
      { id: "g6", src: U.gallery[5], alt: "Artisan Desserts", category: "all" },
      { id: "g7", src: U.gallery[6], alt: "Gourmet Appetizers", category: "all" },
      { id: "g8", src: U.gallery[7], alt: "Garden Fresh Salads", category: "all" },
      { id: "g9", src: U.gallery[8], alt: "Signature Cocktails", category: "all" },
      { id: "g10", src: U.gallery[9], alt: "Chef at Work", category: "all" },
    ],
  },
  chefs: {
    subtitle: "our team",
    heading: "Meet Our Chefs",
    items: [
      {
        id: "c1",
        name: "John Miller",
        role: "Head Chef",
        image: U.team[0],
        bio: "With over 20 years of culinary experience, John brings creativity and passion to every dish.",
      },
      {
        id: "c2",
        name: "Sarah Davis",
        role: "Pastry Chef",
        image: U.team[1],
        bio: "Sarah's desserts are the perfect finishing touch to any dining experience.",
      },
      {
        id: "c3",
        name: "Marco Rossi",
        role: "Sous Chef",
        image: U.team[2],
        bio: "Marco's Italian roots inspire his unique take on Mediterranean cuisine.",
      },
      {
        id: "c4",
        name: "Amina Hassan",
        role: "Chef de Partie",
        image: U.team[3],
        bio: "Amina specializes in fresh seafood and locally sourced seasonal menus.",
      },
    ],
  },
  reservation: {
    heading: "Make A Reservation",
    description:
      "You can book a table online easily in just a couple of minutes. We take reservations for lunch and dinner — just check the availability and book now!",
  },
  contact: {
    address: "22 Alnahas Building, 2 AlBahr St, Cairo",
    phone: "+20 106 537 0701",
    email: "info@labelletable.com",
    hours: [
      { day: "Monday – Friday", hours: "09:00 – 24:00" },
      { day: "Saturday", hours: "08:00 – 03:00" },
      { day: "Sunday", hours: "Day off" },
    ],
    facebook: "#",
    twitter: "#",
    instagram: "#",
    pinterest: "#",
  },
  footer: {
    copyright: "© 2024 La Belle Table. All rights reserved.",
    newsletterPlaceholder: "Subscribe to Our Newsletter",
  },
  navigation: [
    { label: "Home", href: "/templates/restaurant-1/preview" },
    { label: "About", href: "/templates/restaurant-1/preview/about" },
    { label: "Menu", href: "/templates/restaurant-1/preview/menu" },
    { label: "Gallery", href: "/templates/restaurant-1/preview/gallery" },
    { label: "Chefs", href: "/templates/restaurant-1/preview/chefs" },
    { label: "Blog", href: "/templates/restaurant-1/preview/blog" },
    { label: "Contact", href: "/templates/restaurant-1/preview/contact" },
  ],
  menuItems: [
    // Lunch
    menuItem("m1", "lunch", "Chesapeake Crab Dip", "$24.95", "Creamy crab dip baked with artichoke and cheddar cheese.", U.menu[0]),
    menuItem("m2", "lunch", "Crispy Shrimp Grits", "$36.95", "Beer battered jumbo shrimp with crispy cheddar grit polenta.", U.menu[1]),
    menuItem("m3", "lunch", "Thai Chicken Quesadilla", "$21.95", "Grilled chicken with cilantro, red cabbage, mozzarella and sweet thai chili.", U.menu[2]),
    menuItem("m4", "lunch", "Caesar Salad", "$14.95", "Crisp romaine lettuce, croutons, parmesan with house caesar dressing.", U.menu[3]),
    menuItem("m5", "lunch", "Grilled Salmon", "$32.95", "Atlantic salmon grilled to perfection, served with seasonal vegetables.", U.menu[4]),
    menuItem("m6", "lunch", "Mushroom Risotto", "$22.95", "Creamy arborio rice with wild mushrooms, truffle oil and parmesan.", U.menu[5]),
    // Dinner
    menuItem("m7", "dinner", "Grilled Ribeye Steak", "$54.95", "16 oz USDA prime ribeye, grilled to your preference with herb butter.", U.menu[6]),
    menuItem("m8", "dinner", "Rack of Lamb", "$48.95", "French rack of lamb with rosemary jus and roasted root vegetables.", U.menu[7]),
    menuItem("m9", "dinner", "Lobster Bisque", "$18.95", "Rich and creamy lobster bisque with cognac cream.", U.menu[8]),
    menuItem("m10", "dinner", "Duck Confit", "$42.95", "Slow cooked duck leg with cherry reduction and wilted greens.", U.menu[9]),
    menuItem("m11", "dinner", "Pan Seared Sea Bass", "$38.95", "Chilean sea bass with lemon caper butter and asparagus.", U.menu[10]),
    menuItem("m12", "dinner", "Beef Tenderloin", "$56.95", "6 oz center cut tenderloin with truffle demi-glace.", U.menu[11]),
    // Desserts
    menuItem("d1", "dessert", "Crème Brûlée", "$12.95", "Classic vanilla custard with caramelized sugar crust.", U.menu[12]),
    menuItem("d2", "dessert", "Chocolate Lava Cake", "$13.95", "Warm chocolate cake with molten center, served with vanilla ice cream.", U.menu[13]),
    menuItem("d3", "dessert", "Tiramisu", "$11.95", "Traditional Italian dessert with espresso soaked ladyfingers.", U.menu[14]),
    menuItem("d4", "dessert", "Cheesecake", "$10.95", "New York style cheesecake with mixed berry compote.", U.menu[15]),
    // Drinks
    menuItem("dr1", "drinks", "House Red Wine", "$9.95", "Carefully selected house red wine from premium vineyards.", U.menu[16]),
    menuItem("dr2", "drinks", "Craft Cocktails", "$14.95", "Seasonal craft cocktails made with premium spirits.", U.menu[17]),
    menuItem("dr3", "drinks", "Fresh Lemonade", "$6.95", "House-made lemonade with mint and honey.", U.menu[0]),
    menuItem("dr4", "drinks", "Espresso", "$4.95", "Rich single-origin espresso from our in-house roastery.", U.menu[1]),
  ],
};
