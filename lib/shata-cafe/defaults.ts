import type { SiteConfig } from "./types";

const BASE = "/templates/shata-cafe";

export const SHATA_CAFE_DEFAULTS: SiteConfig = {
  slug: "shata-cafe",
  name: "Avenue Café",
  tagline: "Good Food, Good Mood",
  description:
    "A warm neighborhood café serving handcrafted breakfasts, artisan coffee, seasonal cocktails, and fresh comfort food in an inviting atmosphere.",
  locale: "en",

  logo: {
    alt: "Avenue Café",
    text: "Avenue Café",
  },

  theme: {
    primary:    "#2c1810",
    primaryFg:  "#ffffff",
    accent:     "#c8933f",
    background: "#faf8f5",
    foreground: "#1a1008",
    muted:      "#7a6552",
    surface:    "#f5efe6",
    border:     "#e8ddd0",
    radius:     "md",
  },

  contact: {
    email:             "hello@avenuecafe.com",
    phone:             "+1 (555) 234-5678",
    reservationPhone:  "+1 (555) 234-5679",
    address:           "42 Bloom Street, Downtown District",
    hours:             "Mon–Fri 7am–10pm · Sat–Sun 8am–11pm",
  },

  social: {
    instagram: "#",
    facebook:  "#",
    tripadvisor: "#",
  },

  navigation: [
    { label: "Menu",        href: "#menu" },
    { label: "About",       href: "#about" },
    { label: "Our Team",    href: "#team" },
    { label: "Gallery",     href: "#gallery" },
    { label: "Contact",     href: "#reservation" },
  ],

  footerLinks: [
    {
      title: "Explore",
      items: [
        { label: "Our Menu",    href: "#menu" },
        { label: "About Us",    href: "#about" },
        { label: "Meet the Team", href: "#team" },
        { label: "Photo Gallery", href: "#gallery" },
      ],
    },
    {
      title: "Visit",
      items: [
        { label: "Reservations",    href: "#reservation" },
        { label: "Private Dining",  href: "#reservation" },
        { label: "Catering",        href: "#reservation" },
        { label: "Gift Cards",      href: "#reservation" },
      ],
    },
    {
      title: "Info",
      items: [
        { label: "Allergen Info",   href: "#" },
        { label: "Nutrition",       href: "#" },
        { label: "Press",           href: "#" },
        { label: "Careers",         href: "#" },
      ],
    },
  ],

  homeSectionOrder: [
    { id: "hero",            enabled: true },
    { id: "menu-categories", enabled: true },
    { id: "about",           enabled: true },
    { id: "featured-menu",   enabled: true },
    { id: "stats",           enabled: true },
    { id: "gallery",         enabled: true },
    { id: "team",            enabled: true },
    { id: "testimonials",    enabled: true },
    { id: "reservation",     enabled: true },
    { id: "newsletter",      enabled: true },
  ],

  /* ------------------------------------------------------------------ */
  /* Sections                                                            */
  /* ------------------------------------------------------------------ */

  sections: {
    announcement: {
      enabled: true,
      text: "Now taking reservations for weekend brunch — book your table today.",
    },

    hero: {
      slides: [
        {
          heading: "Where Every\nMorning Begins\nBeautifully",
          subheading:
            "Handcrafted breakfasts, artisan coffee, and seasonal specials made with love — served from 7am every day.",
          image: `${BASE}/bg/hero_bg.jpg`,
          cta:          { label: "Explore Menu",    href: "#menu" },
          ctaSecondary: { label: "Book a Table",    href: "#reservation" },
        },
        {
          heading: "Chef-Crafted\nFlavours You'll\nCrave All Day",
          subheading:
            "From fluffy buttermilk pancakes to our legendary Avenue Club — every dish is made fresh to order.",
          image: `${BASE}/hero/hero_2.jpg`,
          cta:          { label: "See Today's Menu", href: "#menu" },
          ctaSecondary: { label: "Our Story",        href: "#about" },
        },
        {
          heading: "An Evening\nWorth Savouring",
          subheading:
            "Craft cocktails, live jazz on weekends, and a menu that keeps you coming back. Make a night of it.",
          image: `${BASE}/hero/hero_3.jpg`,
          cta:          { label: "Reserve a Table",  href: "#reservation" },
          ctaSecondary: { label: "View Gallery",     href: "#gallery" },
        },
      ],
    },

    about: {
      eyebrow: "Our Story",
      title: "More Than a Café — A Neighbourhood Ritual",
      body:
        "Avenue Café was born from a simple belief: that great food and genuine hospitality can transform an ordinary day into something memorable. Since opening our doors, we've been the morning ritual for local regulars, the weekend retreat for families, and the quiet corner for those who need a moment to breathe. Everything on our menu is made from scratch using seasonal, locally-sourced ingredients.",
      image:          `${BASE}/about/about_1.jpg`,
      imageSecondary: `${BASE}/about/about_2.jpg`,
      checkpoints: [
        "Locally sourced, seasonal ingredients",
        "House-baked bread and pastries every morning",
        "Specialty single-origin coffees and fresh juices",
        "Private dining and catering available",
      ],
      cta: { label: "Read Our Full Story", href: "#about" },
    },

    menuCategories: {
      eyebrow: "What We Serve",
      title:   "Something for Every Craving",
      subtitle: "Browse our full menu — from morning breakfasts to evening cocktails.",
    },

    featuredMenu: {
      eyebrow: "Chef's Favourites",
      title:   "Dishes Worth Coming Back For",
      subtitle: "Our most-loved plates, handpicked by the kitchen.",
    },

    stats: {
      backgroundImage: `${BASE}/bg/menu_bg.jpg`,
      items: [
        { value: "8+",   label: "Years Open" },
        { value: "120+", label: "Menu Items" },
        { value: "500+", label: "Happy Guests Daily" },
        { value: "4.9",  label: "Average Rating" },
      ],
    },

    gallery: {
      eyebrow: "Inside Avenue",
      title:   "A Space Made for Good Moments",
      subtitle: "Warm light, natural textures, and food that looks as good as it tastes.",
      images: [
        { src: `${BASE}/gallery/interior_1.jpg`, alt: "Café interior" },
        { src: `${BASE}/gallery/food_1.jpg`,     alt: "Signature dish" },
        { src: `${BASE}/gallery/ambience_1.jpg`, alt: "Café ambience" },
        { src: `${BASE}/gallery/interior_2.jpg`, alt: "Dining area" },
        { src: `${BASE}/gallery/food_2.jpg`,     alt: "Brunch plate" },
        { src: `${BASE}/gallery/ambience_2.jpg`, alt: "Evening atmosphere" },
      ],
    },

    team: {
      eyebrow: "Meet the Kitchen",
      title:   "The Talent Behind the Taste",
      subtitle: "Our chefs bring decades of combined experience and a relentless passion for craft.",
    },

    testimonials: {
      eyebrow: "Guest Stories",
      title:   "What Our Regulars Say",
      items: [
        {
          id:     "t1",
          author: "Sophie L.",
          role:   "Weekend Brunch Regular",
          avatar: `${BASE}/team/avatar_1.png`,
          body:   "The avocado toast and cold brew here are genuinely the best in the city. I've been coming every Saturday for two years — it never disappoints.",
          rating: 5,
        },
        {
          id:     "t2",
          author: "Marcus R.",
          role:   "Business Lunch Guest",
          avatar: `${BASE}/team/avatar_2.png`,
          body:   "Perfect spot for a working lunch. Quiet enough to think, great enough food to impress a client. The penne alfredo is absolutely outstanding.",
          rating: 5,
        },
        {
          id:     "t3",
          author: "Layla M.",
          role:   "Private Event Host",
          avatar: `${BASE}/team/avatar_3.png`,
          body:   "We hosted a birthday dinner in the private dining room and the team went above and beyond. Excellent food, warm atmosphere, truly memorable.",
          rating: 5,
        },
        {
          id:     "t4",
          author: "James K.",
          role:   "Morning Commuter",
          avatar: `${BASE}/team/avatar_4.png`,
          body:   "I stop here every morning before work. The baristas remember my order, the pastries are always fresh, and it sets the tone for the whole day.",
          rating: 5,
        },
        {
          id:     "t5",
          author: "Nora T.",
          role:   "Food Blogger",
          avatar: `${BASE}/team/avatar_5.png`,
          body:   "I've reviewed over 200 cafés and Avenue consistently ranks in my top five. The attention to detail in every dish is evident — this is a kitchen that cares.",
          rating: 5,
        },
      ],
    },

    reservation: {
      eyebrow: "Book a Table",
      title:   "Reserve Your Spot",
      subtitle:
        "Walk-ins are always welcome, but reservations are recommended on weekends. Call us or fill in the form below.",
      backgroundImage: `${BASE}/bg/contact_bg.jpg`,
      hours: [
        { day: "Monday – Friday", time: "7:00 am – 10:00 pm" },
        { day: "Saturday",        time: "8:00 am – 11:00 pm" },
        { day: "Sunday",          time: "8:00 am – 10:00 pm" },
        { day: "Public Holidays", time: "9:00 am – 9:00 pm" },
      ],
    },

    newsletter: {
      title:       "Stay in the Loop",
      subtitle:    "Seasonal menus, special events, and exclusive offers — straight to your inbox.",
      placeholder: "Enter your email address",
    },
  },

  /* ------------------------------------------------------------------ */
  /* Menu Categories                                                     */
  /* ------------------------------------------------------------------ */

  menuCategories: [
    { id: "breakfasts", name: "Breakfasts",  image: `${BASE}/menu/breakfasts.jpg`,  description: "Morning classics & egg dishes" },
    { id: "starters",   name: "Starters",    image: `${BASE}/menu/starters.jpg`,    description: "Sharing plates & small bites" },
    { id: "mains",      name: "Mains",       image: `${BASE}/menu/penne-alfredo.jpg`, description: "Hearty mains & pasta" },
    { id: "desserts",   name: "Desserts",    image: `${BASE}/menu/desserts.jpg`,    description: "Sweet endings & pastries" },
    { id: "beverages",  name: "Beverages",   image: `${BASE}/menu/beverages.jpg`,   description: "Coffee, juices & cocktails" },
  ],

  /* ------------------------------------------------------------------ */
  /* Menu Items                                                          */
  /* ------------------------------------------------------------------ */

  menuItems: [
    /* ---- Breakfasts ---- */
    {
      id: "m1", handle: "classic-breakfast", name: "Classic Breakfast", category: "breakfasts",
      price: "$14", featured: true, active: true, badge: "popular",
      shortDescription: "Two eggs, bacon, grilled tomato & hash browns",
      images: [`${BASE}/menu/classic-breakfast.jpg`],
      description: "Two eggs any style, bacon, grilled tomato, hash browns, and toast.",
    },
    {
      id: "m2", handle: "avocado-toast", name: "Avocado Toast", category: "breakfasts",
      price: "$13", featured: true, active: true, badge: "chef's pick",
      shortDescription: "Smashed avo on sourdough with poached egg",
      images: [`${BASE}/menu/avocado-toast.jpg`],
      description: "Smashed avocado on house sourdough with poached egg, chili flakes, and lemon.",
    },
    {
      id: "m3", handle: "buttermilk-pancakes", name: "Buttermilk Pancakes", category: "breakfasts",
      price: "$12", featured: true, active: true,
      shortDescription: "Fluffy stack with maple syrup & berries",
      images: [`${BASE}/menu/pancakes.jpg`],
      description: "Fluffy stack of three with maple syrup, fresh berries, and whipped cream.",
    },
    {
      id: "m4", handle: "french-toast", name: "French Toast", category: "breakfasts",
      price: "$13", featured: false, active: true,
      shortDescription: "Brioche with caramelised banana & Nutella",
      images: [`${BASE}/menu/french-toast.jpg`],
      description: "Brioche French toast with caramelised banana, Nutella, and vanilla cream.",
    },
    {
      id: "m5", handle: "english-breakfast", name: "English Breakfast", category: "breakfasts",
      price: "$16", featured: false, active: true,
      shortDescription: "Full English with all the classics",
      images: [`${BASE}/menu/english-breakfast.jpg`],
      description: "Full English with eggs, sausage, beans, mushrooms, black pudding, and toast.",
    },
    {
      id: "m6", handle: "huevos-rancheros", name: "Huevos Rancheros", category: "breakfasts",
      price: "$15", featured: false, active: true,
      shortDescription: "Corn tortillas, eggs, chipotle salsa & avocado",
      images: [`${BASE}/menu/huevos-rancheros.jpg`],
      description: "Corn tortillas, fried eggs, chipotle salsa, avocado, and cotija cheese.",
    },
    {
      id: "m7", handle: "romeo-and-juliet", name: "Romeo & Juliet", category: "breakfasts",
      price: "$12", featured: false, active: true,
      shortDescription: "Guava jam & cream cheese on warm brioche",
      images: [`${BASE}/menu/romeo-juliet.jpg`],
      description: "Guava jam and cream cheese on warm brioche — a Brazilian-inspired classic.",
    },

    /* ---- Starters ---- */
    {
      id: "s1", handle: "crispy-chicken-wings", name: "Crispy Chicken Wings", category: "starters",
      price: "$14", featured: true, active: true, badge: "popular",
      shortDescription: "Buffalo or honey garlic with blue cheese dip",
      images: [`${BASE}/menu/chicken-wings.jpg`],
      description: "Golden wings tossed in house Buffalo or honey garlic sauce with blue cheese dip.",
    },
    {
      id: "s2", handle: "toast-salmon", name: "Toast Salmon", category: "starters",
      price: "$16", featured: true, active: true, badge: "chef's pick",
      shortDescription: "Smoked salmon on rye with cream cheese & capers",
      images: [`${BASE}/menu/toast-salmon.jpg`],
      description: "Smoked salmon on rye with cream cheese, capers, red onion, and dill.",
    },
    {
      id: "s3", handle: "pate-mushrooms", name: "Pâté & Mushrooms", category: "starters",
      price: "$13", featured: false, active: true,
      shortDescription: "Chicken liver pâté with wild mushrooms & crostini",
      images: [`${BASE}/menu/pate-mushrooms.jpg`],
      description: "Chicken liver pâté with sautéed wild mushrooms, cornichons, and crostini.",
    },
    {
      id: "s4", handle: "shrimps-in-butter", name: "Shrimps in Butter", category: "starters",
      price: "$17", featured: true, active: true,
      shortDescription: "Tiger shrimps in garlic herb butter",
      images: [`${BASE}/menu/shrimps-butter.jpg`],
      description: "Pan-fried tiger shrimps in garlic herb butter with a squeeze of lemon.",
    },
    {
      id: "s5", handle: "cheese-selection", name: "Cheese Selection", category: "starters",
      price: "$15", featured: false, active: true,
      shortDescription: "Cheddar, brie & gorgonzola with fig jam",
      images: [`${BASE}/menu/cheese-slices.jpg`],
      description: "Curated board of aged cheddar, brie, and gorgonzola with fig jam and crackers.",
    },
    {
      id: "s6", handle: "cold-cuts-board", name: "Cold Cuts Board", category: "starters",
      price: "$16", featured: false, active: true,
      shortDescription: "Prosciutto, salami & mortadella with pickles",
      images: [`${BASE}/menu/cold-cuts.jpg`],
      description: "Prosciutto, salami, and mortadella with pickled vegetables and grilled pita.",
    },
    {
      id: "s7", handle: "assorted-veg-platter", name: "Assorted Veg Platter", category: "starters",
      price: "$11", featured: false, active: true,
      shortDescription: "Crudités with hummus, tzatziki & pepper dip",
      images: [`${BASE}/menu/assorted-veg.jpg`],
      description: "Seasonal crudités with hummus, tzatziki, and roasted red pepper dip.",
    },
    {
      id: "s8", handle: "warm-pita-bread", name: "Warm Pita Bread", category: "starters",
      price: "$6", featured: false, active: true,
      shortDescription: "Freshly baked with za'atar oil & sumac labneh",
      images: [`${BASE}/menu/pita-bread.jpg`],
      description: "Freshly baked pita served with za'atar oil and sumac labneh.",
    },

    /* ---- Mains ---- */
    {
      id: "n1", handle: "avenue-club-sandwich", name: "Avenue Club Sandwich", category: "mains",
      price: "$16", featured: true, active: true, badge: "popular",
      shortDescription: "Triple-decker with chicken, bacon & egg",
      images: [`${BASE}/menu/avenue-club.jpg`],
      description: "Triple-decker with roast chicken, bacon, egg, lettuce, tomato, and mayo on toasted sourdough.",
    },
    {
      id: "n2", handle: "penne-alfredo", name: "Penne Alfredo", category: "mains",
      price: "$17", featured: true, active: true, badge: "chef's pick",
      shortDescription: "Rich Parmesan cream sauce with grilled chicken",
      images: [`${BASE}/menu/penne-alfredo.jpg`],
      description: "Penne in a rich Parmesan cream sauce with grilled chicken, garlic, and fresh parsley.",
    },

    /* ---- Desserts ---- */
    {
      id: "d1", handle: "ny-cheesecake", name: "New York Cheesecake", category: "desserts",
      price: "$9", featured: true, active: true, badge: "popular",
      shortDescription: "Baked cheesecake with berry compote",
      images: [`${BASE}/menu/cheesecake.jpg`],
      description: "Classic baked cheesecake with berry compote and crushed graham cracker base.",
    },
    {
      id: "d2", handle: "brownie-sundae", name: "Brownie Sundae", category: "desserts",
      price: "$10", featured: true, active: true, badge: "chef's pick",
      shortDescription: "Warm brownie with vanilla ice cream & hot fudge",
      images: [`${BASE}/menu/brownie-sundae.jpg`],
      description: "Warm fudge brownie with vanilla ice cream, hot fudge, and whipped cream.",
    },
    {
      id: "d3", handle: "fruit-parfait", name: "Fruit Parfait", category: "desserts",
      price: "$8", featured: false, active: true,
      shortDescription: "Greek yoghurt, granola, berries & honey",
      images: [`${BASE}/menu/fruit-parfait.jpg`],
      description: "Layered Greek yoghurt, granola, seasonal berries, and honey.",
    },
    {
      id: "d4", handle: "nutella-brownie", name: "Nutella Brownie", category: "desserts",
      price: "$8", featured: false, active: true,
      shortDescription: "Chocolate brownie swirled with Nutella",
      images: [`${BASE}/menu/nutella-choc.jpg`],
      description: "Dense chocolate brownie swirled with Nutella and toasted hazelnuts.",
    },
    {
      id: "d5", handle: "almond-biscotti", name: "Almond Biscotti", category: "desserts",
      price: "$5", featured: false, active: true,
      shortDescription: "House-baked biscotti perfect with espresso",
      images: [`${BASE}/menu/biscotti.jpg`],
      description: "House-baked biscotti with toasted almonds, perfect with espresso.",
    },

    /* ---- Beverages ---- */
    {
      id: "b1", handle: "blueberry-mojito", name: "Blueberry Mojito", category: "beverages",
      price: "$11", featured: true, active: true, badge: "new",
      shortDescription: "Blueberries, mint, lime & soda — house-made",
      images: [`${BASE}/menu/blueberry-mojito.jpg`],
      description: "Fresh blueberries, mint, lime, and soda water — refreshing and house-made.",
    },
    {
      id: "b2", handle: "spicy-margarita", name: "Spicy Margarita", category: "beverages",
      price: "$14", featured: true, active: true, badge: "chef's pick",
      shortDescription: "Tequila, jalapeño & smoked salt rim",
      images: [`${BASE}/menu/spicy-rita.jpg`],
      description: "Tequila, fresh lime, agave, and jalapeño with a smoked salt rim.",
    },
    {
      id: "b3", handle: "very-berry-smoothie", name: "Very Berry Smoothie", category: "beverages",
      price: "$9", featured: false, active: true,
      shortDescription: "Mixed berries, banana, yoghurt & orange juice",
      images: [`${BASE}/menu/very-berry.jpg`],
      description: "Mixed berries, banana, Greek yoghurt, honey, and fresh orange juice.",
    },
    {
      id: "b4", handle: "strawberry-lychee-cooler", name: "Strawberry Lychee Cooler", category: "beverages",
      price: "$10", featured: false, active: true,
      shortDescription: "Strawberry, lychee, rose water & sparkling water",
      images: [`${BASE}/menu/strawberry-lychee.jpg`],
      description: "Fresh strawberries, lychee syrup, rose water, and sparkling water.",
    },
  ],

  /* ------------------------------------------------------------------ */
  /* Team                                                                */
  /* ------------------------------------------------------------------ */

  team: [
    {
      id: "c1", name: "Chef Marco Deluca", role: "Executive Chef",
      image: `${BASE}/team/chef_1.jpg`, featured: true,
      bio: "With 18 years across Michelin-star kitchens in Milan and New York, Marco brings old-world technique to every dish.",
    },
    {
      id: "c2", name: "Chef Aya Hassan", role: "Pastry Chef",
      image: `${BASE}/team/chef_2.jpg`, featured: true,
      bio: "Aya trained in Paris and specialises in artisan pastries, seasonal desserts, and our beloved house-baked breads.",
    },
    {
      id: "c3", name: "Chef Liam Torres", role: "Head of Brunch",
      image: `${BASE}/team/chef_3.jpg`, featured: true,
      bio: "Liam's weekend brunch menu has been featured in three city food guides. His pancakes have a cult following.",
    },
    {
      id: "c4", name: "Chef Priya Nair", role: "Beverage Director",
      image: `${BASE}/team/chef_4.jpg`, featured: true,
      bio: "Priya crafts our seasonal cocktail and coffee menus, sourcing single-origin beans and small-batch spirits.",
    },
  ],

  legal: {
    privacy: "/legal/privacy",
    terms:   "/legal/terms",
  },
};
