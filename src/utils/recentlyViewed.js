
const STORAGE_KEY = "cbgear_recently_viewed";
const MAX_ITEMS = 4;

export function getRecentlyViewed() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function addRecentlyViewed(product) {
  const previous = getRecentlyViewed();

  const updated = [
    product,
    ...previous.filter((item) => item.id !== product.id),
  ].slice(0, MAX_ITEMS);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

  // Báo cho component RecentlyViewed cập nhật ngay trong trang hiện tại.
  window.dispatchEvent(new Event("recentlyViewedUpdated"));
}
