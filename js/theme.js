// js/theme.js
// Función para aplicar un tema (cambia el atributo y recarga la hoja de estilos)
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    const existing = document.querySelector('link[data-theme-link]');
    if (existing) {
        existing.href = `css/themes/${theme}.css`;
    }

    // Actualizar el texto/icono del botón si ya existe
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
        toggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

// Delegación de eventos: escucha clicks en todo el documento y actúa si el target es el botón
document.addEventListener('click', (e) => {
    if (e.target.id === 'theme-toggle') {
        const current = localStorage.getItem('theme') || 'dark';
        applyTheme(current === 'dark' ? 'light' : 'dark');
    }
});

// Función expuesta para que navigation.js la ejecute cuando el header esté listo
function initThemeIcon() {
    const saved = localStorage.getItem('theme') || 'dark';
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
        toggle.textContent = saved === 'dark' ? '☀️' : '🌙';
    }
}
