// js/theme.js
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // Buscar el enlace dinámico que ya existe (tiene data-theme-link)
    const existing = document.querySelector('link[data-theme-link]');
    if (existing) {
        // Obtener la ruta base del href actual (ej. 'css/themes/' o '../css/themes/')
        const currentHref = existing.getAttribute('href');
        const basePath = currentHref.substring(0, currentHref.lastIndexOf('/') + 1);
        existing.href = basePath + theme + '.css';
    }

    // Actualizar el ícono del botón si ya existe
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
        toggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

// Delegación de eventos para el botón (funciona aunque se cargue después)
document.addEventListener('click', (e) => {
    if (e.target.id === 'theme-toggle') {
        const current = localStorage.getItem('theme') || 'dark';
        applyTheme(current === 'dark' ? 'light' : 'dark');
    }
});

// Función que sincroniza el ícono del botón después de cargar el header
function initThemeIcon() {
    const saved = localStorage.getItem('theme') || 'dark';
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
        toggle.textContent = saved === 'dark' ? '☀️' : '🌙';
    }
}
