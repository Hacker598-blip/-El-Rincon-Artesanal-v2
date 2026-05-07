// js/components/navigation.js
document.addEventListener('DOMContentLoaded', async () => {
    // Detectar la raíz del sitio para rutas relativas correctas
    const basePath = window.location.pathname.includes('/pages/') ? '../' : '';

    async function loadInclude(id, url) {
        try {
            const resp = await fetch(basePath + url);
            if (resp.ok) {
                document.getElementById(id).innerHTML = await resp.text();
            }
        } catch (e) {
            console.warn('No se pudo cargar ' + basePath + url);
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
    if (window.cart && typeof window.cart.updateCartCount === 'function') {
        window.cart.updateCartCount();
    }
});
