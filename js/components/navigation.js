document.addEventListener('DOMContentLoaded', async () => {
  // Cargar includes
  async function loadInclude(id, url) {
    try {
      const resp = await fetch(url);
      if (resp.ok) {
        document.getElementById(id).innerHTML = await resp.text();
      }
    } catch (e) {
      console.warn('No se pudo cargar ' + url);
    }
  }

  await loadInclude('site-header', 'includes/header.html');
  await loadInclude('site-footer', 'includes/footer.html');

  // Activar menú mobile
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('active'));
  }

  // Actualizar contador del carrito
  if (window.cart) window.cart.updateCartCount();
});
