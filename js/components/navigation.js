// js/components/navigation.js
document.addEventListener('DOMContentLoaded', async () => {
    // Detectar si estamos dentro de la carpeta pages/
    const isInPagesFolder = window.location.pathname.includes('/pages/');
    const basePath = isInPagesFolder ? '../' : '';

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

    // --- CORRECCIÓN DE ENLACES DEL HEADER ---
    if (isInPagesFolder) {
        const header = document.getElementById('site-header');
        if (header) {
            // Corregir todos los enlaces del menú que apuntan a páginas internas
            const links = header.querySelectorAll('.nav-links a');
            links.forEach(link => {
                const href = link.getAttribute('href');
                if (href && (href.startsWith('pages/') || href === 'index.html')) {
                    link.setAttribute('href', '../' + href);
                }
            });
        }
    }

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
