function createProductCard(product) {
  const hasOldPrice = Boolean(product.oldPrice);

  return `
    <li class="product-item relative">
      <a href="${createProductLink(product.id)}" class="relative block w-full">
        <span class="badge-ribbon">NEW</span>
        <img src="${product.images?.[0] || "images/logo.png"}" alt="${product.name}" class="h-[370px] w-full object-cover" />
      </a>
      <div class="flex justify-between items-center">
        <div class="product-colors">
          ${(product.colors || [])
            .map(
              (color) =>
                `<button class="color-item" style="background:${color.hex}" data-color="${color.name}" title="${color.name}"></button>`
            )
            .join("")}
        </div>
      </div>

      <p class="mt-2 mb-2 line-clamp-2 h-[50px] capitalize">${product.name}</p>

      <div class="flex justify-between items-center gap-2">
        <div class="flex items-center gap-3 flex-wrap">
          <span class="text-lg font-semibold">${formatCurrency(product.newPrice)}</span>
          ${
            hasOldPrice
              ? `<span class="line-through text-sm text-gray-400">${formatCurrency(product.oldPrice)}</span>`
              : ""
          }
        </div>
        <a href="${createProductLink(product.id)}"
          class="w-[35px] h-[35px] bg-black border border-black rounded-tl-[10px] rounded-br-[10px] flex items-center justify-center hover:bg-white transition-all duration-300 group">
          <span class="material-symbols-outlined text-white group-hover:text-black text-[20px]">arrow_outward</span>
        </a>
      </div>
    </li>
  `;
}

function sortProducts(products, sortValue) {
  const sorted = [...products];
  if (sortValue === "price-asc") {
    sorted.sort((a, b) => a.newPrice - b.newPrice);
  } else if (sortValue === "price-desc") {
    sorted.sort((a, b) => b.newPrice - a.newPrice);
  } else if (sortValue === "name-asc") {
    sorted.sort((a, b) => a.name.localeCompare(b.name, "vi"));
  } else {
    sorted.sort((a, b) => b.id.localeCompare(a.id));
  }
  return sorted;
}

function isDarkHex(hex) {
  const value = (hex || "").replace("#", "");
  if (value.length !== 6) return false;
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance < 90;
}

function filterProducts(products, state) {
  return products.filter((product) => {
    const bySearch = product.name.toLowerCase().includes(state.search.toLowerCase());

    let byPrice = true;
    if (state.priceRange === "lt-800") byPrice = product.newPrice < 800000;
    if (state.priceRange === "800-1000") byPrice = product.newPrice >= 800000 && product.newPrice <= 1000000;
    if (state.priceRange === "gt-1000") byPrice = product.newPrice > 1000000;

    let byQuick = true;
    if (state.quickFilter === "sale") byQuick = Boolean(product.oldPrice);
    if (state.quickFilter === "in-stock") byQuick = (product.stock || 0) > 0;
    if (state.quickFilter === "size-m") byQuick = (product.sizes || []).includes("M");
    if (state.quickFilter === "color-dark") {
      byQuick = (product.colors || []).some((color) => isDarkHex(color.hex));
    }

    return bySearch && byPrice && byQuick;
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const listEl = document.getElementById("all-products-list");
  const countEl = document.getElementById("all-items-count");
  const searchEl = document.getElementById("filter-search");
  const sortEl = document.getElementById("sort-select");
  const priceEl = document.getElementById("price-select");
  const loadMoreBtn = document.getElementById("load-more-btn");
  const resetBtn = document.getElementById("reset-filter");
  const quickFilterEls = Array.from(document.querySelectorAll(".quick-filter"));

  if (!listEl || !countEl || !searchEl || !sortEl || !priceEl || !loadMoreBtn || !resetBtn) return;

  try {
    const products = await loadProducts();
    const state = {
      search: "",
      sort: "newest",
      priceRange: "all",
      quickFilter: "all",
      visibleCount: 10,
    };

    function setQuickFilterButtonActive() {
      quickFilterEls.forEach((button) => {
        const isActive = button.dataset.quickFilter === state.quickFilter;
        button.classList.toggle("bg-black", isActive);
        button.classList.toggle("text-white", isActive);
      });
    }

    function render() {
      const filtered = filterProducts(products, state);
      const sorted = sortProducts(filtered, state.sort);
      const visibleProducts = sorted.slice(0, state.visibleCount);

      countEl.textContent = `${filtered.length} sản phẩm`;

      if (!filtered.length) {
        listEl.innerHTML = `<li class="col-span-full text-center text-gray-500 py-10">Không có sản phẩm phù hợp bộ lọc.</li>`;
        loadMoreBtn.classList.add("hidden");
        return;
      }

      listEl.innerHTML = visibleProducts.map(createProductCard).join("");

      if (visibleProducts.length < filtered.length) {
        loadMoreBtn.classList.remove("hidden");
      } else {
        loadMoreBtn.classList.add("hidden");
      }
    }

    searchEl.addEventListener("input", (event) => {
      state.search = event.target.value.trim();
      state.visibleCount = 10;
      render();
    });

    sortEl.addEventListener("change", (event) => {
      state.sort = event.target.value;
      state.visibleCount = 10;
      render();
    });

    priceEl.addEventListener("change", (event) => {
      state.priceRange = event.target.value;
      state.visibleCount = 10;
      render();
    });

    quickFilterEls.forEach((button) => {
      button.addEventListener("click", () => {
        state.quickFilter = button.dataset.quickFilter || "all";
        state.visibleCount = 10;
        setQuickFilterButtonActive();
        render();
      });
    });

    loadMoreBtn.addEventListener("click", () => {
      state.visibleCount += 10;
      render();
    });

    resetBtn.addEventListener("click", () => {
      state.search = "";
      state.sort = "newest";
      state.priceRange = "all";
      state.quickFilter = "all";
      state.visibleCount = 10;
      searchEl.value = "";
      sortEl.value = "newest";
      priceEl.value = "all";
      setQuickFilterButtonActive();
      render();
    });

    setQuickFilterButtonActive();
    render();
  } catch (error) {
    console.error("Cannot render all items:", error);
    countEl.textContent = "Không tải được sản phẩm";
    listEl.innerHTML = `<li class="col-span-full text-center text-gray-500 py-10">Không có dữ liệu sản phẩm.</li>`;
  }
});
