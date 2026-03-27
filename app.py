# ============================================================
#  app.py  —  LAWRY Gallery: Tienda de Sneakers & Streetwear
#  Fusión del proyecto del 1er parcial con Flask + SQLite CRUD
#  Autor: Jorgealvarezzz
# ============================================================

from flask import Flask, render_template, request, redirect, url_for, jsonify
import sqlite3
import os

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH  = os.path.join(BASE_DIR, "lawry.db")


# ── Conexión a la base de datos ──────────────────────────────
def get_db():
    """
    Abre la conexión a SQLite.
    row_factory = sqlite3.Row permite acceder a columnas por nombre
    en lugar de por índice numérico.
    """
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


# ── Inicialización de la BD con los productos originales ─────
def init_db():
    """
    Crea la tabla 'productos' y la llena con los 23 sneakers
    del proyecto original del primer parcial.
    Solo inserta datos si la tabla está vacía.
    """
    conn = get_db()
    conn.execute("""
        CREATE TABLE IF NOT EXISTS productos (
            id       INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre   TEXT    NOT NULL,
            categoria TEXT   NOT NULL,
            precio   REAL    NOT NULL,
            imagen   TEXT    NOT NULL,
            badge    TEXT    DEFAULT '',
            tallas   TEXT    NOT NULL
        )
    """)

    count = conn.execute("SELECT COUNT(*) FROM productos").fetchone()[0]
    if count == 0:
        # Datos originales del script.js del primer parcial
        # tallas se guarda como string separado por comas
        productos_iniciales = [
            ("LV Trainer White Monogram",    "DESIGNER", 1299.99, "img01_lv_white.jpeg",        "HOT",     "7,7.5,8,8.5,9,9.5,10"),
            ("Louboutin Black Suede Stars",  "LUXURY",   1599.99, "img02_louboutin_stars.jpeg",  "FIRE",    "6,7,8,9,10,11"),
            ("Travis Scott Cactus Jack",     "DESIGNER",  899.99, "img03_travis_cactus.jpeg",    "HOT",     "7,8,9,10,11,12"),
            ("Travis Cactus Reverse",        "DESIGNER",  749.99, "img04_travis_cactus2.jpeg",   "FIRE",    "6.5,7,8,9,10"),
            ("Travis SB Dunk Low",           "SNEAKERS",  599.99, "img05_travis_sb_dunk.jpeg",   "LIMITED", "7,8,9,10,11"),
            ("Nike SB Street Low",           "SNEAKERS", 1399.99, "img07_nike_sb_street.jpeg",   "FIRE",    "7,8,9,10"),
            ("Salvatore Ferragamo",          "LUXURY",     89.99, "img08_ferragamo.jpeg",        "",        "5,6,7,8,9,10,11,12"),
            ("Gucci Tennis Classic",         "DESIGNER",   74.99, "img09_gucci_tennis.jpeg",     "",        "5,6,7,8,9,10,11"),
            ("Honeybee Camel Boot",          "BOOTS",     229.99, "img10_honeybee_camel.jpeg",   "",        "6,7,8,9,10,11"),
            ("Dior Python Premium",          "LUXURY",    449.99, "img11_dior_python.jpeg",      "HOT",     "7,8,9,10,11"),
            ("Travis AJ1 Low Gold",          "DESIGNER", 2499.99, "img12_travis_aj1_low.jpeg",   "FIRE",    "7,8,9,10"),
            ("Bad Bunny Adidas Collab",      "DESIGNER", 1899.99, "img13_badbunny_adidas.jpeg",  "LIMITED", "6,7,8,9,10,11"),
            ("Bad Bunny Benito Edition",     "DESIGNER",  129.99, "img14_badbunny_benito.jpeg",  "",        "5,6,7,8,9,10,11"),
            ("Travis AF1 Low Retro",         "SNEAKERS",  199.99, "img15_travis_af1.jpeg",       "",        "6,7,8,9,10,11,12"),
            ("Off-White Jordan Supreme",     "SNEAKERS",  189.99, "img16_offwhite.jpeg",         "HOT",     "6,7,8,9,10,11"),
            ("Dolce Gabbana Premium",        "LUXURY",    159.99, "img17_dolce.jpeg",            "",        "5,6,7,8,9,10"),
            ("Golden Goose Deluxe",          "DESIGNER",  139.99, "img18_goldengoose.jpeg",      "HOT",     "6,7,8,9,10,11"),
            ("LV Mint Monogram",             "LUXURY",    119.99, "img19_lv_mint.jpeg",          "FIRE",    "5.5,6,7,8,9,10,11"),
            ("LV Black & White Patent",      "DESIGNER",  179.99, "img20_lv_blackwhite.jpeg",    "",        "6,7,8,9,10,11,12"),
            ("Balenciaga Triple Runner",     "DESIGNER", 1599.99, "img21_balenciaga.jpeg",       "LIMITED", "6,7,8,9,10,11"),
            ("Comme Des Garcons Converse",   "LUXURY",   1999.99, "img22_cdg_converse.jpeg",     "FIRE",    "7,8,9,10"),
            ("Travis AJ1 Yellow Retro",      "DESIGNER",  849.99, "img23_travis_aj1_yellow.jpeg","HOT",     "6,7,8,9,10"),
            ("Limited Edition Colorway",     "LUXURY",   1299.99, "img01_lv_white.jpeg",         "LIMITED", "7,8,9,10,11"),
        ]
        conn.executemany("""
            INSERT INTO productos (nombre, categoria, precio, imagen, badge, tallas)
            VALUES (?, ?, ?, ?, ?, ?)
        """, productos_iniciales)

    conn.commit()
    conn.close()


# ════════════════════════════════════════════════════════════
#  ENDPOINTS
# ════════════════════════════════════════════════════════════

# ── READ: Tienda principal ───────────────────────────────────
@app.route("/")
def index():
    """
    GET /  —  Página principal de la tienda.
    Carga todos los productos desde la BD y los pasa al template.
    También soporta filtro por categoría (?categoria=DESIGNER)
    y búsqueda (?q=travis).
    """
    conn = get_db()
    categoria = request.args.get("categoria", "")
    busqueda  = request.args.get("q", "")

    if categoria and busqueda:
        rows = conn.execute(
            "SELECT * FROM productos WHERE categoria=? AND nombre LIKE ? ORDER BY id DESC",
            (categoria, f"%{busqueda}%")
        ).fetchall()
    elif categoria:
        rows = conn.execute(
            "SELECT * FROM productos WHERE categoria=? ORDER BY id DESC", (categoria,)
        ).fetchall()
    elif busqueda:
        rows = conn.execute(
            "SELECT * FROM productos WHERE nombre LIKE ? ORDER BY id DESC",
            (f"%{busqueda}%",)
        ).fetchall()
    else:
        rows = conn.execute("SELECT * FROM productos ORDER BY id").fetchall()

    categorias = conn.execute(
        "SELECT DISTINCT categoria FROM productos ORDER BY categoria"
    ).fetchall()
    conn.close()

    # Convertimos tallas de string "7,8,9" a lista ["7","8","9"] para Jinja2
    productos = []
    for r in rows:
        p = dict(r)
        p["tallas_lista"] = p["tallas"].split(",")
        productos.append(p)

    return render_template(
        "index.html",
        productos=productos,
        categorias=categorias,
        categoria_actual=categoria,
        busqueda=busqueda
    )


# ── READ: API JSON para JavaScript ──────────────────────────
@app.route("/api/productos")
def api_productos():
    """
    GET /api/productos  —  Retorna todos los productos como JSON.
    JavaScript lo usa para cargar productos sin recargar la página.
    """
    conn = get_db()
    categoria = request.args.get("categoria", "")
    if categoria:
        rows = conn.execute(
            "SELECT * FROM productos WHERE categoria=? ORDER BY id", (categoria,)
        ).fetchall()
    else:
        rows = conn.execute("SELECT * FROM productos ORDER BY id").fetchall()
    conn.close()

    productos = []
    for r in rows:
        p = dict(r)
        p["tallas_lista"] = p["tallas"].split(",")
        productos.append(p)

    return jsonify(productos)


# ── READ: Detalle de producto ────────────────────────────────
@app.route("/producto/<int:id>")
def detalle(id):
    conn = get_db()
    row = conn.execute("SELECT * FROM productos WHERE id=?", (id,)).fetchone()
    conn.close()
    if not row:
        return redirect(url_for("index"))
    p = dict(row)
    p["tallas_lista"] = p["tallas"].split(",")
    return render_template("detalle.html", producto=p)


# ── Panel de administración ──────────────────────────────────
@app.route("/admin")
def admin():
    """
    GET /admin  —  Panel de administración CRUD.
    Muestra todos los productos con opciones de editar y eliminar.
    """
    conn = get_db()
    productos = conn.execute("SELECT * FROM productos ORDER BY id").fetchall()
    conn.close()
    return render_template("admin.html", productos=productos)


# ── CREATE: formulario nuevo producto ────────────────────────
@app.route("/admin/nuevo")
def nuevo():
    return render_template("formulario.html", producto=None, accion="crear")


# ── CREATE: guardar producto ─────────────────────────────────
@app.route("/admin/crear", methods=["POST"])
def crear():
    nombre    = request.form.get("nombre", "").strip()
    categoria = request.form.get("categoria", "").strip()
    precio    = request.form.get("precio", "0")
    imagen    = request.form.get("imagen", "").strip()
    badge     = request.form.get("badge", "").strip()
    tallas    = request.form.get("tallas", "").strip()

    try:
        precio = float(precio)
    except ValueError:
        precio = 0.0

    if not nombre:
        return redirect(url_for("nuevo"))

    conn = get_db()
    conn.execute("""
        INSERT INTO productos (nombre, categoria, precio, imagen, badge, tallas)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (nombre, categoria, precio, imagen, badge, tallas))
    conn.commit()
    conn.close()
    return redirect(url_for("admin"))


# ── UPDATE: formulario editar ────────────────────────────────
@app.route("/admin/editar/<int:id>")
def editar(id):
    conn = get_db()
    producto = conn.execute("SELECT * FROM productos WHERE id=?", (id,)).fetchone()
    conn.close()
    if not producto:
        return redirect(url_for("admin"))
    return render_template("formulario.html", producto=dict(producto), accion="editar")


# ── UPDATE: guardar cambios ──────────────────────────────────
@app.route("/admin/actualizar/<int:id>", methods=["POST"])
def actualizar(id):
    nombre    = request.form.get("nombre", "").strip()
    categoria = request.form.get("categoria", "").strip()
    precio    = request.form.get("precio", "0")
    imagen    = request.form.get("imagen", "").strip()
    badge     = request.form.get("badge", "").strip()
    tallas    = request.form.get("tallas", "").strip()

    try:
        precio = float(precio)
    except ValueError:
        precio = 0.0

    conn = get_db()
    conn.execute("""
        UPDATE productos SET nombre=?, categoria=?, precio=?, imagen=?, badge=?, tallas=?
        WHERE id=?
    """, (nombre, categoria, precio, imagen, badge, tallas, id))
    conn.commit()
    conn.close()
    return redirect(url_for("admin"))


# ── DELETE: eliminar producto ────────────────────────────────
@app.route("/admin/eliminar/<int:id>", methods=["POST"])
def eliminar(id):
    conn = get_db()
    conn.execute("DELETE FROM productos WHERE id=?", (id,))
    conn.commit()
    conn.close()
    return redirect(url_for("admin"))


# ════════════════════════════════════════════════════════════
if __name__ == "__main__":
    init_db()
    app.run(debug=True)
