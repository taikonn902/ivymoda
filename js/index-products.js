document.addEventListener("DOMContentLoaded", async () => {
  const productItems = document.querySelectorAll("#new-product .product-item");
  if (!productItems.length) return;

  try {
    const products = await loadProducts();

    productItems.forEach((item, index) => {
      const product = products[index];
      if (!product) return;

      const link = item.querySelector("a");
      if (link) {
        link.href = createProductLink(product.id);
      }
    });
  } catch (error) {
    console.error("Failed to bind product links:", error);
  }
});
