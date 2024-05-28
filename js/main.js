// El código va aquí ->
let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");

let txtNombre = document.getElementById("Name");
let txtNumber = document.getElementById("Number");

let alertaValidaciones = document.getElementById("alertValidaciones");
let alertaValidacionesTexto = document.getElementById("alertValidacionesTexto");

function validarCantidad() {
  if (txtNumber.value.length == 0) {
    return false;
  }
  return true;
}

btnAgregar.addEventListener("click", function (e) {
  e.preventDefault();
  alertaValidaciones.style.display = "none";
  txtNombre.style.border = "";
  txtNumber.style.border = "";

  if (txtNombre.value.length < 3) {
    alertaValidacionesTexto.innerHTML =
      "El <strong>nombre</strong> no es correcto";
    alertaValidaciones.style.display = "block";
    txtNombre.style.border = "solid red medium";
  }

  if (!validarCantidad()) {
    alertaValidacionesTexto.innerHTML +=
      "El <strong>número</strong> no es correcto";
    alertaValidaciones.style.display = "block";
    txtNumber.style.border = "solid red medium";
  }
});

btnClear.addEventListener("click", function (e) {
  e.preventDefault();

  txtNombre.value = "";
  txtNumber.value = "";
});
