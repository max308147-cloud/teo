// ==========================
// 🔐 LOGIN
// ==========================
function login() {
    let user = document.getElementById("user")?.value;
    let pass = document.getElementById("pass")?.value;

    if (user === "admin" && pass === "1234") {
        alert("Bienvenido");
        document.getElementById("login").style.display = "none";
    } else {
        alert("Datos incorrectos");
    }
}

// ==========================
// 📦 LOCAL STORAGE
// ==========================
function obtenerDatos() {
    return JSON.parse(localStorage.getItem("entrenamientos")) || [];
}

function guardarDatos(lista) {
    localStorage.setItem("entrenamientos", JSON.stringify(lista));
}

// ==========================
// 🚀 INICIO
// ==========================
document.addEventListener("DOMContentLoaded", () => {
    cargarEntrenamientos();
    actualizarStats();
});

// ==========================
// 📥 GUARDAR ENTRENAMIENTO
// ==========================
const form = document.getElementById("formEntrenamiento");

if (form) {
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const entrenamiento = {
            id: Date.now(),
            fecha: document.getElementById("fecha").value,
            rondas: parseInt(document.getElementById("rondas").value),
            duracion: parseInt(document.getElementById("duracion").value),
            calorias: parseInt(document.getElementById("calorias").value)
        };

        let lista = obtenerDatos();
        lista.push(entrenamiento);
        guardarDatos(lista);

        form.reset();
        cargarEntrenamientos();
        actualizarStats();
    });
}

// ==========================
// 📊 MOSTRAR TABLA
// ==========================
function cargarEntrenamientos() {
    const tabla = document.querySelector("table");
    if (!tabla) return;

    let lista = obtenerDatos();

    tabla.innerHTML = `
        <tr>
            <th>Fecha</th>
            <th>Rondas</th>
            <th>Duración</th>
            <th>Calorías</th>
            <th>Acción</th>
        </tr>
    `;

    lista.forEach(ent => {
        tabla.innerHTML += `
            <tr>
                <td>${ent.fecha}</td>
                <td>${ent.rondas}</td>
                <td>${ent.duracion} min</td>
                <td>${ent.calorias}</td>
                <td>
                    <button onclick="eliminar(${ent.id})">❌</button>
                </td>
            </tr>
        `;
    });
}

// ==========================
// ❌ ELIMINAR
// ==========================
function eliminar(id) {
    let lista = obtenerDatos().filter(ent => ent.id !== id);
    guardarDatos(lista);

    cargarEntrenamientos();
    actualizarStats();
}

// ==========================
// 📈 ESTADÍSTICAS
// ==========================
function actualizarStats() {
    const stats = document.querySelector(".stats");
    if (!stats) return;

    let lista = obtenerDatos();

    let totalCalorias = lista.reduce((sum, e) => sum + e.calorias, 0);
    let totalTiempo = lista.reduce((sum, e) => sum + e.duracion, 0);
    let totalGolpes = lista.reduce((sum, e) => sum + (e.rondas * 100), 0);

    stats.innerHTML = `
        <div class="card">
            <h3>🔥 Calorías</h3>
            <p>${totalCalorias} kcal</p>
        </div>
        <div class="card">
            <h3>⏱ Tiempo</h3>
            <p>${totalTiempo} min</p>
        </div>
        <div class="card">
            <h3>🥊 Golpes</h3>
            <p>${totalGolpes}</p>
        </div>
    `;

    dibujarGrafica(lista);
}

// ==========================
// 📊 GRÁFICA (CANVAS)
// ==========================
function dibujarGrafica(lista) {
    let canvas = document.getElementById("grafica");
    if (!canvas) return;

    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    lista.forEach((e, i) => {
        let x = i * 60 + 30;
        let y = canvas.height - e.calorias / 2;

        ctx.fillStyle = "#c62828";
        ctx.fillRect(x, y, 40, e.calorias / 2);

        ctx.fillStyle = "white";
        ctx.fillText(e.calorias, x, y - 5);
    });
}

// ==========================
// 🎨 EXTRA FUNCIONES
// ==========================

// Cambiar fondo
function cambiarFondo() {
    document.body.style.backgroundColor =
        document.body.style.backgroundColor === "black" ? "#111" : "black";
}

// Agrandar imagen
function agrandarImagen(img) {
    img.style.width = "90%";
}

// Validar formulario contacto
function validarFormulario() {
    let nombre = document.getElementById("nombre")?.value;
    let email = document.getElementById("email")?.value;

    if (!nombre || !email) {
        alert("Por favor completa todos los campos");
        return false;
    }

    alert("Formulario enviado correctamente");
    return true;
}
