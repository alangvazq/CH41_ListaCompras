// El código va aquí ->
let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");

let txtNombre = document.getElementById("Name");
let txtNumber = document.getElementById("Number");

let alertaValidaciones = document.getElementById("alertValidaciones");
let alertaValidacionesTexto = document.getElementById("alertValidacionesTexto");

let contadorProductos = document.getElementById("contadorProductos");
let productosTotal = document.getElementById("productosTotal");
let precioTotal = document.getElementById("precioTotal");

let tablaListaCompras = document.getElementById("tablaListaCompras");

//* Lista de elementos
// let cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);
let cuerpoTabla = tablaListaCompras.querySelector("tbody");

isValid = true;
let precio;
let contador = 0;
let costoTotal = 0;
let totalEnProductos = 0;

// Aquí se almacena la información de la tabla
// let datos = new Array();
let datos = [];

function validarCantidad() {
  if (txtNumber.value.length == 0) {
    return false;
  }
  if (isNaN(txtNumber.value)) {
    return false;
  }
  if (Number(txtNumber.value) <= 0) {
    return false;
  }

  return true;
}

function getPrecio() {
  return Math.floor(Math.random() * 100 * 100) / 100;
}

btnAgregar.addEventListener("click", function (e) {
  e.preventDefault();
  alertaValidacionesTexto.innerHTML = "";
  alertaValidaciones.style.display = "none";
  txtNombre.style.border = "";
  txtNumber.style.border = "";

  // bandera
  isValid = true;

  if (txtNombre.value.length < 3) {
    alertaValidacionesTexto.innerHTML =
      "El <strong>nombre</strong> no es correcto <br>";
    alertaValidaciones.style.display = "block";
    txtNombre.style.border = "solid red medium";
    isValid = false;
  }

  if (!validarCantidad()) {
    alertaValidacionesTexto.innerHTML +=
      "El <strong>número</strong> no es correcto";
    alertaValidaciones.style.display = "block";
    txtNumber.style.border = "solid red medium";
    isValid = false;
  }

  if (isValid) {
    contador++;
    precio = getPrecio();
    let row = `<tr>
    <td>${contador}</td>
    <td>${txtNombre.value}</td>
    <td>${txtNumber.value}</td>
    <td>${precio}</td>
    </tr>`;

    let elemento = `{
    "id": ${contador},
    "nombre": "${txtNombre.value}",
    "cantidad": "${txtNumber.value}",
    "precio": ${precio}
    }`;

    datos.push(JSON.parse(elemento));

    localStorage.setItem("datos", JSON.stringify(datos));

    cuerpoTabla.insertAdjacentHTML("beforeend", row);
    contadorProductos.textContent = contador;
    totalEnProductos += parseFloat(txtNumber.value);
    costoTotal += precio * parseFloat(txtNumber.value);

    productosTotal.textContent = totalEnProductos;
    precioTotal.textContent = `${costoTotal.toFixed(2)}`;

    localStorage.setItem("contador", contador);
    localStorage.setItem("totalEnProductos", totalEnProductos);
    localStorage.setItem("costoTotal", costoTotal);

    txtNombre.value = "";
    txtNumber.value = "";
    txtNombre.focus();
  }

  return isValid;
});

btnClear.addEventListener("click", function (e) {
  e.preventDefault();

  txtNombre.value = "";
  txtNumber.value = "";

  alertaValidacionesTexto.innerHTML = "";
  alertaValidaciones.style.display = "none";
  txtNombre.style.border = "";
  txtNumber.style.border = "";

  cuerpoTabla.innerHTML = "";
  // contadorProductos.innerText = "0";
  // productosTotal.innerText = "0";
  // precioTotal.innerText = "$0";

  contador = 0;
  totalEnProductos = 0;
  costoTotal = 0;

  localStorage.setItem("contador", contador);
  localStorage.setItem("totalEnProductos", totalEnProductos);
  localStorage.setItem("costoTotal", costoTotal);
  datos = new Array();
  localStorage.removeItem("datos");
  contadorProductos.innerText = contador;
  productosTotal.innerText = totalEnProductos;
  precioTotal.innerText = `${costoTotal.toFixed(2)}`;
});

window.addEventListener("load", (e) => {
  e.preventDefault();
  if (this.localStorage.getItem("contador") != null) {
    contador = Number(this.localStorage.getItem("contador"));
  }
  if (this.localStorage.getItem("totalEnProductos") != null) {
    totalEnProductos = Number(this.localStorage.getItem("totalEnProductos"));
  }
  if (this.localStorage.getItem("costoTotal") != null) {
    costoTotal = Number(this.localStorage.getItem("costoTotal"));
  }
  if (this.localStorage.getItem("datos") != null) {
    datos = JSON.parse(this.localStorage.getItem("datos"));
    datos.forEach((r) => {
      let row = `<tr>
    <td>${r.id}</td>
    <td>${r.nombre}</td>
    <td>${r.cantidad}</td>
    <td>${r.precio}</td>
    </tr>`;

      //* Más eficiente
      cuerpoTabla.insertAdjacentHTML("beforeend", row);
      //* Reevalua todo el HTML del elemento
      // cuerpoTabla.innerHTML += row;
    });
  }
  contadorProductos.innerText = contador;
  productosTotal.innerText = totalEnProductos;
  precioTotal.innerText = `${costoTotal.toFixed(2)}`;
});
