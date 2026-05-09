// js/components/navigation.js
document.addEventListener('DOMContentLoaded', async () => {
    // Detectar si la página actual está dentro de la carpeta "pages/"
    const isInPagesFolder = window.location.pathname.includes('/pages/');

    // Base para cargar includes (relativa a la ubicación actual)
    const includeBase = isInPagesFolder ? '../' : '';

    async function loadInclude(id, url) {
        try {
            const resp = await fetch(includeBase + url);
            if (resp.ok) {
                document.getElementById(id).innerHTML = await resp.text();
            }
        } catch (e) {
            console.warn('No se pudo cargar ' + includeBase + url);
        }
    }

    await loadInclude('site-header', 'includes/header.html');
    await loadInclude('site-footer', 'includes/footer.html');

    // --- AJUSTE INTELIGENTE DE ENLACES DEL HEADER ---
    if (isInPagesFolder) {
        const header = document.getElementById('site-header');
        if (header) {
            const headerLinks = header.querySelectorAll('.nav-links a');
            headerLinks.forEach(link => {
                const originalHref = link.getAttribute('href');
                if (!originalHref) return;
                if (originalHref.startsWith('pages/') || originalHref === 'index.html') {
                    link.setAttribute('href', '../' + originalHref);
                }
            });
        }

        // --- AJUSTE INTELIGENTE DE ENLACES DEL FOOTER ---
        const footer = document.getElementById('site-footer');
        if (footer) {
            const footerLinks = footer.querySelectorAll('a');
            footerLinks.forEach(link => {
                const originalHref = link.getAttribute('href');
                if (!originalHref) return;
                // Solo ajustar rutas relativas que empiecen con "pages/" o sean "index.html"
                if (originalHref.startsWith('pages/') || originalHref === 'index.html') {
                    link.setAttribute('href', '../' + originalHref);
                }
                // Para sitemap.xml, también ajustar si es relativo
                if (originalHref === 'sitemap.xml') {
                    link.setAttribute('href', '../' + originalHref);
                }
            });
        }
    }

    // Menú móvil
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav-links');
    if (toggle && nav) {
        toggle.addEventListener('click', () => nav.classList.toggle('active'));
    }

    // Contador del carrito
    if (window.cart && typeof window.cart.updateCartCount === 'function') {
        window.cart.updateCartCount();
    }
});
