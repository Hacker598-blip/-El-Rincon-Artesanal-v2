// Slider básico para galería de producto (opcional)
function initSlider(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  const slides = container.querySelectorAll('img');
  let current = 0;
  slides.forEach((slide, i) => slide.style.display = i === 0 ? 'block' : 'none');
  // Simplificado, solo cambio manual
  window.sliderNext = () => {
    slides[current].style.display = 'none';
    current = (current + 1) % slides.length;
    slides[current].style.display = 'block';
  };
  window.sliderPrev = () => {
    slides[current].style.display = 'none';
    current = (current - 1 + slides.length) % slides.length;
    slides[current].style.display = 'block';
  };
}
