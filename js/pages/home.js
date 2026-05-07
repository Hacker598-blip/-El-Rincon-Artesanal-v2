// js/pages/home.js
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('featured-list');
  if (!container) return;

  const featured = CONFIG.products.filter(p => p.featured && p.inStock);
  container.innerHTML = featured.map(p => `
    <div class="product-card">
      <div class="image-wrapper">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
      </div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <span class="price">$${p.price} CUP</span>
        <a href="pages/product-detail.html?id=${p.id}" class="btn btn-primary">Ver</a>
      </div>
    </div>
  `).join('');
});
