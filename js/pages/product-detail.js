document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  const product = CONFIG.products.find(p => p.id === id);
  if (!product) {
    document.querySelector('main').innerHTML = '<h2>Producto no encontrado</h2>';
    return;
  }
  document.getElementById('product-name').textContent = product.name;
  document.getElementById('product-price').textContent = `$${product.price} CUP`;
  document.getElementById('product-desc').textContent = product.description;
  document.getElementById('product-img').src = product.image;
  document.getElementById('product-img').alt = product.name;
  // Descuentos
  const discountInfo = document.getElementById('discount-info');
  discountInfo.innerHTML = CONFIG.discounts.tiers.map(t => 
    `<li>${t.minQty}+ unidades: ${t.discount*100}% de descuento</li>`
  ).join('');

  const qtyInput = document.getElementById('quantity');
  const addBtn = document.getElementById('add-to-cart');
  addBtn.addEventListener('click', () => {
    const qty = parseInt(qtyInput.value) || 1;
    cart.add(product, qty);
    alert('Añadido al carrito');
  });

  initSlider('.gallery');
});
