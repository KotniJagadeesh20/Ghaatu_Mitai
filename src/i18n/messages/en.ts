/* =========================================================
   English UI dictionary - the source of truth.

   `Messages` (below) is inferred from this object, and every
   other language is typed as `Messages`, so a missing, extra
   or misspelt key in te.ts is a compile error.

   Rules of thumb:
   - Group by feature/component, not by page, so shared
     components (Footer, Title...) have one home.
   - Anything with a number in it is a function, never string
     concatenation in JSX - word order differs between
     languages ("3 products" vs "3 ఉత్పత్తులు").
   - Lookup tables are typed Record<Key, string> against the
     canonical keys in src/data, so adding a category or form
     option forces a translation.
   ========================================================= */

import type { Category } from '../../data/cats';
import type { NavKey } from '../../data/nav';
import type { EnquiryKind } from '../../data/enquiries';
import type { EventType, QuantityOption } from '../../data/bulk';
import type { BusinessType, MonthlyVolume } from '../../data/wholesale';
import type { FormErrorCode } from '../../lib/formErrors';
import type { SortKey } from '../../lib/shopFilters';
import type { ProductBadge } from '../../types/product';

const categories: Record<Category, string> = {
  Sweets: 'Sweets',
  Savouries: 'Savouries',
  Mixtures: 'Mixtures',
  Chips: 'Chips',
  Combos: 'Combos',
  'Gift Boxes': 'Gift Boxes',
};

const nav: Record<NavKey, string> = {
  home: 'Home',
  shop: 'Shop',
  about: 'About',
  bulkOrders: 'Bulk Orders',
  wholesale: 'Wholesale',
  contact: 'Contact',
};

const enquiryKinds: Record<EnquiryKind, string> = {
  'Order summary': 'Order summary',
  'General enquiry': 'General enquiry',
  'Retail partnership': 'Retail partnership',
  'Bulk order': 'Bulk order',
  'WhatsApp bulk order': 'WhatsApp bulk order',
  'Track Your Order': 'Track Your Order',
  'Shipping & Delivery': 'Shipping & Delivery',
  'Returns & Refunds': 'Returns & Refunds',
  FAQs: 'FAQs',
  'Terms & Conditions': 'Terms & Conditions',
  'Privacy Policy': 'Privacy Policy',
};

const eventTypes: Record<EventType, string> = {
  Wedding: 'Wedding',
  Engagement: 'Engagement',
  'Family Function': 'Family Function',
  Festival: 'Festival',
  'Corporate Event': 'Corporate Event',
  'Return Gifts': 'Return Gifts',
  Other: 'Other',
};

const quantities: Record<QuantityOption, string> = {
  'Up to 5 kg': 'Up to 5 kg',
  '5 – 10 kg': '5 – 10 kg',
  '10 – 25 kg': '10 – 25 kg',
  '25 – 50 kg': '25 – 50 kg',
  '50 kg or more': '50 kg or more',
  'Not sure yet': 'Not sure yet',
};

const businessTypes: Record<BusinessType, string> = {
  Supermarket: 'Supermarket',
  'Retail Store': 'Retail Store',
  Distributor: 'Distributor',
  'Sweet Shop / Bakery': 'Sweet Shop / Bakery',
  'Online Seller': 'Online Seller',
  Other: 'Other',
};

const volumes: Record<MonthlyVolume, string> = {
  'Under 50 kg': 'Under 50 kg',
  '50 – 200 kg': '50 – 200 kg',
  '200 – 500 kg': '200 – 500 kg',
  '500 kg or more': '500 kg or more',
  'Not sure yet': 'Not sure yet',
};

const sort: Record<SortKey, string> = {
  featured: 'Featured',
  'price-asc': 'Price: Low to High',
  'price-desc': 'Price: High to Low',
  rating: 'Top Rated',
  reviews: 'Most Reviewed',
};

const badges: Record<ProductBadge, string> = {
  'Best Seller': 'Best Seller',
  New: 'New',
};

const formErrors: Record<FormErrorCode, string> = {
  nameRequired: 'Please enter your name.',
  phoneInvalid: 'Enter a valid 10-digit mobile number.',
  emailInvalid: 'This email doesn’t look right.',
  emailRequired: 'Enter a valid email address.',
  eventTypeRequired: 'Choose an event type.',
  dateRequired: 'Pick the expected date.',
  datePast: 'The date can’t be in the past.',
  quantityRequired: 'Choose an approximate quantity.',
  businessNameRequired: 'Enter your business name.',
  businessTypeRequired: 'Choose a business type.',
  cityRequired: 'Enter your city.',
};

export const en = {
  meta: {
    title: 'Ghaatu Mitai | Traditional Sweets & Snacks',
  },

  language: {
    /** Accessible name of the switcher group. */
    label: 'Language',
    switchTo: (name: string) => `Switch to ${name}`,
  },

  categories,
  nav,
  badges,

  announcement: {
    tagline: ['Traditional Sweets & Snacks', 'Made with Love', 'Delivered with Joy'],
    shipping: 'Free shipping on orders above ₹999',
  },

  header: {
    homeLink: 'Ghaatu Mitai home',
    logoAlt: 'Ghaatu Mitai Sweets and Snacks',
    search: 'Search products',
    favourites: 'Shop favourites',
    openBag: (count: number) => `Open shopping bag, ${count} ${count === 1 ? 'item' : 'items'}`,
    openNav: 'Open navigation',
  },

  mobileNav: {
    title: 'Ghaatu Mitai',
    description: 'Traditional flavours, modern moments.',
  },

  footer: {
    logoAlt: 'Ghaatu Mitai Sweets & Snacks',
    tagline: ['More than sweets & snacks.', 'It’s a part of home. ♡'],
    quickLinks: 'Quick Links',
    support: 'Customer Support',
    getInTouch: 'Get in Touch',
    location: 'Hyderabad, India',
    talkToUs: 'Talk to us',
    newsletterTitle: 'Subscribe to Our Newsletter',
    newsletterText: ['Get updates on new products,', 'special offers and more.'],
    newsletterEmailLabel: 'Email for newsletter',
    newsletterPlaceholder: 'Enter your email',
    subscribe: 'Subscribe',
    newsletterToast:
      'Newsletter signup will be available at launch. Your email has not been submitted.',
    copyright: (year: number) => `© ${year} Ghaatu Mitai. All rights reserved.`,
    madeWith: 'Made with love for traditional flavours.',
  },

  closing: {
    eyebrow: 'Traditional flavours. Brighter tomorrows.',
    title: ['Let’s bring good food', 'to more homes.'],
    text: ['For your family, a celebration, or your business.', 'Make every moment a little sweeter.'],
    shopNow: 'Shop now',
    talkToUs: 'Talk to us',
    imageAlt: 'A generous bowl of Ghaatu Mixture',
  },

  toast: {
    /** Screen-reader name of the notification area (sonner). */
    region: 'Notifications',
    added: (name: string) => `${name} added to your bag`,
  },

  catalogue: {
    emptyTitle: 'No treats found',
    emptyText: 'Try another category or search.',
    showAll: 'Show all products',
  },

  product: {
    save: (name: string) => `Save ${name}`,
    packSize: (name: string) => `Pack size for ${name}`,
    addToCart: 'Add to Cart',
    outOfStock: 'Out of stock',
    rating: (rating: number, reviews: number) =>
      `${rating} out of 5 stars, ${reviews} reviews`,
  },

  cart: {
    title: (count: number) => `Your bag (${count})`,
    description: 'A little happiness to take home.',
    decrease: 'Decrease quantity',
    increase: 'Increase quantity',
    remove: (name: string) => `Remove ${name}`,
    subtotal: 'Subtotal',
    freeShipping: 'Your bag qualifies for free shipping.',
    addMore: (amount: number) => `Add ₹${amount} more for free shipping.`,
    review: 'Review order',
    previewNote: 'Preview only. Payments and order placement are not yet available.',
    emptyTitle: 'Your bag is waiting for a little joy.',
    explore: 'Explore the shop',
  },

  search: {
    title: 'Find your favourites',
    description: 'Search sweets, snacks and gift boxes.',
    placeholder: 'Try mixture or laddu',
  },

  enquiry: {
    kinds: enquiryKinds,
    orderDescription: 'Review your selection. No order is placed and no payment is collected.',
    formDescription:
      'Tell us what you need. Download your enquiry to keep or share with the business when contact details are available.',
    total: (total: number) => `Total: ₹${total}`,
    comingSoon: 'Online ordering is coming soon.',
    orderOnWhatsApp: 'Order on WhatsApp',
    name: 'Your name',
    email: 'Email address',
    details: 'What do you have in mind?',
    detailsPlaceholder: 'Occasion, date, quantities, or your store details',
    prepare: 'Prepare enquiry',
    ready: 'Your enquiry is ready. It has not been sent.',
    download: 'Download enquiry',
  },

  home: {
    heroAlt: 'A warm spread of Telugu mixture, jantikalu, laddu and chai',
    eyebrow: ['Traditional tastes', 'A happier tomorrow.'],
    brandSr: 'Ghaatu Mitai — Sweets & Snacks',
    handwritingAlt: 'Ghaatu. Teepi. Tinaka Tappade!',
    intro: ['Authentic Telugu sweets & snacks,', 'made with the warmth of home.'],
    shopCta: 'Shop sweets & snacks',
    bulkCta: 'Bulk / wedding orders',
    categoriesEyebrow: 'Explore our',
    categoriesTitle: 'Categories',
    categoriesSub: 'Something special for every craving',
    quote: '“Traditional flavours, modern moments.”',
    quoteSmall: 'Sweets · Snacks · Happier people',
    bestNoteAlt: 'Traditional tastes. Always a hit!',
    bestEyebrow: 'Our most loved',
    bestTitle: 'Best Sellers',
    bestSub: 'The ones that disappear first.',
    viewAll: 'View all products',
    occasionsTitle: 'Made for Every Occasion',
    occasionsSub: 'Traditional flavours for life’s special moments',
    communityEyebrow: 'Follow our journey',
    communityTitle: 'Moments from Our Community',
    communitySub: 'Tag us @ghaatumitai and be a part of our story.',
  },

  benefits: {
    recipes: { title: 'Traditional Recipes', desc: 'Authentic Telugu flavours' },
    quality: { title: 'Quality Ingredients', desc: 'Pure & natural' },
    delivery: { title: 'Pan India Delivery', desc: 'Freshly packed with care' },
    bulk: { title: 'Bulk & Custom Orders', desc: 'For every occasion' },
  },

  story: {
    imageAlt: 'Ghaatu Mitai traditional sweet cart under a leafy tree',
    memoriesAlt:
      'Same nostalgia, bigger happiness. Memories of the original bandi and sweets still made with love.',
    eyebrow: 'Our story',
    title: ['From a little Bandi', 'to your home.'],
    paragraphs: [
      'Ghaatu Mitai is inspired by the flavours, traditions and evening conversations that make Telugu homes special.',
      'What started as a small bandi with a big love for good food brings those familiar tastes to your table — one sweet, one savoury, one memory at a time.',
      'Traditional recipes, quality ingredients and a whole lot of care. Because good food brings people closer.',
    ],
    journey: 'Our journey',
  },

  about: {
    quote: '“More than sweets & snacks. It’s a part of home.”',
    quoteSmall: 'Same nostalgia. Bigger happiness.',
  },

  business: {
    celebration: {
      eyebrow: 'Weddings & Bulk Orders',
      title: ['Made for Moments', 'Worth Celebrating'],
      /** One entry per line of the desktop design. */
      lead: [
        'From weddings and engagements to family functions',
        'and festivals, Ghaatu Mitai prepares traditional sweets',
        'and savouries made for sharing.',
      ],
      benefits: {
        quantities: { title: 'Custom quantities', desc: 'Small or large, we’ve got you covered.' },
        pricing: { title: 'Bulk pricing', desc: 'Better value for bigger moments.' },
        gifts: { title: 'Custom gift boxes', desc: 'Beautifully packed for your special day.' },
        fresh: { title: 'Freshly prepared', desc: 'Traditional taste, always fresh.' },
      },
      plan: 'Plan Your Order',
      whatsapp: 'Talk to Us on WhatsApp',
      script: ['Traditional flavours make', 'every celebration sweeter. ♡'],
      imageAlt:
        'Traditional sweets, savouries and Ghaatu Mitai gift boxes prepared for a wedding celebration',
      perfectFor: 'Perfect for',
      occasions: {
        weddings: 'Weddings',
        engagements: 'Engagements',
        family: 'Family Functions',
        festivals: 'Festivals',
        corporate: 'Corporate Events',
      },
      tagline: ['More than sweets & snacks.', 'It’s a part of home. ♡'],
    },
    wholesale: {
      eyebrow: 'Wholesale',
      title: ['Bring Ghaatu Mitai', 'to Your Store'],
      lead: ['Authentic sweets & savouries your customers', 'will come back for.'],
      benefits: {
        flavours: 'Authentic Flavours',
        quality: 'Consistent Quality',
        supply: 'Reliable Supply',
        pricing: 'Competitive Wholesale Pricing',
      },
      partner: 'Become a Retail Partner',
      catalogue: 'Download Wholesale Catalogue',
      catalogueToast: 'Wholesale catalogue request noted — we’ll share it with your enquiry.',
      imageAlt: 'Ghaatu Mitai packaged sweets and savouries displayed in a neighbourhood store',
    },
  },

  wholesaleReasons: {
    title: 'Why Businesses Choose Ghaatu Mitai',
    quality: { title: 'Consistent Quality', desc: 'Authentic taste, every batch.' },
    supply: { title: 'Reliable Supply', desc: 'Timely deliveries you can count on.' },
    pricing: { title: 'Wholesale Pricing', desc: 'Better margins for your business.' },
    packaging: { title: 'Careful Packaging', desc: 'Safe, fresh and retail ready.' },
  },

  contact: {
    eyebrow: 'Good food brings people together',
    title: 'Let’s Talk',
    sub: 'For your family, a celebration or your business — tell us what you have in mind.',
    cardTitle: 'A little conversation starts something sweet.',
    cardText:
      'Prepare an enquiry for a bulk order, a retail partnership or a question about our treats.',
    write: 'Write an enquiry',
    note: 'Enquiries are available as a download in this preview.',
  },

  shop: {
    bannerAlt: 'Boondi laddus piled in a brass bowl',
    breadcrumb: 'Breadcrumb',
    home: 'Home',
    shop: 'Shop',
    title: 'Shop Our Traditional Goodness',
    sub: 'Sweets, snacks and more — made with the warmth of home.',
    byCategory: 'Shop by category',
    allProducts: 'All Products',
    filters: 'Filters',
    count: (n: number) => `${n} ${n === 1 ? 'product' : 'products'}`,
    sortBy: 'Sort by',
    sort,
    searchChip: (query: string) => `Search: “${query}”`,
    favouritesChip: 'Favourites only',
    remove: 'Remove',
    emptyTitle: 'No treats found',
    emptyText: 'Try removing a filter or searching for something else.',
    showAll: 'Show all products',
    pagination: 'Product pages',
    previous: 'Previous page',
    next: 'Next page',
    page: (n: number) => `Page ${n}`,
  },

  filters: {
    label: 'Product filters',
    clear: (n: number) => `Clear all filters (${n})`,
    categories: 'Categories',
    price: 'Price Range',
    weight: 'Weight',
    dietary: 'Dietary',
    noPreservatives: 'No Preservatives',
    vegetarian: '100% Vegetarian',
    availability: 'Availability',
    inStock: 'In Stock',
    promise: ['Pure Ingredients', 'Happier People'],
    promiseBrand: ['That’s ', 'Ghaatu Mitai.'],
  },

  form: {
    optional: '(Optional)',
    errors: formErrors,
    eventTypes,
    quantities,
    businessTypes,
    volumes,
    fullName: 'Full Name',
    name: 'Name',
    namePlaceholder: 'Enter your name',
    phone: 'Phone Number',
    phonePlaceholder: 'Enter your phone number',
    email: 'Email',
    emailPlaceholder: 'Enter your email',
    message: 'Message',
    messagePlaceholder: 'Tell us more about your requirements...',
    thanks: (firstName: string) => `Thank you, ${firstName}!`,
    openWhatsAppAgain: 'Open WhatsApp again',
  },

  quote: {
    eventType: 'Event Type',
    eventTypePlaceholder: 'Select event type',
    date: 'Expected Date',
    quantity: 'Approximate Quantity',
    quantityPlaceholder: 'Select quantity',
    submit: 'Request a Quote',
    or: 'or',
    whatsapp: 'Talk to Us on WhatsApp',
    note: 'Our team will get back to you within 24 hours.',
    success:
      'Your request is ready in WhatsApp — just press send. Our team will get back to you within 24 hours.',
    another: 'Request another quote',
  },

  wholesaleForm: {
    businessName: 'Business Name',
    businessNamePlaceholder: 'Enter business name',
    businessType: 'Business Type',
    businessTypePlaceholder: 'Select business type',
    city: 'City',
    cityPlaceholder: 'Enter your city',
    volume: 'Expected Monthly Volume',
    volumePlaceholder: 'Select volume',
    submit: 'Submit Enquiry',
    whatsapp: 'Or talk to us directly on WhatsApp',
    success: (business: string) =>
      `Your enquiry for ${business} is ready in WhatsApp — just press send. Our partnerships team will get back to you shortly.`,
    another: 'Send another enquiry',
  },

  bulk: {
    heroAlt:
      'Brass bowls of laddus, kaju katli, jantikalu and mixture with roses and a ‘Good Food Makes Great Celebrations’ sign',
    title: ['Weddings &', 'Bulk Orders'],
    lead: 'Traditional flavours for life’s special moments.',
    text: 'From weddings and engagements to family functions, corporate events and festivals, Ghaatu Mitai prepares authentic sweets and savouries made for sharing.',
    popularTitle: 'Popular for Celebrations',
    popularSub: 'A few favourites for your special occasions.',
    occasionsTitle: 'Perfect for Every Occasion',
    quoteTitle: 'Request a Quote',
    quoteIntro: 'Tell us about your requirement and we’ll get back to you with the best options.',
    giftAlt:
      'Ghaatu Mitai gift boxes tied with red ribbon and a card reading ‘More Than Sweets, It’s a Part of Your Story’',
    giftTitle: 'Custom Gift Boxes',
    giftText: ['Beautifully packed and customised for your occasion.', 'Add a traditional touch to your celebrations.'],
    giftCta: 'Explore Gift Boxes',
    giftScript: ['Tradition', 'Tastes Better', 'Together ♡'],
  },

  wholesalePage: {
    heroAlt:
      'Store shelf of Ghaatu Mitai snack packs under signs reading ‘Good Food, Stronger Communities’ and ‘Traditional Taste Now in Your Store’',
    eyebrow: 'For Businesses',
    title: ['Bring Ghaatu Mitai', 'to Your Store'],
    lead: 'Authentic sweets & savouries your customers will come back for.',
    partner: 'Become a Retail Partner',
    catalogue: 'Download Wholesale Catalogue',
    rangeTitle: 'Our Product Range',
    rangeSub: 'Traditional favourites, packaged for modern shelves.',
    whyTitle: 'Why Businesses Choose Ghaatu Mitai',
    enquiryTitle: 'Enquire About Wholesale',
    enquiryIntro: 'Tell us about your business and we’ll get back to you shortly.',
    bandTitle: 'Partner with Ghaatu Mitai',
    bandText: 'Authentic. Trusted. Growing Together.',
    bandCatalogue: 'Download Catalogue',
  },
};

export type Messages = typeof en;
