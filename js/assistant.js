function startAssistant() {
  // Preguntas secuenciales con respuestas
  const preguntas = [
    {
      pregunta: '¿Qué tipo de planta o uso le quieres dar?',
      opciones: ['Interior', 'Exterior', 'Suculenta', 'Bonsái'],
      campo: 'category'
    },
    {
      pregunta: '¿Qué estilo prefieres?',
      opciones: ['Rústico', 'Moderno', 'Minimalista', 'Colorido'],
      campo: 'style'
    },
    {
      pregunta: '¿Qué tamaño necesitas?',
      opciones: ['Pequeño', 'Mediano', 'Grande'],
      campo: 'size'
    }
  ];

  let respuestas = {};
  let paso = 0;

  function mostrarPregunta() {
    if (paso >= preguntas.length) {
      mostrarResultados();
      return;
    }
    const q = preguntas[paso];
    const cont = document.getElementById('assistant-content');
    cont.innerHTML = `<h3>${q.pregunta}</h3>`;
    q.opciones.forEach(op => {
      const btn = document.createElement('button');
      btn.className = 'btn btn-outline assistant-option';
      btn.textContent = op;
      btn.onclick = () => {
        respuestas[q.campo] = op.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        paso++;
        mostrarPregunta();
      };
      cont.appendChild(btn);
    });
  }

  function mostrarResultados() {
    const filtrados = CONFIG.products.filter(p => {
      return (!respuestas.category || p.category === respuestas.category) &&
             (!respuestas.style || p.style === respuestas.style) &&
             (!respuestas.size || p.size === respuestas.size) &&
             p.inStock;
    });
    const cont = document.getElementById('assistant-content');
    if (filtrados.length === 0) {
      cont.innerHTML = '<p>No encontramos piezas exactas, pero te sugerimos revisar nuestro catálogo.</p>';
    } else {
      cont.innerHTML = filtrados.map(p => `
        <div class="product-card">
          <img src="${p.image}" alt="${p.name}">
          <div class="product-info">
            <h3>${p.name}</h3>
            <p>${p.description}</p>
            <span class="price">$${p.price} CUP</span>
            <button class="btn btn-primary" onclick="addToCartFromAssistant(${p.id})">Añadir al carrito</button>
          </div>
        </div>
      `).join('');
    }
  }

  mostrarPregunta();
}

function addToCartFromAssistant(id) {
  const product = CONFIG.products.find(p => p.id === id);
  if (product) cart.add(product, 1);
  alert('Producto añadido al carrito');
}
