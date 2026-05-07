// js/pages/products.js
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('all-products');
    if (!container) return;

    // Mostrar todos los productos en stock (o todos si no se filtra por stock)
    const productos = CONFIG.products.filter(p => p.inStock); // puedes quitar el filtro si quieres mostrar todos

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

    // El asistente NO se inicia automáticamente.
    // Solo se activa al hacer clic en el botón "Asistente de selección" (ya definido en products.html)
});
