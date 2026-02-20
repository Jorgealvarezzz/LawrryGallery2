// LÓGICA DE LA PÁGINA

// Array con todos los productos
const products = [
    { id: 1, name: 'LV Trainer White Monogram', category: 'DESIGNER', price: 1299.99, image: './imagenes/img01_lv_white.jpeg', badge: 'HOT', sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10'] },
    { id: 2, name: 'Louboutin Black Suede Stars', category: 'LUXURY', price: 1599.99, image: './imagenes/img02_louboutin_stars.jpeg', badge: 'FIRE', sizes: ['6', '7', '8', '9', '10', '11'] },
    { id: 3, name: 'Travis Scott Cactus Jack', category: 'DESIGNER', price: 899.99, image: './imagenes/img03_travis_cactus.jpeg', badge: 'HOT', sizes: ['7', '8', '9', '10', '11', '12'] },
    { id: 4, name: 'Travis Cactus Reverse', category: 'DESIGNER', price: 749.99, image: './imagenes/img04_travis_cactus2.jpeg', badge: 'FIRE', sizes: ['6.5', '7', '8', '9', '10'] },
    { id: 5, name: 'Travis SB Dunk Low', category: 'SNEAKERS', price: 599.99, image: './imagenes/img05_travis_sb_dunk.jpeg', badge: 'LIMITED', sizes: ['7', '8', '9', '10', '11'] },
    { id: 6, name: 'Nike SB Street Low', category: 'SNEAKERS', price: 1399.99, image: './imagenes/img07_nike_sb_street.jpeg', badge: 'FIRE', sizes: ['7', '8', '9', '10'] },
    { id: 7, name: 'Salvatore Ferragamo', category: 'LUXURY', price: 89.99, image: './imagenes/img08_ferragamo.jpeg', badge: '', sizes: ['5', '6', '7', '8', '9', '10', '11', '12'] },
    { id: 8, name: 'Gucci Tennis Classic', category: 'DESIGNER', price: 74.99, image: './imagenes/img09_gucci_tennis.jpeg', badge: '', sizes: ['5', '6', '7', '8', '9', '10', '11'] },
    { id: 9, name: 'Honeybee Camel Boot', category: 'BOOTS', price: 229.99, image: './imagenes/img10_honeybee_camel.jpeg', badge: '', sizes: ['6', '7', '8', '9', '10', '11'] },
    { id: 10, name: 'Dior Python Premium', category: 'LUXURY', price: 449.99, image: './imagenes/img11_dior_python.jpeg', badge: 'HOT', sizes: ['7', '8', '9', '10', '11'] },
    { id: 11, name: 'Travis AJ1 Low Gold', category: 'DESIGNER', price: 2499.99, image: './imagenes/img12_travis_aj1_low.jpeg', badge: 'FIRE', sizes: ['7', '8', '9', '10'] },
    { id: 12, name: 'Bad Bunny Adidas Collab', category: 'DESIGNER', price: 1899.99, image: './imagenes/img13_badbunny_adidas.jpeg', badge: 'LIMITED', sizes: ['6', '7', '8', '9', '10', '11'] },
    { id: 13, name: 'Bad Bunny Benito Edition', category: 'DESIGNER', price: 129.99, image: './imagenes/img14_badbunny_benito.jpeg', badge: '', sizes: ['5', '6', '7', '8', '9', '10', '11'] },
    { id: 14, name: 'Travis AF1 Low Retro', category: 'SNEAKERS', price: 199.99, image: './imagenes/img15_travis_af1.jpeg', badge: '', sizes: ['6', '7', '8', '9', '10', '11', '12'] },
    { id: 15, name: 'Off-White Jordan Supreme', category: 'SNEAKERS', price: 189.99, image: './imagenes/img16_offwhite.jpeg', badge: 'HOT', sizes: ['6', '7', '8', '9', '10', '11'] },
    { id: 16, name: 'Dolce Gabanna Premium', category: 'LUXURY', price: 159.99, image: './imagenes/img17_dolce.jpeg', badge: '', sizes: ['5', '6', '7', '8', '9', '10'] },
    { id: 17, name: 'Golden Goose Deluxe', category: 'DESIGNER', price: 139.99, image: './imagenes/img18_goldengoose.jpeg', badge: 'HOT', sizes: ['6', '7', '8', '9', '10', '11'] },
    { id: 18, name: 'LV Mint Monogram', category: 'LUXURY', price: 119.99, image: './imagenes/img19_lv_mint.jpeg', badge: 'FIRE', sizes: ['5.5', '6', '7', '8', '9', '10', '11'] },
    { id: 19, name: 'LV Black & White Patent', category: 'DESIGNER', price: 179.99, image: './imagenes/img20_lv_blackwhite.jpeg', badge: '', sizes: ['6', '7', '8', '9', '10', '11', '12'] },
    { id: 20, name: 'Balenciaga Triple Runner', category: 'DESIGNER', price: 1599.99, image: './imagenes/img21_balenciaga.jpeg', badge: 'LIMITED', sizes: ['6', '7', '8', '9', '10', '11'] },
    { id: 21, name: 'Comme Des Garcons Converse', category: 'LUXURY', price: 1999.99, image: './imagenes/img22_cdg_converse.jpeg', badge: 'FIRE', sizes: ['7', '8', '9', '10'] },
    { id: 22, name: 'Travis AJ1 Yellow Retro', category: 'DESIGNER', price: 849.99, image: './imagenes/img23_travis_aj1_yellow.jpeg', badge: 'HOT', sizes: ['6', '7', '8', '9', '10'] },
    { id: 23, name: 'Limited Edition Colorway', category: 'LUXURY', price: 1299.99, image: './imagenes/img01_lv_white.jpeg', badge: 'LIMITED', sizes: ['7', '8', '9', '10', '11'] }
];

let cart = []; // Items en el carrito
let selectedSizes = {}; // Tallas seleccionadas por producto

// Cargar productos en la grilla con filtro opcional
function loadProducts(category = null) {
    // category = null (por defecto muestra todos)
    // category = 'DESIGNER' (solo muestra DESIGNER)
    // category = 'LUXURY' (solo muestra LUXURY)
    // category = 'SNEAKERS' (solo muestra SNEAKERS)
    
    const grid = document.getElementById('productsGrid');
    // Obtiene el div donde van los productos
    
    const productsToShow = category ? products.filter(p => p.category === category) : products;
    // Si hay categoría seleccionada: filtra products por esa categoría
    // Si NO: muestra todos los products
    // .filter(p => p.category === category) = busca solo los que coincidan
    
    grid.innerHTML = productsToShow.map(product => `
        <div class="product-card">
            <div class="product-badge">${product.badge}</div>
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.style.opacity='0.3'">
            </div>
            <div class="product-info">
                <div class="product-category">/// ${product.category}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="size-selector" id="sizes-${product.id}">
                    ${product.sizes.map(size => `
                        <button class="size-btn" onclick="selectSize(event, ${product.id}, '${size}')">${size}</button>
                    `).join('')}
                </div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    AGREGAR AL CARRITO
                </button>
            </div>
        </div>
    `).join('');
    // .map() = convierte cada producto en HTML
    // .join('') = junta todo sin saltos de línea
    // Resultado: grid lleno de tarjetas de productos
    
    document.getElementById('productos').scrollIntoView({ behavior: 'smooth' });
    // Auto-scroll suave a la sección productos cuando filtras
}

// Filtrar por categoría
function filterByCategory(category) {
    // Esta función se ejecuta cuando clickeas una categoría
    // category = la categoría seleccionada ('DESIGNER', 'LUXURY', 'SNEAKERS')
    loadProducts(category);
    // Llama loadProducts con la categoría = solo muestra esos productos
}

// Seleccionar talla del producto
function selectSize(e, productId, size) {
    selectedSizes[productId] = size;
    // Deseleccionar todos los botones de talla
    document.querySelectorAll(`#sizes-${productId} .size-btn`).forEach(btn => {
        btn.classList.remove('selected');
    });
    // Marcar el botón clickeado como seleccionado
    e.target.classList.add('selected');
}

// Agregar producto al carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const size = selectedSizes[productId];
    
    if (!size) {
        showNotification('⚠️ Selecciona una talla primero');
        return;
    }
    // Verificar si ya existe este producto con esta talla
    const existingItem = cart.find(item => item.id === productId && item.size === size);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, size: size, quantity: 1 });
    }
    
    updateCart();
    showNotification(`✓ ${product.name} agregado! 🔥`);
}


// Actualizar visualización del carrito
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartFooter = document.getElementById('cartFooter');
    const cartCount = document.getElementById('cartCount');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
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
        // Mostrar items en carrito
        cartItems.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
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

// Cambiar cantidad de producto
function updateQty(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) cart.splice(index, 1);
    updateCart();
}

// Borrar producto del carrito
function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

// Mostrar/ocultar carrito
function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('open');
}

// Procesar compra
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

// Suscribir a newsletter
function subscribeNewsletter(e) {
    e.preventDefault();
    showNotification('✓ ¡Suscripción exitosa! 🔥');
    e.target.reset();
}

// Mostrar notificación temporal
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    setTimeout(() => notification.classList.remove('show'), 3000);
}

// Scroll suave a secciones (links con #)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Cargar productos al iniciar
loadProducts();

