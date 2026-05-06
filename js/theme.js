document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;
  
  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    // Reemplazar la hoja de tema dinámica
    const existing = document.querySelector('link[data-theme-link]');
    if (existing) {
      existing.href = `css/themes/${theme}.css`;
    }
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  };

  themeToggle.addEventListener('click', () => {
    const current = localStorage.getItem('theme') || 'dark';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  // Asegurar que el ícono coincida
  const saved = localStorage.getItem('theme') || 'dark';
  themeToggle.textContent = saved === 'dark' ? '☀️' : '🌙';
});
