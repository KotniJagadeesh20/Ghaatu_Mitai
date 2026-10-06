'use client';

import { Fragment, useState, createContext, useContext } from 'react';

import {
  Truck,
} from 'lucide-react';

import { Toaster, toast } from 'sonner';

import { products } from '../src/data/products';

import {
  filterProducts,
  type FilteredProduct,
} from '../src/lib/filterProducts';
import {
  defaultSize,
  multiplier,
  packPrice,
} from '../src/lib/pricing';

import { ProductCard } from '../src/components/ProductCard';
import { MobileNavSheet } from '../src/components/MobileNavSheet';
import { SearchDialog } from '../src/components/SearchDialog';
import { CartSheet } from '../src/components/CartSheet';
import { EnquiryDialog } from '../src/components/EnquiryDialog';
import { BulkOrdersPage } from '../src/components/BulkOrdersPage';
import { WholesalePage } from '../src/components/WholesalePage';
import { Header } from '../src/components/Header';
import { Footer } from '../src/components/Footer';
import { ContactPage } from '../src/components/ContactPage';
import { HomePage } from '../src/components/HomePage';
import { ShopPage } from '../src/components/ShopPage';
import { AboutPage } from '../src/components/AboutPage';
import { ClosingSection } from '../src/components/ClosingSection';

import { useI18n } from '../src/i18n';
import type { EnquiryKind } from '../src/data/enquiries';
import type { CartItem } from '../src/types/cart';


/* =========================================================
   Shopping Context
   ========================================================= */

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
  const { t, tx } = useI18n();

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

  const [enquiry, setEnquiry] = useState<EnquiryKind | ''>('');
  const [draft, setDraft] = useState('');


  /* =======================================================
     Cart helpers
     ======================================================= */

  const sizeFor = (id: number) =>
    sizes[id] || defaultSize(products[id]);

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

    toast.success(t.toast.added(tx(products[id].name)));
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

  function toggleSaved(id: number) {
    setSaved((old) =>
      old.includes(id)
        ? old.filter((x) => x !== id)
        : [...old, id]
    );
  }

  function renderCard(
    product: FilteredProduct,
    variant: 'home' | 'shop' = 'home'
  ) {
    const size = sizeFor(product.id);

    return (
      <ProductCard
        key={product.id}
        variant={variant}
        product={product}
        isSaved={saved.includes(product.id)}
        size={size}
        price={packPrice(product, size)}
        onAdd={add}
        onToggleSaved={toggleSaved}
        onSizeChange={(id, value) =>
          setSizes((old) => ({ ...old, [id]: value }))
        }
      />
    );
  }

  function catalogue(all = false) {
    const list = filterProducts({
      all,
      category,
      query,
      savedOnly,
      saved,
    });

    return (
      <>
        <div className="products">
          {list.map((product) => renderCard(product))}
        </div>

        {!list.length && (
          <div className="empty">
            <h3>{t.catalogue.emptyTitle}</h3>

            <p>{t.catalogue.emptyText}</p>

            <button
              className="btn"
              onClick={() => {
                setCategory('All');
                setQuery('');
                setSavedOnly(false);
              }}
            >
              {t.catalogue.showAll}
            </button>
          </div>
        )}
      </>
    );
  }

  /* =======================================================
     Main UI
     ======================================================= */

  return (
    <>
      <Toaster position="bottom-center" containerAriaLabel={t.toast.region} />

      <div className="announcement">
        <span>
          {t.announcement.tagline.map((part, i) => (
            <Fragment key={part}>
              {i > 0 && <i>|</i>}
              {part}
            </Fragment>
          ))}
        </span>

        <span>
          <Truck size={14} />
          {t.announcement.shipping}
        </span>
      </div>

      <Header
        page={page}
        count={count}
        savedCount={saved.length}
        savedOnly={savedOnly}
        onOpenSearch={() => setSearch(true)}
        onOpenCart={() => setCartOpen(true)}
        onOpenMenu={() => setMenu(true)}
        onToggleSavedOnly={() => setSavedOnly(!savedOnly)}
      />

      <main>
        {page === 'home' && (
          <HomePage
            catalogue={catalogue}
            onEnquire={setEnquiry}
          />
        )}

        {page === 'shop' && (
          <ShopPage
            query={query}
            savedOnly={savedOnly}
            saved={saved}
            onQueryChange={setQuery}
            onSavedOnlyChange={setSavedOnly}
            renderCard={(product) => renderCard(product, 'shop')}
          />
        )}

        {page === 'about' && <AboutPage />}

        {page === 'bulk-orders' && (
          <BulkOrdersPage />
        )}

        {page === 'wholesale' && (
          <WholesalePage />
        )}

        {page === 'contact' && (
          <ContactPage onEnquire={setEnquiry} />
        )}
      </main>


      {/* =====================================================
          Closing
          ===================================================== */}

      {/* Bulk Orders and Wholesale end on their own CTA, so the
          shared closing banner would repeat it. */}
      {page !== 'bulk-orders' && page !== 'wholesale' && <ClosingSection />}


      {/* =====================================================
          Footer
          ===================================================== */}

      <Footer onEnquire={setEnquiry} />


      {/* =====================================================
          Shopping Cart
          ===================================================== */}

      <CartSheet
        open={cartOpen}
        onOpenChange={setCartOpen}
        cart={cart}
        count={count}
        total={total}
        multiplier={multiplier}
        onChangeQty={change}
        onRemove={(index) =>
          setCart(
            cart.filter(
              (_, key) =>
                key !==
                index
            )
          )
        }
        onReviewOrder={() => {
          setEnquiry(
            'Order summary'
          );
          setCartOpen(false);
        }}
      />


      {/* =====================================================
          Mobile Menu
          ===================================================== */}

      <MobileNavSheet
        open={menu}
        onOpenChange={setMenu}
      />


      {/* =====================================================
          Search
          ===================================================== */}

      <SearchDialog
        open={search}
        onOpenChange={setSearch}
        query={query}
        onQueryChange={setQuery}
        onAdd={add}
      />


      {/* =====================================================
          Enquiry Dialog
          ===================================================== */}

      <EnquiryDialog
        open={!!enquiry}
        onOpenChange={(open) => {
          if (!open) {
            setEnquiry('');
            setDraft('');
          }
        }}
        enquiry={enquiry}
        draft={draft}
        cart={cart}
        total={total}
        multiplier={multiplier}
        onDraftChange={setDraft}
        onEnquiryChange={setEnquiry}
      />
    </>
  );
}
