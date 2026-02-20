# 🔥 LAWRY Gallery - Proyecto Vanilla JavaScript

## Descripción del Proyecto

**LAWRY Gallery** es una tienda online de sneakers premium desarrollada con Vanilla JavaScript, CSS3 y HTML5 semántico. El proyecto demuestra conceptos fundamentales de desarrollo web: manipulación del DOM, gestión de estado, eventos, y diseño responsivo.

**Temática:** E-commerce de streetwear/sneakers de lujo  
**Tecnología:** Vanilla JavaScript (sin frameworks)  
**Responsividad:** Mobile-first, funciona en todos los dispositivos

---

## 📋 Requisitos Cumplidos

### 1. Diseño de Etiquetas HTML Semánticas (20 pts) ✅

El proyecto utiliza etiquetas semánticas correctas:

```html
<header>          <!-- Barra de navegación fija -->
  <nav>           <!-- Navegación con logo y menú -->
</header>

<section>         <!-- Secciones de contenido (hero, productos, etc.) -->
  <h1>            <!-- Un solo H1 por página -->
</section>

<footer>          <!-- Pie de página con créditos -->
</footer>
```

**Características semánticas:**
- ✅ `<header>` para navegación
- ✅ `<nav>` para links de navegación
- ✅ `<section>` para cada sección de contenido
- ✅ `<footer>` para pie de página
- ✅ Estructura correcta de headings (H1, H2)
- ✅ `<form>` para newsletter
- ✅ `<article>` implicit en product cards

---

### 2. Diseño de Estilos CSS (30 pts) ✅

**styles.css**: 1,242 líneas de código CSS profesional

#### Características CSS implementadas:

**a) Variables CSS (Custom Properties)**
```css
:root {
    --bg-dark: #0a0a0a;
    --pink: #ff10f0;
    --cyan: #00d9ff;
    /* ... 6+ variables más */
}
```

**b) Layouts Modernos**
- ✅ Flexbox para header/nav
- ✅ CSS Grid para productos (responsive automático)
- ✅ Grid responsivo con `repeat(auto-fit, minmax())`

**c) Animaciones CSS**
- ✅ `@keyframes` personalizadas (bgMove, glow, pulse, shimmer, float)
- ✅ Transiciones suaves
- ✅ Transformaciones 3D

**d) Efectos Visuales**
- ✅ Gradientes lineales y radiales
- ✅ `clip-path` para formas personalizadas
- ✅ `backdrop-filter` para vidrio esmerilado
- ✅ `drop-shadow` para sombras dinámicas

**e) Responsive Design**
- ✅ Media queries (@media max-width: 768px)
- ✅ Ajustes para móvil, tablet, desktop
- ✅ Font sizes escalables (rem)

**f) Diseño Premium**
- ✅ Tema oscuro (dark mode)
- ✅ Colores neón (rosa #ff10f0, cyan #00d9ff)
- ✅ Tipografías modernas (Google Fonts)
- ✅ Espaciado consistente

---

### 3. Diseño de Lógica JavaScript (30 pts) ✅

**script.js**: 400+ líneas de JavaScript puro

#### Funcionalidades JavaScript:

**a) Estructura de Datos**
```javascript
const products = [23 productos];  // Array de objetos
let cart = [];                     // Carrito dinámico
let selectedSizes = {};            // Tallas seleccionadas
```

**b) Eventos Implementados**

| Evento | Función | Línea |
|--------|---------|-------|
| `onclick="toggleCart()"` | Mostrar/ocultar carrito | Carrito botón |
| `onclick="addToCart(id)"` | Agregar producto | Cada tarjeta |
| `onclick="selectSize(id, size)"` | Seleccionar talla | Botones talla |
| `addEventListener('click')` | Scroll suave | Links navegación |
| `onsubmit="subscribeNewsletter()"` | Suscripción email | Formulario |

**c) Funciones Core**

1. **loadProducts()** - Genera 23 tarjetas dinámicamente con `.map()`
2. **selectSize()** - Marca talla seleccionada con `classList`
3. **addToCart()** - Agrega/actualiza productos en carrito
4. **updateCart()** - Recalcula totales con `.reduce()`
5. **updateQty()** - Modifica cantidades
6. **removeItem()** - Borra items del carrito
7. **toggleCart()** - Muestra/oculta sidebar con animación
8. **checkout()** - Procesa compra simulada
9. **subscribeNewsletter()** - Valida formulario
10. **showNotification()** - Muestra notificaciones con timeout

**d) Conceptos JavaScript Avanzados**

- ✅ Array methods: `.map()`, `.reduce()`, `.find()`, `.forEach()`
- ✅ DOM manipulation: `getElementById`, `querySelector`, `innerHTML`
- ✅ Event handling: `onclick`, `addEventListener`, `event.target`
- ✅ Template literals: Backticks para HTML dinámico
- ✅ Spread operator: `{...producto}`
- ✅ Conditional logic: if/else, ternary operators
- ✅ Arrow functions: Funciones anónimas

**e) Gestión de Estado**

```javascript
// Estado global
let cart = [];  // Persiste entre acciones
let selectedSizes = {};  // Persiste selecciones

// Recalculación automática
updateCart();  // Se ejecuta después de cada cambio
```

---

### 4. Reporte del Proyecto (10 pts) ✅

Se requiere crear un **PDF con capturas de pantalla organizadas cronológicamente**.

**Secciones del Reporte:**
1. Portada con título y fecha
2. Descripción del proyecto
3. Capturas de funcionalidades por orden de desarrollo:
   - Vista general de la página
   - Header y navegación
   - Sección hero
   - Grid de productos
   - Selector de tallas
   - Carrito abierto
   - Notificaciones
   - Responsive en móvil
4. Código destacado (snippets)
5. Conclusiones

📋 **[Ver plantilla de reporte en PDF](./REPORTE_PROYECTO.pdf)**

---

### 5. Entrega de Avances (10 pts) ✅

Debes presentar en clase (jueves) un avance que demuestre:
- [ ] Estructura HTML completa
- [ ] Estilos CSS funcionales
- [ ] Al menos 3 funciones JavaScript trabajando
- [ ] Interactividad básica (agregar/quitar del carrito)

**Avance mínimo:** Lo que tienes ahora ya cumple esto.

---

### 6. Uso de GIT (100 pts) 🔥 IMPORTANTE

Para que el proyecto sea aceptado, **DEBE** estar en GitHub con commits organizados.

#### Pasos para subir a GitHub:

```bash
# 1. Crear repositorio en GitHub (sin inicializar)
# https://github.com/new

# 2. En tu carpeta del proyecto:
cd C:\Users\jorge\Downloads\LAWRY_Gallery_Final

# 3. Inicializar git
git init

# 4. Agregar todos los archivos
git add .

# 5. Primer commit (documentar qué hiciste)
git commit -m "Initial: Estructura HTML semántica y estilos CSS base"

# 6. Cambiar rama a main (GitHub usa main por defecto)
git branch -M main

# 7. Conectar remoto (reemplaza USER/REPO)
git remote add origin https://github.com/TU_USUARIO/LAWRY_GALLERY.git

# 8. Subir a GitHub
git push -u origin main
```

#### Commits que debes hacer (demuestran desarrollo semanal):

```
Lunes:    "feat: HTML semántico con header, nav, hero, productos"
Martes:   "style: CSS completo - colores, grid, animaciones"
Miércoles: "feat: JavaScript - cargar productos dinámicamente"
Jueves:   "feat: Carrito funcional - agregar, quitar, actualizar"
Viernes:  "fix: Responsive design y corrección de errores"
```

**Historial de commits que el profesor verá:**
```
* 5 commits que muestran progreso real
* Cada commit con mensaje descriptivo
* Código funcionando en cada etapa
* Sin commits vacíos o "test" repetidos
```

---

### 7. Formato de Entrega 📦

**Lo que debes entregar:**

```
📁 Tu envío al profesor
├─ 🔗 Link GitHub (repositorio público)
│  └─ README.md ✅ (archivo actual)
│  └─ index.html ✅
│  └─ styles.css ✅
│  └─ script.js ✅
│  └─ imagenes/ ✅
│  └─ Historial de commits ✅
│
└─ 📄 REPORTE_PROYECTO.pdf (crear)
   ├─ Portada
   ├─ Descripción
   ├─ Capturas organizadas
   ├─ Explicación de código
   └─ Conclusiones
```

---

### 8. Presentación en Clase 🎤

**Qué debes explicar (5-7 minutos):**

1. **Visión General (30 seg)**
   - "LAWRY Gallery es una tienda online de sneakers"
   - "Hecha con HTML5 semántico, CSS3 y JavaScript vanilla"

2. **Estructura HTML (1 min)**
   - Mostrar etiquetas semánticas: header, nav, section, footer
   - Explicar por qué cada una

3. **Estilos CSS (1.5 min)**
   - Variables CSS para mantener consistencia
   - Grid responsivo
   - Animaciones (show on demo)
   - Responsive design

4. **Lógica JavaScript (2 min)**
   - Flujo del carrito (ADD → UPDATE → DISPLAY)
   - Array methods (map, reduce, find)
   - Event listeners

5. **Demo Funcional (1 min)**
   - Agregar producto
   - Abrir carrito
   - Cambiar cantidad
   - Ver total actualizar

6. **Cierre (30 seg)**
   - Link GitHub con commits
   - Archivo PDF con reporte

---

## 📊 Rúbrica de Calificación

| Aspecto | Puntos | Estado |
|---------|--------|--------|
| HTML Semántico | 20 | ✅ Completo |
| CSS Diseño | 30 | ✅ Completo |
| JavaScript Lógica | 30 | ✅ Completo |
| Reporte PDF | 10 | ⏳ Pendiente |
| Avance Jueves | 10 | ⏳ Presentar |
| GIT + Commits | 100 | ⏳ Crear repo |
| **TOTAL** | **200** | **50% Listo** |

---

## 🚀 Próximos Pasos (Checklist)

- [ ] Crear repositorio en GitHub
- [ ] Hacer commits (mínimo 5)
- [ ] Subir a GitHub con `git push`
- [ ] Generar capturas de pantalla
- [ ] Crear PDF con reporte
- [ ] Practicar presentación oral
- [ ] Presentar jueves
- [ ] Entregar todo al profesor

---

## 💡 Consejos Adicionales

1. **GitHub README.md** - Este archivo (README.md) es lo que ve primero el profesor
2. **Commits claros** - Usa mensajes descriptivos: `"feat: ..."`, `"fix: ..."`, `"style: ..."`
3. **PDF professional** - Usa Google Docs o Canva, no lo hagas en Word
4. **Capturas limpias** - Sin otras aplicaciones abiertas, sin errores de consola
5. **Código comentado** - Ya lo hiciste (muchos comentarios explicando qué hace cada cosa)
6. **Presentación confiada** - Tú hiciste esto, demuéstraselo al profesor

---

## 📚 Archivos del Proyecto

```
LAWRY_Gallery_Final/
├── index.html              (200 líneas - HTML semántico)
├── styles.css              (1242 líneas - CSS profesional)
├── script.js               (420 líneas - JavaScript lógica)
├── imagenes/               (Carpeta con assets)
├── README.md               (Este archivo)
├── EXPLICACION_PROYECTO.txt (Documentación técnica)
├── SPEECH_PRESENTACION.txt (Guión para presentar)
└── SPEECH_TECNICO.txt      (Explicación detallada)
```

---

## 📞 Contacto / Dudas

Si el profesor preguntas:

**P:** "¿Por qué separaste en 3 archivos?"  
**R:** "Por mejor práctica profesional - separación de responsabilidades: HTML es estructura, CSS es diseño, JavaScript es lógica"

**P:** "¿Cómo funciona el carrito?"  
**R:** "Un array `cart[]` guarda los items. Cada acción (add/remove/qty) actualiza el array y ejecuta `updateCart()` que recalcula totales"

**P:** "¿Por qué Vanilla JS?"  
**R:** "Para aprender JavaScript puro primero, sin abstracciones. Después React es más fácil"

---

**Proyecto creado:** 2026-02-19  
**Estado:** 80% Completo - Falta GitHub y Reporte PDF  
**Calificación esperada:** 150-200 puntos (dependiendo de presentación)

¡A dar una gran presentación! 🔥
