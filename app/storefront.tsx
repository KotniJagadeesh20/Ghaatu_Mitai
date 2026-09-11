'use client';

import { useState, createContext, useContext, useEffect } from 'react';
import Link from 'next/link';

import {
  ArrowRight,
  ShoppingBag,
  Search,
  Heart,
  Leaf,
  Truck,
  Users,
  Gift,
  Store,
  Package,
  Menu,
  Minus,
  Plus,
  Trash2,
  Mail,
  MapPin,
  Tag,
  MessageCircle,
  Download,
  ShoppingCart,
  Building2,
  BadgeCheck,
  Coins,
  ShieldCheck,
  Boxes,
} from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';

import { Toaster, toast } from 'sonner';


/* =========================================================
   GitHub Pages
   ========================================================= */

const BASE_PATH = '/Ghaatu_Mitai';

function asset(path: string) {
  return `${BASE_PATH}${path}`;
}


/* =========================================================
   Shopping Context
   ========================================================= */

type CartItem = {
  id: number;
  size: string;
  qty: number;
};

type ShoppingContextValue = {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  saved: number[];
  setSaved: React.Dispatch<React.SetStateAction<number[]>>;
};

const ShoppingContext =
  createContext<ShoppingContextValue | null>(null);

export function ShoppingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [saved, setSaved] = useState<number[]>([]);

  return (
    <ShoppingContext.Provider
      value={{
        cart,
        setCart,
        saved,
        setSaved,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
}


/* =========================================================
   Artwork / Sprite dimensions
   ========================================================= */

const dims: Record<string, number[]> = {
  home: [1024, 1536],
  shop: [1312, 1199],
  story: [1536, 1024],
  business: [1024, 1536],
  community: [1024, 1536],
};


/* =========================================================
   Artwork component
   ========================================================= */

function Art({
  source,
  box,
  alt,
  className = '',
}: {
  source: string;
  box: number[];
  alt: string;
  className?: string;
}) {
  const [x, y, w, h] = box;

  return (
    <div
      className={'art ' + className}
      style={{
        aspectRatio: `${w}/${h}`,
      }}
    >
      <img
        src={asset(`/images/${source}.png`)}
        alt={alt}
        draggable={false}
        style={{
          width: dims[source][0] / w * 100 + '%',
          maxWidth: 'none',
          left: -x / w * 100 + '%',
          top: 0,
          transform: `translateY(${
            -y / dims[source][1] * 100
          }%)`,
        }}
      />
    </div>
  );
}


/* =========================================================
   Products
   ========================================================= */

const products = [
  {
    name: 'Ghaatu Mixture',
    category: 'Mixtures',
    price: 180,
    desc: 'A perfect blend of tradition and crunch.',
    box: [28, 165, 239, 221],
  },
  {
    name: 'Jantikalu',
    category: 'Savouries',
    price: 200,
    desc: 'Crispy. Traditional. Timeless.',
    box: [284, 165, 238, 221],
  },
  {
    name: 'Boondi Laddu',
    category: 'Sweets',
    price: 220,
    desc: 'Sweetness that feels like home.',
    box: [539, 165, 237, 221],
  },
  {
    name: 'Arati Chips',
    category: 'Chips',
    price: 150,
    desc: 'Thin. Crisp. Simply addictive.',
    box: [794, 165, 236, 221],
  },
  {
    name: 'Kaju Katli',
    category: 'Sweets',
    price: 320,
    desc: 'Rich taste for special moments.',
    box: [1049, 165, 237, 221],
  },
  {
    name: 'Celebration Gift Box',
    category: 'Gift Boxes',
    price: 650,
    desc: 'A little box of shared happiness.',
    box: [349, 791, 303, 178],
  },
  {
    name: 'Chai Time Combo',
    category: 'Combos',
    price: 380,
    desc: 'Your favourite evening companions.',
    box: [28, 791, 305, 178],
  },
];

const nav = [
  ['Home', '/'],
  ['Shop', '/shop'],
  ['About', '/about'],
  ['Bulk Orders', '/bulk-orders'],
  ['Wholesale', '/wholesale'],
  ['Contact', '/contact'],
];

const cats = [
  'Sweets',
  'Savouries',
  'Mixtures',
  'Chips',
  'Combos',
  'Gift Boxes',
];


/* =========================================================
   Section title
   ========================================================= */

function Title({
  eyebrow,
  title,
  sub,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="section-title">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}

      <h2>
        <Art
          source="home"
          box={[337, 924, 46, 43]}
          alt=""
        />

        {title}

        <Art
          source="home"
          box={[337, 924, 46, 43]}
          alt=""
        />
      </h2>

      {sub && <p>{sub}</p>}
    </div>
  );
}


/* =========================================================
   Storefront
   ========================================================= */

export default function Storefront({
  page,
}: {
  page: string;
}) {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState(false);
  const [menu, setMenu] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [savedOnly, setSavedOnly] = useState(false);

  const shoppingContext = useContext(ShoppingContext);

  if (!shoppingContext) {
    throw new Error(
      'Storefront must be rendered inside ShoppingProvider'
    );
  }

  const {
    cart,
    setCart,
    saved,
    setSaved,
  } = shoppingContext;

  const [sizes, setSizes] =
    useState<Record<number, string>>({});

  const [enquiry, setEnquiry] = useState('');
  const [draft, setDraft] = useState('');


  /* =======================================================
     Cart helpers
     ======================================================= */

  const sizeFor = (id: number) =>
    sizes[id] || '250g';

  const multiplier = (size: string) =>
    size === '1kg'
      ? 4
      : size === '500g'
        ? 2
        : 1;

  const total = cart.reduce(
    (sum, item) =>
      sum +
      products[item.id].price *
        multiplier(item.size) *
        item.qty,
    0
  );

  const count = cart.reduce(
    (sum, item) => sum + item.qty,
    0
  );


  function add(id: number) {
    const size = sizeFor(id);

    setCart((old) => {
      const exists = old.find(
        (item) =>
          item.id === id &&
          item.size === size
      );

      if (exists) {
        return old.map((item) =>
          item === exists
            ? {
                ...item,
                qty: item.qty + 1,
              }
            : item
        );
      }

      return [
        ...old,
        {
          id,
          size,
          qty: 1,
        },
      ];
    });

    toast.success(
      products[id].name +
        ' added to your bag'
    );
  }


  function change(
    index: number,
    delta: number
  ) {
    setCart((old) =>
      old
        .map((item, key) =>
          key === index
            ? {
                ...item,
                qty: item.qty + delta,
              }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  }


  /* =======================================================
     Product catalogue
     ======================================================= */

  function catalogue(all = false) {
    const list = products
      .map((product, id) => ({
        ...product,
        id,
      }))
      .filter(
        (product) =>
          (all || product.id < 5) &&
          (category === 'All' ||
            product.category === category) &&
          product.name
            .toLowerCase()
            .includes(
              query.toLowerCase()
            ) &&
          (!savedOnly ||
            saved.includes(product.id))
      );

    return (
      <>
        <div className="products">
          {list.map((product) => (
            <article
              className="product"
              key={product.id}
            >
              <div className="product-photo">
                <Art
                  source="shop"
                  box={product.box}
                  alt={product.name}
                />

                {[0, 2].includes(product.id) && (
                  <span className="badge">
                    Best seller
                  </span>
                )}

                <button
                  className={
                    'heart ' +
                    (saved.includes(product.id)
                      ? 'liked'
                      : '')
                  }
                  aria-label={
                    'Save ' +
                    product.name
                  }
                  aria-pressed={saved.includes(
                    product.id
                  )}
                  onClick={() =>
                    setSaved((old) =>
                      old.includes(product.id)
                        ? old.filter(
                            (x) =>
                              x !== product.id
                          )
                        : [
                            ...old,
                            product.id,
                          ]
                    )
                  }
                >
                  <Heart size={18} />
                </button>
              </div>

              <div className="product-info">
                <h3>{product.name}</h3>

                <p>{product.desc}</p>

                <RadioGroup
                  className="pack-options"
                  value={sizeFor(product.id)}
                  onValueChange={(value) =>
                    setSizes({
                      ...sizes,
                      [product.id]: value,
                    })
                  }
                  aria-label={
                    'Pack size for ' +
                    product.name
                  }
                >
                  {[
                    '250g',
                    '500g',
                    '1kg',
                  ].map((weight) => (
                    <label
                      key={weight}
                      className={
                        sizeFor(product.id) ===
                        weight
                          ? 'chosen'
                          : ''
                      }
                    >
                      <RadioGroupItem
                        value={weight}
                        className="sr-only"
                      />

                      {weight}
                    </label>
                  ))}
                </RadioGroup>

                <strong className="product-price">
                  ₹
                  {product.price *
                    multiplier(
                      sizeFor(product.id)
                    )}
                </strong>

                {product.id < 5 && (
                  <div
                    className="rating"
                    aria-label={
                      '5 out of 5 stars, ' +
                      [124, 98, 142, 76, 89][
                        product.id
                      ] +
                      ' reviews'
                    }
                  >
                    <span>
                      ★★★★★
                    </span>{' '}
                    (
                    {
                      [124, 98, 142, 76, 89][
                        product.id
                      ]
                    }
                    )
                  </div>
                )}

                <div className="product-buttons">
                  <button
                    className="btn add"
                    onClick={() =>
                      add(product.id)
                    }
                  >
                    <ShoppingBag size={18} />
                    Add to Cart
                  </button>

                  <button
                    className={
                      'save-product ' +
                      (saved.includes(
                        product.id
                      )
                        ? 'liked'
                        : '')
                    }
                    aria-label={
                      'Save ' +
                      product.name
                    }
                    aria-pressed={saved.includes(
                      product.id
                    )}
                    onClick={() =>
                      setSaved((old) =>
                        old.includes(
                          product.id
                        )
                          ? old.filter(
                              (x) =>
                                x !==
                                product.id
                            )
                          : [
                              ...old,
                              product.id,
                            ]
                      )
                    }
                  >
                    <Heart size={22} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {!list.length && (
          <div className="empty">
            <h3>No treats found</h3>

            <p>
              Try another category or
              search.
            </p>

            <button
              className="btn"
              onClick={() => {
                setCategory('All');
                setQuery('');
                setSavedOnly(false);
              }}
            >
              Show all products
            </button>
          </div>
        )}
      </>
    );
  }


  /* =======================================================
     Benefits
     ======================================================= */

  function benefits() {
    const items = [
      [
        Leaf,
        'Traditional Recipes',
        'Authentic Telugu flavours',
      ],
      [
        Heart,
        'Quality Ingredients',
        'Pure & natural',
      ],
      [
        Truck,
        'Pan India Delivery',
        'Freshly packed with care',
      ],
      [
        Users,
        'Bulk & Custom Orders',
        'For every occasion',
      ],
    ] as const;

    return (
      <div className="benefits">
        {items.map(
          ([Icon, title, desc]) => (
            <div key={title}>
              <Icon size={30} />

              <span>
                <strong>{title}</strong>
                <small>{desc}</small>
              </span>
            </div>
          )
        )}
      </div>
    );
  }


  /* =======================================================
     Story
     ======================================================= */

  function story() {
    return (
      <section className="story split">
        <Art
          source="story"
          box={[0, 0, 756, 714]}
          alt="Ghaatu Mitai traditional sweet cart under a leafy tree"
        />

        <div className="split-copy">
          <Art
            className="story-memories"
            source="story"
            box={[1262, 49, 273, 651]}
            alt="Same nostalgia, bigger happiness. Memories of the original bandi and sweets still made with love."
          />

          <p className="eyebrow">
            Our story
          </p>

          <h2>
            From a little Bandi
            <br />
            to your home.
          </h2>

          <div className="flourish">
            — <Leaf /> —
          </div>

          <p>
            Ghaatu Mitai is inspired by
            the flavours, traditions and
            evening conversations that make
            Telugu homes special.
          </p>

          <p>
            What started as a small bandi
            with a big love for good food
            brings those familiar tastes to
            your table — one sweet, one
            savoury, one memory at a time.
          </p>

          <p>
            Traditional recipes, quality
            ingredients and a whole lot of
            care. Because good food brings
            people closer.
          </p>

          {page === 'home' && (
            <Link
              className="btn"
              href="/about"
            >
              Our journey
              <ArrowRight size={17} />
            </Link>
          )}
        </div>
      </section>
    );
  }


  /* =======================================================
     Business sections
     ======================================================= */

  function business(
    wholesale = false
  ) {
    const celebrationBenefits = [
      [
        Boxes,
        'Custom quantities',
        'Small or large, we’ve got you covered.',
      ],
      [
        Tag,
        'Bulk pricing',
        'Better value for bigger moments.',
      ],
      [
        Gift,
        'Custom gift boxes',
        'Beautifully packed for your special day.',
      ],
      [
        Leaf,
        'Freshly prepared',
        'Traditional taste, always fresh.',
      ],
    ] as const;

    const wholesaleBenefits = [
      [
        Store,
        'For supermarkets',
        'Ready-to-display packaged products.',
      ],
      [
        ShoppingCart,
        'For retailers',
        'Flexible quantities and wholesale pricing.',
      ],
      [
        Truck,
        'For distributors',
        'Talk to us about becoming a distribution partner.',
      ],
    ] as const;

    const perfectFor = [
      [Gift, 'Weddings'],
      [BadgeCheck, 'Engagements'],
      [Users, 'Family Functions'],
      [Leaf, 'Festivals'],
      [Building2, 'Corporate Events'],
    ] as const;

    if (wholesale) {
      return (
        <section className="business-showcase wholesale-showcase">
          <div className="showcase-copy">
            <p className="eyebrow">
              Wholesale
            </p>

            <div className="showcase-flourish">
              — <Leaf size={20} /> —
            </div>

            <h1>
              Bring Ghaatu Mitai
              <br />
              to Your Store
            </h1>

            <p className="showcase-lead">
              Authentic sweets &amp;
              savouries your customers
              <br />
              will come back for.
            </p>

            <div className="partner-cards">
              {wholesaleBenefits.map(
                ([Icon, title, desc]) => (
                  <article key={title}>
                    <Icon />
                    <h3>{title}</h3>
                    <p>{desc}</p>
                  </article>
                )
              )}
            </div>

            <div className="showcase-actions">
              <button
                className="btn"
                onClick={() =>
                  setEnquiry(
                    'Retail partnership'
                  )
                }
              >
                Become a Retail Partner
                <ArrowRight size={17} />
              </button>

              <button
                className="btn outline"
                onClick={() =>
                  toast.success(
                    'Wholesale catalogue request noted — we’ll share it with your enquiry.'
                  )
                }
              >
                <Download size={18} />
                Download Wholesale Catalogue
              </button>
            </div>
          </div>

          <Art
            className="showcase-art"
            source="business"
            box={[482, 726, 542, 517]}
            alt="Ghaatu Mitai packaged sweets and savouries displayed in a neighbourhood store"
          />
        </section>
      );
    }

    return (
      <>
        <section className="business-showcase celebration-showcase">
          <div className="showcase-copy">
            <p className="eyebrow">
              Weddings &amp; Bulk Orders
            </p>

            <div className="showcase-flourish">
              — <Leaf size={20} /> —
            </div>

            <h1>
              Made for Moments
              <br />
              Worth Celebrating
            </h1>

            <p className="showcase-lead">
              From weddings and engagements
              to family functions
              <br />
              and festivals, Ghaatu Mitai
              prepares traditional sweets
              <br />
              and savouries made for sharing.
            </p>

            <div className="celebration-benefits">
              {celebrationBenefits.map(
                ([Icon, title, desc]) => (
                  <article key={title}>
                    <span>
                      <Icon />
                    </span>

                    <h3>{title}</h3>
                    <p>{desc}</p>
                  </article>
                )
              )}
            </div>

            <div className="showcase-actions">
              <button
                className="btn"
                onClick={() =>
                  setEnquiry('Bulk order')
                }
              >
                Plan Your Order
                <ArrowRight size={17} />
              </button>

              <button
                className="btn outline"
                onClick={() =>
                  setEnquiry(
                    'WhatsApp bulk order'
                  )
                }
              >
                <MessageCircle size={19} />
                Talk to Us on WhatsApp
              </button>
            </div>

            <p className="script">
              Traditional flavours make
              <br />
              every celebration sweeter. ♡
            </p>
          </div>

          <Art
            className="showcase-art"
            source="business"
            box={[490, 0, 534, 629]}
            alt="Traditional sweets, savouries and Ghaatu Mitai gift boxes prepared for a wedding celebration"
          />
        </section>

        <div className="perfect-for">
          <strong>Perfect for</strong>

          {perfectFor.map(
            ([Icon, label]) => (
              <span key={label}>
                <Icon />
                {label}
              </span>
            )
          )}

          <em>
            More than sweets &amp; snacks.
            <br />
            It’s a part of home. ♡
          </em>
        </div>
      </>
    );
  }


  /* =======================================================
     Wholesale reasons
     ======================================================= */

  function wholesaleReasons() {
    const reasons = [
      [
        BadgeCheck,
        'Consistent Quality',
        'Authentic taste, every batch.',
      ],
      [
        Package,
        'Reliable Supply',
        'Timely deliveries you can count on.',
      ],
      [
        Coins,
        'Wholesale Pricing',
        'Better margins for your business.',
      ],
      [
        ShieldCheck,
        'Careful Packaging',
        'Safe, fresh and retail ready.',
      ],
    ] as const;

    return (
      <section className="wholesale-reasons">
        <h2>
          <Leaf />
          Why Businesses Choose Ghaatu Mitai
          <Leaf />
        </h2>

        <div>
          {reasons.map(
            ([Icon, title, desc]) => (
              <article key={title}>
                <Icon />

                <span>
                  <strong>{title}</strong>
                  <small>{desc}</small>
                </span>
              </article>
            )
          )}
        </div>
      </section>
    );
  }


  /* =======================================================
     Main UI
     ======================================================= */

  return (
    <>
      <Toaster position="bottom-center" />

      <div className="announcement">
        <span>
          Traditional Sweets &amp; Snacks
          <i>|</i>
          Made with Love
          <i>|</i>
          Delivered with Joy
        </span>

        <span>
          <Truck size={14} />
          Free shipping on orders above ₹999
        </span>
      </div>

      <header>
        <Link
          className="logo"
          href="/"
          aria-label="Ghaatu Mitai home"
        >
          <Art
            source="home"
            box={[66, 56, 139, 112]}
            alt="Ghaatu Mitai Sweets and Snacks"
          />
        </Link>

        <nav>
          {nav.map(
            ([label, url]) => (
              <Link
                key={url}
                className={
                  (page === 'home'
                    ? '/'
                    : '/' + page) === url
                    ? 'active'
                    : ''
                }
                href={url}
              >
                {label}
              </Link>
            )
          )}
        </nav>

        <div className="header-actions">
          <button
            aria-label="Search products"
            onClick={() =>
              setSearch(true)
            }
          >
            <Search />
          </button>

          <Link
            href="/shop?saved=true"
            aria-label="Shop favourites"
            onClick={(event) => {
              if (page === 'shop') {
                event.preventDefault();
                setSavedOnly(!savedOnly);
              }
            }}
          >
            <Heart />
          </Link>

          <button
            className="bag"
            aria-label={
              'Open shopping bag, ' +
              count +
              ' items'
            }
            onClick={() =>
              setCartOpen(true)
            }
          >
            <ShoppingBag />
            <span>{count}</span>
          </button>

          <button
            className="mobile-menu"
            aria-label="Open navigation"
            onClick={() =>
              setMenu(true)
            }
          >
            <Menu />
          </button>
        </div>
      </header>

      <main>
        {page === 'home' && (
          <>
            <section className="hero">
              <div className="hero-photo">
                <Art
                  source="home"
                  box={[449, 142, 575, 636]}
                  alt="A warm spread of Telugu mixture, jantikalu, laddu and chai"
                />
              </div>

              <div className="hero-copy">
                <p className="eyebrow">
                  Traditional tastes
                  <br />
                  A happier tomorrow.
                </p>

                <h1 className="brand-wordmark">
                  <span className="sr-only">
                    Ghaatu Mitai — Sweets &amp;
                    Snacks
                  </span>

                  <Art
                    source="home"
                    box={[54, 283, 394, 127]}
                    alt=""
                  />
                </h1>

                <Art
                  className="hero-handwriting"
                  source="home"
                  box={[53, 430, 420, 66]}
                  alt="Ghaatu. Teepi. Tinaka Tappade!"
                />

                <p className="intro">
                  Authentic Telugu sweets &amp;
                  snacks,
                  <br />
                  made with the warmth of home.
                </p>

                <div className="actions">
                  <Link
                    className="btn"
                    href="/shop"
                  >
                    Shop sweets &amp; snacks
                    <ArrowRight size={17} />
                  </Link>

                  <Link
                    className="btn outline"
                    href="/bulk-orders"
                  >
                    Bulk / wedding orders
                  </Link>
                </div>
              </div>
            </section>

            {benefits()}

            <section className="section categories">
              <Art
                className="corner-leaf"
                source="home"
                box={[0, 895, 98, 109]}
                alt=""
              />

              <Art
                className="corner-leaf right"
                source="home"
                box={[0, 895, 98, 109]}
                alt=""
              />

              <Title
                eyebrow="Explore our"
                title="Categories"
                sub="Something special for every craving"
              />

              <div className="category-grid">
                {cats.map((categoryName, i) => (
                  <Link
                    href={
                      '/shop?category=' +
                      encodeURIComponent(
                        categoryName
                      )
                    }
                    key={categoryName}
                  >
                    <Art
                      source="home"
                      box={
                        [
                          [27, 1019, 143, 143],
                          [190, 1019, 143, 143],
                          [355, 1019, 143, 143],
                          [523, 1019, 143, 143],
                          [691, 1019, 143, 143],
                          [855, 1019, 143, 143],
                        ][i]
                      }
                      alt={categoryName}
                    />

                    <h3>{categoryName}</h3>

                    <span className="round-arrow">
                      <ArrowRight size={17} />
                    </span>
                  </Link>
                ))}
              </div>
            </section>

            <div className="quote">
              <Art
                className="quote-leaf"
                source="home"
                box={[0, 1330, 119, 206]}
                alt=""
              />

              “Traditional flavours,
              modern moments.”

              <div className="quote-ornament">
                — <Leaf /> —
              </div>

              <small>
                Sweets · Snacks · Happier people
              </small>
            </div>

            <section className="section">
              <div className="heading-row">
                <Art
                  className="best-note"
                  source="shop"
                  box={[36, 26, 139, 121]}
                  alt="Traditional tastes. Always a hit!"
                />

                <Title
                  eyebrow="Our most loved"
                  title="Best Sellers"
                  sub="The ones that disappear first."
                />

                <Link
                  href="/shop"
                  className="text-link"
                >
                  View all products
                  <ArrowRight size={18} />
                </Link>
              </div>

              {catalogue()}
            </section>

            <section className="section occasions">
              <Title
                title="Made for Every Occasion"
                sub="Traditional flavours for life's special moments"
              />

              <div className="occasion-grid">
                {[
                  'Evening Chai',
                  'Gifting',
                  'Weddings & Celebrations',
                  'Wholesale',
                ].map((title, i) => (
                  <Link
                    key={title}
                    href={
                      [
                        '/shop',
                        '/shop?category=Gift%20Boxes',
                        '/bulk-orders',
                        '/wholesale',
                      ][i]
                    }
                  >
                    <Art
                      source="shop"
                      box={
                        [
                          [28, 791, 305, 178],
                          [349, 791, 303, 178],
                          [669, 791, 300, 178],
                          [984, 791, 302, 178],
                        ][i]
                      }
                      alt={title}
                    />

                    <div>
                      <h3>{title}</h3>

                      <p>
                        {
                          [
                            'Something crunchy for every conversation.',
                            'Sweet boxes made for sharing.',
                            'Traditional flavours for your special moments.',
                            'Bring Ghaatu Mitai to your store.',
                          ][i]
                        }
                      </p>

                      <ArrowRight size={20} />
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {story()}
            {benefits()}
            {business()}
            {business(true)}
            {wholesaleReasons()}

            <section className="section testimonials">
              <Title
                eyebrow="Customer love"
                title="Customers Say It Best"
                sub="Real people. Real stories. Real happiness."
              />

              <div className="testimonial-grid">
                {[
                  [
                    'Tastes just like the homemade mixture my grandmother used to make. Simply amazing!',
                    'Ramesh K.',
                    'Hyderabad',
                    0,
                  ],
                  [
                    'Crispy, fresh and full of flavour. Our whole family loves Ghaatu Mitai snacks!',
                    'Sowmya P.',
                    'Bangalore',
                    1,
                  ],
                  [
                    'Ordered for our daughter’s wedding. Everyone loved the sweets. Great quality and service!',
                    'Venkatesh R.',
                    'Vijayawada',
                    2,
                  ],
                  [
                    'Beautifully packed, delicious sweets and on-time delivery. Highly recommended!',
                    'Priya M.',
                    'Chennai',
                    5,
                  ],
                  [
                    'The best banana chips I’ve had in a long time. Super crispy and fresh!',
                    'Aditya S.',
                    'Mumbai',
                    3,
                  ],
                ].map(
                  (
                    [
                      quote,
                      name,
                      city,
                      id,
                    ],
                    i
                  ) => (
                    <article
                      key={String(name)}
                    >
                      <Art
                        source="shop"
                        box={
                          products[
                            Number(id)
                          ].box
                        }
                        alt={
                          products[
                            Number(id)
                          ].name
                        }
                      />

                      <div>
                        <p>
                          “{quote}”
                        </p>

                        <span className="review-stars">
                          ★★★★★
                        </span>

                        <div className="review-person">
                          <Art
                            source="community"
                            box={[
                              64 +
                                182 * i,
                              365,
                              43,
                              43,
                            ]}
                            alt=""
                          />

                          <span>
                            <strong>
                              {name}
                            </strong>

                            <small>
                              {city}
                            </small>
                          </span>
                        </div>
                      </div>
                    </article>
                  )
                )}
              </div>
            </section>

            <section className="section">
              <Title
                eyebrow="Follow our journey"
                title="Moments from Our Community"
                sub="Tag us @ghaatumitai and be a part of our story."
              />

              <div className="community">
                {[21, 184, 350, 520, 688, 856].map(
                  (x, i) => (
                    <Art
                      key={x}
                      source="community"
                      box={[
                        x,
                        600,
                        150,
                        220,
                      ]}
                      alt={
                        [
                          'A cup of evening chai',
                          'Fresh jantikalu',
                          'A festive sweet spread',
                          'Ghaatu Mitai gift boxes',
                          'A crisp banana chip',
                          'Packaged traditional snacks',
                        ][i]
                      }
                    />
                  )
                )}
              </div>
            </section>
          </>
        )}

        {page === 'shop' && (
          <section className="shop-page-shell">
            <div className="shop-hero">
              <div className="shop-crumbs">
                <Link href="/">Home</Link>
                <span>›</span>
                <span>Shop</span>
              </div>

              <div className="shop-hero-row">
                <div className="shop-hero-copy">
                  <h1>
                    Shop Our Traditional Goodness
                  </h1>

                  <p>
                    Sweets, snacks and more —
                    made with the warmth of home.
                  </p>
                </div>

                <div className="shop-hero-visual">
                  <Art
                    source="shop"
                    box={[288, 0, 628, 520]}
                    alt="Traditional sweets and savouries served in a warm festive bowl"
                  />

                  <div className="shop-scribble">
                    Same
                    <br />
                    Traditional Tastes
                    <br />
                    <span>
                      Bigger Happiness.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="shop-category-row">
              {[
                'All',
                'Sweets',
                'Savouries',
                'Mixtures',
                'Chips',
                'Combos',
                'Gift Boxes',
              ]
                .slice(1)
                .map(
                  (
                    label,
                    index
                  ) => (
                    <button
                      key={label}
                      className={
                        'shop-category-item ' +
                        (category === label
                          ? 'active'
                          : '')
                      }
                      onClick={() =>
                        setCategory(label)
                      }
                    >
                      <Art
                        source="shop"
                        box={
                          [
                            [27, 165, 239, 221],
                            [284, 165, 238, 221],
                            [28, 165, 239, 221],
                            [794, 165, 236, 221],
                            [28, 791, 305, 178],
                            [349, 791, 303, 178],
                          ][index]
                        }
                        alt={label}
                      />

                      <span>{label}</span>
                    </button>
                  )
                )}
            </div>

            <div className="shop-shell">
              <aside className="shop-filters">
                <div className="shop-filter-header">
                  <span>Categories</span>

                  <button
                    type="button"
                    aria-label="Open categories"
                  >
                    ⌄
                  </button>
                </div>

                <div className="shop-filter-list">
                  {['All', ...cats].map(
                    (categoryName) => (
                      <label
                        key={categoryName}
                        className="shop-check"
                      >
                        <input
                          type="checkbox"
                          checked={
                            category ===
                              categoryName ||
                            (categoryName ===
                              'All' &&
                              category ===
                                'All')
                          }
                          onChange={() =>
                            setCategory(
                              categoryName
                            )
                          }
                        />

                        <span>
                          {categoryName}
                        </span>

                        {categoryName ===
                        'All'
                          ? ''
                          : '(0)'}
                      </label>
                    )
                  )}
                </div>

                <div className="shop-filter-header">
                  <span>
                    Price Range
                  </span>

                  <button
                    type="button"
                    aria-label="Open price range"
                  >
                    ⌄
                  </button>
                </div>

                <div className="shop-filter-list small">
                  <label className="shop-check">
                    <input
                      type="checkbox"
                      readOnly
                    />
                    <span>₹0</span>
                  </label>

                  <label className="shop-check">
                    <input
                      type="checkbox"
                      readOnly
                    />
                    <span>
                      ₹1,000+
                    </span>
                  </label>
                </div>

                <div className="shop-filter-header">
                  <span>Weight</span>

                  <button
                    type="button"
                    aria-label="Open weight"
                  >
                    ⌄
                  </button>
                </div>

                <div className="shop-filter-list small">
                  <label className="shop-check">
                    <input
                      type="checkbox"
                      readOnly
                    />
                    <span>
                      100g (12)
                    </span>
                  </label>

                  <label className="shop-check">
                    <input
                      type="checkbox"
                      readOnly
                    />
                    <span>
                      250g (32)
                    </span>
                  </label>

                  <label className="shop-check">
                    <input
                      type="checkbox"
                      readOnly
                    />
                    <span>
                      500g (28)
                    </span>
                  </label>
                </div>
              </aside>

              <div className="shop-results">
                <div className="shop-toolbar">
                  <span>
                    58 products
                  </span>

                  <div className="shop-sort">
                    <span>Sort by</span>

                    <button type="button">
                      Featured
                      <span>⌄</span>
                    </button>
                  </div>
                </div>

                <div className="shop-tools">
                  <label>
                    <Search size={18} />

                    <input
                      value={query}
                      onChange={(event) =>
                        setQuery(
                          event.target.value
                        )
                      }
                      placeholder="Search your favourites"
                      aria-label="Search products"
                    />
                  </label>

                  <button
                    className={
                      'filter ' +
                      (savedOnly
                        ? 'selected'
                        : '')
                    }
                    onClick={() =>
                      setSavedOnly(
                        !savedOnly
                      )
                    }
                  >
                    <Heart size={16} />
                    Favourites ({saved.length})
                  </button>
                </div>

                {catalogue(true)}

                <p className="preview-note">
                  Preview catalogue.
                  Prices and pack availability
                  will be confirmed before launch.
                </p>
              </div>
            </div>
          </section>
        )}

        {page === 'about' && (
          <>
            {story()}
            {benefits()}

            <div className="quote">
              “More than sweets &amp; snacks.
              It’s a part of home.”

              <small>
                Same nostalgia. Bigger happiness.
              </small>
            </div>
          </>
        )}

        {page === 'bulk-orders' && (
          <>
            {business()}

            <section className="section">
              <Title title="A Sweet Part of Your Celebration" />

              <div className="occasion-tags">
                {[
                  'Weddings',
                  'Engagements',
                  'Family functions',
                  'Festivals',
                  'Corporate events',
                ].map((title) => (
                  <span key={title}>
                    {title}
                  </span>
                ))}
              </div>
            </section>

            {benefits()}
          </>
        )}

        {page === 'wholesale' && (
          <>
            {business(true)}
            {wholesaleReasons()}

            <div className="wholesale-quote">
              “Traditional flavours travel
              far, and always find a home.”

              <span>
                — <Leaf /> —
              </span>

              <small>
                GHAATU MITAI
              </small>
            </div>
          </>
        )}

        {page === 'contact' && (
          <section className="section contact">
            <Title
              eyebrow="Good food brings people together"
              title="Let’s Talk"
              sub="For your family, a celebration or your business — tell us what you have in mind."
            />

            <div className="contact-card">
              <Mail size={35} />

              <h3>
                A little conversation starts
                something sweet.
              </h3>

              <p>
                Prepare an enquiry for a bulk
                order, a retail partnership or a
                question about our treats.
              </p>

              <button
                className="btn"
                onClick={() =>
                  setEnquiry(
                    'General enquiry'
                  )
                }
              >
                Write an enquiry
                <ArrowRight size={17} />
              </button>

              <small>
                Enquiries are available as a
                download in this preview.
              </small>
            </div>
          </section>
        )}
      </main>


      {/* =====================================================
          Closing
          ===================================================== */}

      <section className="closing">
        <div>
          <p className="eyebrow">
            Traditional flavours. Brighter tomorrows.
          </p>

          <h2>
            Let’s bring good food
            <br />
            to more homes.
          </h2>

          <p>
            For your family, a celebration,
            or your business.
            <br />
            Make every moment a little sweeter.
          </p>

          <div className="actions">
            <Link
              className="btn light"
              href="/shop"
            >
              Shop now
              <ArrowRight size={17} />
            </Link>

            <Link
              className="btn light-outline"
              href="/contact"
            >
              Talk to us
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>

        <Art
          source="community"
          box={[558, 860, 466, 318]}
          alt="A generous bowl of Ghaatu Mixture"
        />
      </section>


      {/* =====================================================
          Footer
          ===================================================== */}

      <footer>
        <div className="footer-main">
          <div>
            <Link
              href="/"
              className="footer-brand"
            >
              <Art
                source="home"
                box={[66, 56, 139, 112]}
                alt="Ghaatu Mitai Sweets & Snacks"
              />
            </Link>

            <p className="script">
              More than sweets &amp; snacks.
              <br />
              It’s a part of home. ♡
            </p>
          </div>

          <div>
            <h3>Quick Links</h3>

            {nav.map(([title, url]) => (
              <Link
                href={url}
                key={url}
              >
                {title}
              </Link>
            ))}
          </div>

          <div>
            <h3>
              Customer Support
            </h3>

            {[
              'Track Your Order',
              'Shipping & Delivery',
              'Returns & Refunds',
              'FAQs',
              'Terms & Conditions',
              'Privacy Policy',
            ].map((title) => (
              <button
                className="footer-support"
                key={title}
                onClick={() =>
                  setEnquiry(title)
                }
              >
                {title}
              </button>
            ))}
          </div>

          <div>
            <h3>Get in Touch</h3>

            <p className="contact-line">
              <MapPin size={16} />
              Hyderabad, India
            </p>

            <p className="contact-line">
              <Mail size={16} />
              hello@ghaatumitai.com
            </p>

            <button
              className="text-link"
              onClick={() =>
                setEnquiry(
                  'General enquiry'
                )
              }
            >
              Talk to us
              <ArrowRight size={16} />
            </button>
          </div>

          <div>
            <h3>
              Subscribe to Our Newsletter
            </h3>

            <p>
              Get updates on new products,
              <br />
              special offers and more.
            </p>

            <form
              className="newsletter"
              onSubmit={(event) => {
                event.preventDefault();

                toast.info(
                  'Newsletter signup will be available at launch. Your email has not been submitted.'
                );
              }}
            >
              <input
                type="email"
                aria-label="Email for newsletter"
                required
                placeholder="Enter your email"
              />

              <button
                className="btn"
                type="submit"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Ghaatu Mitai.
            All rights reserved.
          </span>

          <span>
            Made with love for traditional
            flavours.
          </span>
        </div>
      </footer>


      {/* =====================================================
          Shopping Cart
          ===================================================== */}

      <Sheet
        open={cartOpen}
        onOpenChange={setCartOpen}
      >
        <SheetContent className="cart-panel">
          <SheetTitle>
            Your bag ({count})
          </SheetTitle>

          <SheetDescription>
            A little happiness to take home.
          </SheetDescription>

          {cart.length ? (
            <>
              <div className="cart-items">
                {cart.map(
                  (item, index) => (
                    <div
                      className="cart-item"
                      key={
                        item.id +
                        item.size
                      }
                    >
                      <Art
                        source="shop"
                        box={
                          products[
                            item.id
                          ].box
                        }
                        alt={
                          products[
                            item.id
                          ].name
                        }
                      />

                      <div>
                        <h3>
                          {
                            products[
                              item.id
                            ].name
                          }
                        </h3>

                        <p>
                          {item.size} · ₹
                          {
                            products[
                              item.id
                            ].price *
                              multiplier(
                                item.size
                              )
                          }
                        </p>

                        <div className="quantity">
                          <button
                            onClick={() =>
                              change(
                                index,
                                -1
                              )
                            }
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>

                          <span>
                            {item.qty}
                          </span>

                          <button
                            onClick={() =>
                              change(
                                index,
                                1
                              )
                            }
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>

                          <button
                            onClick={() =>
                              setCart(
                                cart.filter(
                                  (_, key) =>
                                    key !==
                                    index
                                )
                              )
                            }
                            aria-label={
                              'Remove ' +
                              products[
                                item.id
                              ].name
                            }
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>

              <div className="cart-total">
                <strong>
                  Subtotal
                  <span>
                    ₹{total}
                  </span>
                </strong>

                <p>
                  {total > 999
                    ? 'Your bag qualifies for free shipping.'
                    : `Add ₹${
                        1000 - total
                      } more for free shipping.`}
                </p>

                <button
                  className="btn"
                  onClick={() => {
                    setEnquiry(
                      'Order summary'
                    );
                    setCartOpen(false);
                  }}
                >
                  Review order
                  <ArrowRight size={17} />
                </button>

                <small>
                  Preview only. Payments and
                  order placement are not yet
                  available.
                </small>
              </div>
            </>
          ) : (
            <div className="empty">
              <ShoppingBag size={40} />

              <h3>
                Your bag is waiting for a
                little joy.
              </h3>

              <Link
                className="btn"
                href="/shop"
              >
                Explore the shop
              </Link>
            </div>
          )}
        </SheetContent>
      </Sheet>


      {/* =====================================================
          Mobile Menu
          ===================================================== */}

      <Sheet
        open={menu}
        onOpenChange={setMenu}
      >
        <SheetContent>
          <SheetTitle>
            Ghaatu Mitai
          </SheetTitle>

          <SheetDescription>
            Traditional flavours, modern moments.
          </SheetDescription>

          <div className="mobile-nav">
            {nav.map(
              ([title, url]) => (
                <Link
                  key={url}
                  href={url}
                >
                  {title}
                  <ArrowRight size={17} />
                </Link>
              )
            )}
          </div>
        </SheetContent>
      </Sheet>


      {/* =====================================================
          Search
          ===================================================== */}

      <Dialog
        open={search}
        onOpenChange={setSearch}
      >
        <DialogContent>
          <DialogTitle>
            Find your favourites
          </DialogTitle>

          <DialogDescription>
            Search sweets, snacks and gift boxes.
          </DialogDescription>

          <input
            className="form-input"
            autoFocus
            placeholder="Try mixture or laddu"
            value={query}
            onChange={(event) =>
              setQuery(
                event.target.value
              )
            }
          />

          <div className="search-results">
            {products
              .map((product, id) => ({
                ...product,
                id,
              }))
              .filter((product) =>
                product.name
                  .toLowerCase()
                  .includes(
                    query.toLowerCase()
                  )
              )
              .map((product) => (
                <button
                  key={product.id}
                  onClick={() =>
                    add(product.id)
                  }
                >
                  <span>
                    {product.name}

                    <small>
                      250g · ₹
                      {product.price}
                    </small>
                  </span>

                  <Plus size={18} />
                </button>
              ))}
          </div>
        </DialogContent>
      </Dialog>


      {/* =====================================================
          Enquiry Dialog
          ===================================================== */}

      <Dialog
        open={!!enquiry}
        onOpenChange={(open) => {
          if (!open) {
            setEnquiry('');
            setDraft('');
          }
        }}
      >
        <DialogContent>
          <DialogTitle>
            {enquiry}
          </DialogTitle>

          <DialogDescription>
            {enquiry ===
            'Order summary'
              ? 'Review your selection. No order is placed and no payment is collected.'
              : 'Tell us what you need. Download your enquiry to keep or share with the business when contact details are available.'}
          </DialogDescription>

          {enquiry ===
          'Order summary' ? (
            <>
              <div>
                {cart.map(
                  (item) => (
                    <p
                      key={
                        item.id +
                        item.size
                      }
                    >
                      {item.qty} ×{' '}
                      {
                        products[
                          item.id
                        ].name
                      }{' '}
                      ({item.size})
                    </p>
                  )
                )}

                <strong>
                  Total: ₹{total}
                </strong>
              </div>

              <p>
                Online ordering is
                coming soon.
              </p>
            </>
          ) : (
            <form
              onSubmit={(event) => {
                event.preventDefault();

                const form =
                  new FormData(
                    event.currentTarget
                  );

                setDraft(
                  `${enquiry}\nName: ${form.get(
                    'name'
                  )}\nEmail: ${form.get(
                    'email'
                  )}\nDetails: ${form.get(
                    'details'
                  )}`
                );
              }}
            >
              <label>
                Your name

                <input
                  name="name"
                  required
                  className="form-input"
                />
              </label>

              <label>
                Email address

                <input
                  name="email"
                  type="email"
                  required
                  className="form-input"
                />
              </label>

              <label>
                What do you have in mind?

                <textarea
                  name="details"
                  required
                  className="form-input"
                  rows={4}
                  placeholder="Occasion, date, quantities, or your store details"
                />
              </label>

              <button
                className="btn"
                type="submit"
              >
                Prepare enquiry
                <ArrowRight size={16} />
              </button>

              {draft && (
                <div className="draft">
                  <p>
                    Your enquiry is ready.
                    It has not been sent.
                  </p>

                  <Link
                    className="text-link"
                    href={
                      'data:text/plain;charset=utf-8,' +
                      encodeURIComponent(
                        draft
                      )
                    }
                    download="ghaatu-mitai-enquiry.txt"
                  >
                    Download enquiry
                    <ArrowRight size={16} />
                  </Link>
                </div>
              )}
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}


/* =========================================================
   Shop URL Filters
   ========================================================= */

function ShopFilters({
  category,
  setCategory,
  setSavedOnly,
}: {
  category: string;
  setCategory: (value: string) => void;
  setSavedOnly: (value: boolean) => void;
}) {
  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search
    );

    const urlCategory =
      params.get('category') || '';

    if (cats.includes(urlCategory)) {
      setCategory(urlCategory);
    }

    if (params.get('saved')) {
      setSavedOnly(true);
    }
  }, [
    setCategory,
    setSavedOnly,
  ]);

  return (
    <div className="filters">
      {['All', ...cats].map(
        (categoryName) => (
          <button
            key={categoryName}
            className={
              'filter ' +
              (category ===
              categoryName
                ? 'selected'
                : '')
            }
            onClick={() =>
              setCategory(
                categoryName
              )
            }
          >
            {categoryName}
          </button>
        )
      )}
    </div>
  );
}