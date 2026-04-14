async function loadProducts() {
  const response = await fetch("data/products.json");
  if (!response.ok) {
    throw new Error("Cannot load product data");
  }
  return response.json();
}

function formatCurrency(value) {
  return Number(value || 0).toLocaleString("vi-VN") + "đ";
}

function calculateDiscountPercent(oldPrice, newPrice) {
  if (!oldPrice || !newPrice || oldPrice <= newPrice) return null;
  return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
}

function createProductLink(id) {
  return `product-description.html?id=${encodeURIComponent(id)}`;
}
