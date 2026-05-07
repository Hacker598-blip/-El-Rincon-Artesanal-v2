document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('all-products');
    if (!container) return;

    if (!window.CONFIG || !window.CONFIG.products) {
        container.innerHTML = '<p>Error: no se pudo cargar la información de productos.</p>';
        return;
    }

    const productos = window.CONFIG.products; // o .filter(p => p.inStock) si quieres solo con stock

    if (productos.length === 0) {
        container.innerHTML = '<p>No hay productos disponibles en este momento.</p>';
        return;
    }

    container.innerHTML = productos.map(p => `
        <div class="product-card">
            <img src="${p.image}" alt="${p.name}" loading="lazy">
            <div class="product-info">
                <h3>${p.name}</h3>
                <p>${p.description}</p>
                <span class="price">$${p.price} CUP</span>
                <a href="product-detail.html?id=${p.id}" class="btn btn-primary">Ver</a>
            </div>
        </div>
    `).join('');
});
