/* ============================================================
   static/js/script.js  —  LAWRY Gallery JavaScript
   Adaptado del primer parcial para trabajar con Flask.
   Los productos ya NO vienen de un array JS — vienen del HTML
   generado por Jinja2. El carrito sigue siendo JS puro.
   ============================================================ */

// ── Estado global del carrito ────────────────────────────────
let cart = [];          // Array de productos en el carrito
let selectedSizes = {}; // Tallas seleccionadas por producto: { id: "9.5" }


// ── Seleccionar talla ────────────────────────────────────────
function selectSize(e, productId, size) {
    /*
     productId: ID del producto (viene de Jinja2 {{ p['id'] }})
     size: la talla clickeada (viene de Jinja2 {{ talla }})
     e.target: el botón que se clickeó
    */
    selectedSizes[productId] = size;

    // Quitamos la clase 'selected' de todos los botones de este producto
    document.querySelectorAll(`#sizes-${productId} .size-btn`).forEach(btn => {
        btn.classList.remove('selected');
    });

    // Marcamos solo el botón clickeado
    e.target.classList.add('selected');
}


// ── Agregar al carrito ───────────────────────────────────────
function addToCart(productId, nombre, precio, imagen) {
    /*
     A diferencia del primer parcial donde buscábamos el producto
     en el array JS, ahora los datos vienen como parámetros directamente
     desde el HTML generado por Jinja2 en el onclick del botón.
    */
    const size = selectedSizes[productId];

    if (!size) {
        showNotification('⚠️ Selecciona una talla primero');
        return;
    }

    // Verificamos si ya existe este producto+talla en el carrito
    const existingItem = cart.find(item => item.id === productId && item.size === size);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id:       productId,
            name:     nombre,
            price:    precio,
            image:    imagen,
            size:     size,
            quantity: 1
        });
    }

    updateCart();
    showNotification(`✓ ${nombre} agregado! 🔥`);
}


// ── Actualizar visualización del carrito ─────────────────────
function updateCart() {
    const cartItems  = document.getElementById('cartItems');
    const cartFooter = document.getElementById('cartFooter');
    const cartCount  = document.getElementById('cartCount');

    // Calculamos totales con reduce()
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Actualizamos el badge del botón de carrito
    cartCount.textContent = totalItems;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <p style="font-size: 4rem; margin-bottom: 1rem;">🛒</p>
                <p>Tu carrito está vacío</p>
            </div>
        `;
        cartFooter.style.display = 'none';
    } else {
        // Generamos el HTML de cada item en el carrito
        cartItems.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <img src="/static/imagenes/${item.image}"
                     alt="${item.name}"
                     class="cart-item-image"
                     onerror="this.style.opacity='0.3'">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-size">Talla: ${item.size}</div>
                    <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                    <div class="qty-controls">
                        <button class="qty-btn" onclick="updateQty(${index}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQty(${index}, 1)">+</button>
                    </div>
                </div>
                <button class="remove-item" onclick="removeItem(${index})">×</button>
            </div>
        `).join('');

        cartFooter.style.display = 'block';
        document.getElementById('cartTotal').textContent = `$${totalPrice.toFixed(2)}`;
    }
}


// ── Cambiar cantidad ─────────────────────────────────────────
function updateQty(index, change) {
    cart[index].quantity += change;
    // Si la cantidad llega a 0, eliminamos el item del array
    if (cart[index].quantity <= 0) cart.splice(index, 1);
    updateCart();
}


// ── Eliminar item del carrito ─────────────────────────────────
function removeItem(index) {
    // splice(index, 1) elimina 1 elemento en la posición index
    cart.splice(index, 1);
    updateCart();
}


// ── Mostrar / ocultar carrito ─────────────────────────────────
function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('open');
}


// ── Checkout ─────────────────────────────────────────────────
function checkout() {
    if (cart.length === 0) return;
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    showNotification(`¡Pedido confirmado! Total: $${total.toFixed(2)} 🔥`);
    setTimeout(() => {
        cart = [];
        updateCart();
        toggleCart();
    }, 2000);
}


// ── Newsletter ────────────────────────────────────────────────
function subscribeNewsletter(e) {
    e.preventDefault();  // Evita que el form recargue la página
    showNotification('✓ ¡Suscripción exitosa! 🔥');
    e.target.reset();
}


// ── Notificación temporal ─────────────────────────────────────
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    setTimeout(() => notification.classList.remove('show'), 3000);
}


// ── Scroll suave para links con # ────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});
