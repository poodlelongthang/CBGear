
const STORAGE_KEY = "cbgear_cart";

export function getCart() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));

  // Thông báo cho các component đang hiển thị giỏ hàng
  window.dispatchEvent(new Event("cartUpdated"));
}

export function addToCart(product, quantity = 1) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
      quantity,
    });
  }

  saveCart(cart);
}

export function updateCartQuantity(productId, quantity) {
  const cart = getCart().map((item) =>
    item.id === productId
      ? { ...item, quantity: Math.max(1, quantity) }
      : item
  );

  saveCart(cart);
}

export function removeFromCart(productId) {
  saveCart(getCart().filter((item) => item.id !== productId));
}

export function clearCart() {
  saveCart([]);
}

export function getCartCount() {
  return getCart().reduce((total, item) => total + item.quantity, 0);
}
