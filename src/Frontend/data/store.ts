export interface Item {
  id: number;
  title: string;
  price: number;
  category: string;
  variant: 'light' | 'dark' | 'warm' | 'white';
  description?: string;
}

export interface CartItem {
  itemId: number;
  quantity: number;
  item: Item;
}

interface CartEntry {
  itemId: number;
  quantity: number;
}

const CART_KEY = 'store_cart_v1';
const CART_EVENT = 'store:cart-updated';

export const ITEMS: Item[] = [
  { id: 1, title: 'New Collection', price: 120, category: 'featured', variant: 'warm', description: 'Новая коллекция' },
  { id: 2, title: 'Item 1', price: 45, category: 'regular', variant: 'light', description: 'Качественный товар' },
  { id: 3, title: 'Item 2', price: 32, category: 'regular', variant: 'white', description: 'Стильный товар' },
  { id: 4, title: 'Ceramics', price: 88, category: 'featured', variant: 'light', description: 'Керамика' },
  { id: 5, title: 'Limited', price: 150, category: 'featured', variant: 'dark', description: 'Ограниченная серия' },
  { id: 6, title: 'Item 3', price: 24, category: 'regular', variant: 'white', description: 'Популярный товар' },
  { id: 7, title: 'Item 4', price: 28, category: 'regular', variant: 'light', description: 'Элегантный дизайн' },
  { id: 8, title: 'Item 5', price: 65, category: 'regular', variant: 'warm', description: 'Высокое качество' },
  { id: 9, title: 'Accessories', price: 40, category: 'featured', variant: 'dark', description: 'Аксессуары' },
  { id: 10, title: 'Tableware', price: 110, category: 'featured', variant: 'white', description: 'Посуда' },
  { id: 11, title: 'Premium Item', price: 200, category: 'premium', variant: 'dark', description: 'Премиум' },
  { id: 12, title: 'Basic Item', price: 15, category: 'regular', variant: 'light', description: 'Базовый товар' },
];

const isBrowser = () => typeof window !== 'undefined';

const emitCartUpdated = () => {
  if (!isBrowser()) return;
  window.dispatchEvent(new CustomEvent(CART_EVENT));
};

const readCart = (): CartEntry[] => {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeCart = (cart: CartEntry[]) => {
  if (!isBrowser()) return;
  window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  emitCartUpdated();
};

export const getItems = (category?: string): Item[] => {
  if (!category || category === 'all') return ITEMS;
  return ITEMS.filter((item) => item.category === category);
};

export const getCartItems = (): CartItem[] => {
  const cart = readCart();
  return cart
    .map((entry) => {
      const item = ITEMS.find((candidate) => candidate.id === entry.itemId);
      if (!item) return null;
      return {
        itemId: entry.itemId,
        quantity: entry.quantity,
        item,
      };
    })
    .filter((entry): entry is CartItem => entry !== null);
};

export const getCartCount = (): number => {
  return readCart().reduce((sum, entry) => sum + entry.quantity, 0);
};

export const addToCart = (itemId: number, quantity = 1) => {
  if (quantity <= 0) return;
  const cart = readCart();
  const existing = cart.find((entry) => entry.itemId === itemId);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ itemId, quantity });
  }

  writeCart(cart);
};

export const updateCartQuantity = (itemId: number, quantity: number) => {
  const cart = readCart();

  if (quantity <= 0) {
    writeCart(cart.filter((entry) => entry.itemId !== itemId));
    return;
  }

  const next = cart.map((entry) =>
    entry.itemId === itemId ? { ...entry, quantity } : entry,
  );
  writeCart(next);
};

export const removeCartItem = (itemId: number) => {
  const cart = readCart();
  writeCart(cart.filter((entry) => entry.itemId !== itemId));
};

export const clearCart = () => {
  writeCart([]);
};

export const subscribeCartUpdates = (onUpdate: () => void) => {
  if (!isBrowser()) return () => undefined;

  const handler = () => onUpdate();
  window.addEventListener(CART_EVENT, handler as EventListener);
  window.addEventListener('storage', handler);

  return () => {
    window.removeEventListener(CART_EVENT, handler as EventListener);
    window.removeEventListener('storage', handler);
  };
};
