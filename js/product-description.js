function getProductIdFromQuery() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function setupQuantityControls() {
  const qtyText = document.getElementById("pd-quantity");
  const decBtn = document.getElementById("pd-decrease");
  const incBtn = document.getElementById("pd-increase");
  if (!qtyText || !decBtn || !incBtn) return;

  decBtn.addEventListener("click", () => {
    const current = Number(qtyText.textContent);
    qtyText.textContent = current > 1 ? current - 1 : 1;
  });

  incBtn.addEventListener("click", () => {
    qtyText.textContent = Number(qtyText.textContent) + 1;
  });
}

function setupAccordion() {
  document.querySelectorAll(".pd-accordion-trigger").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.parentElement.classList.toggle("active");
    });
  });
}

function renderProduct(product, allProducts) {
  const breadcrumbCategory = document.getElementById("pd-breadcrumb-category");
  const breadcrumbName = document.getElementById("pd-breadcrumb-name");
  const brand = document.getElementById("pd-brand");
  const title = document.getElementById("pd-title");
  const newPrice = document.getElementById("pd-price-new");
  const oldPrice = document.getElementById("pd-price-old");
  const discount = document.getElementById("pd-discount");
  const stock = document.getElementById("pd-stock");
  const desc = document.getElementById("pd-desc");
  const material = document.getElementById("pd-material");
  const policy = document.getElementById("pd-policy");
  const mainImage = document.getElementById("pd-main-image");
  const thumbList = document.getElementById("pd-thumb-list");
  const colorText = document.getElementById("pd-selected-color");
  const colorList = document.getElementById("pd-color-list");
  const sizeList = document.getElementById("pd-size-list");
  const relatedList = document.getElementById("pd-related-list");

  breadcrumbCategory.textContent = product.category || "Nữ";
  breadcrumbName.textContent = product.name;
  brand.textContent = product.brand || "IVY Fashion";
  title.textContent = product.name;
  newPrice.textContent = formatCurrency(product.newPrice);
  stock.textContent = `Còn ${product.stock || 0} sản phẩm`;
  desc.textContent = product.description || "";
  material.textContent = product.materialCare || "";
  policy.textContent = product.returnPolicy || "";

  if (product.oldPrice) {
    oldPrice.textContent = formatCurrency(product.oldPrice);
    oldPrice.classList.remove("hidden");
    const percent = calculateDiscountPercent(product.oldPrice, product.newPrice);
    if (percent) {
      discount.textContent = `-${percent}%`;
      discount.classList.remove("hidden");
    }
  } else {
    oldPrice.classList.add("hidden");
    discount.classList.add("hidden");
  }

  const images = product.images && product.images.length ? product.images : ["images/logo.png"];
  mainImage.src = images[0];
  mainImage.alt = product.name;
  thumbList.innerHTML = "";
  images.forEach((imgSrc, idx) => {
    const btn = document.createElement("button");
    btn.className = `pd-thumb ${idx === 0 ? "active" : ""}`;
    btn.innerHTML = `<img src="${imgSrc}" alt="${product.name}" class="w-full h-[150px] object-cover">`;
    btn.addEventListener("click", () => {
      thumbList.querySelectorAll(".pd-thumb").forEach((item) => item.classList.remove("active"));
      btn.classList.add("active");
      mainImage.src = imgSrc;
    });
    thumbList.appendChild(btn);
  });

  colorList.innerHTML = "";
  if (product.colors && product.colors.length) {
    colorText.textContent = product.colors[0].name;
    product.colors.forEach((color, idx) => {
      const btn = document.createElement("button");
      btn.className = `pd-color-item ${idx === 0 ? "active" : ""}`;
      btn.dataset.color = color.name;
      btn.style.background = color.hex;
      btn.addEventListener("click", () => {
        colorList.querySelectorAll(".pd-color-item").forEach((item) => item.classList.remove("active"));
        btn.classList.add("active");
        colorText.textContent = color.name;
      });
      colorList.appendChild(btn);
    });
  }

  sizeList.innerHTML = "";
  (product.sizes || []).forEach((size, idx) => {
    const btn = document.createElement("button");
    btn.className = `pd-size-item ${idx === 0 ? "active" : ""}`;
    btn.textContent = size;
    btn.addEventListener("click", () => {
      sizeList.querySelectorAll(".pd-size-item").forEach((item) => item.classList.remove("active"));
      btn.classList.add("active");
    });
    sizeList.appendChild(btn);
  });

  const related = allProducts.filter((item) => item.id !== product.id).slice(0, 4);
  relatedList.innerHTML = "";
  related.forEach((item) => {
    const li = document.createElement("li");
    li.className = "product-item relative";
    li.innerHTML = `
        <a href="${createProductLink(item.id)}" class="relative block w-full">
          <span class="badge-ribbon">NEW</span>
          <img src="${item.images[0]}" alt="${item.name}" class="h-[370px] w-full object-cover">
        </a>
        <p class="mt-2 mb-2 line-clamp-2 h-[50px] capitalize">${item.name}</p>
        <div class="flex justify-between items-center">
          <span class="text-xl font-semibold">${formatCurrency(item.newPrice)}</span>
        </div>
    `;
    relatedList.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  setupQuantityControls();
  setupAccordion();

  const id = getProductIdFromQuery();
  try {
    const products = await loadProducts();
    const product = products.find((item) => item.id === id) || products[0];
    if (!product) return;
    renderProduct(product, products);
  } catch (error) {
    console.error("Failed to render product page:", error);
  }
});
