$(document).ready(function () {
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })
});

// ********** VALIDACIONES ************

/// e = elemento, 
/// min = minima cantidad de texto, 
/// max = maxima cantidad de texto
function valTexto(e, min, max) {
  let valor = $(e).val();
  var error = $(e).siblings('.error');
  var valido = true;

  if (valor.trim() === "") {
    error.text('No debe estar vacío');
    error.removeClass('d-none');
    $(e).addClass('is-invalid');
    valido = false;
  } else if (valor.length < min) {
    error.text('Mínimo de caracteres: ' + min);
    error.removeClass('d-none');
    $(e).addClass('is-invalid');
    valido = false;
  } else if (valor.length > max) {
    error.text('Máximo de caracteres: ' + max);
    error.removeClass('d-none');
    $(e).addClass('is-invalid');
    valido = false;
  } else {
    error.addClass('d-none');
    $(e).removeClass('is-invalid');
  }
  return valido;
}

function valNumber(e, min, max) {
  let valor = e.value;
  var reg = new RegExp('^[0-9]+$');
  var error = $(e).siblings('.error');
  var valido = true;

  if (valor.trim() === "") {
    error.text('No debe estar vacío');
    error.removeClass('d-none');
    $(e).addClass('is-invalid');
    valido = false;
  } else if (!reg.test(valor)) {
    e.value = valor.substring(0, valor.length - 1)//quitar ultimo caracter
    error.text('Ingrese sólo números');
    error.removeClass('d-none');
    $(e).addClass('is-invalid');
    valido = false;
  } else if (valor.length < min) {
    error.text('Mínimo de caracteres: ' + min);
    error.removeClass('d-none');
    $(e).addClass('is-invalid');
    valido = false;
  } else if (valor.length > max) {
    error.text('Máximo de caracteres: ' + max);
    error.removeClass('d-none');
    $(e).addClass('is-invalid');
    valido = false;
  } else {
    error.addClass('d-none');
    $(e).removeClass('is-invalid');
  }
  return valido;
}

function valEmail(e) {
  var valor = $(e).val();
  var error = $(e).siblings('.error');

  if (!valor) {
    error.text('No debe estar vacío');
    error.removeClass('d-none');
    $(e).addClass('is-invalid');
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(valor)) {
    error.text('Debe ingresar email válido');
    error.removeClass('d-none');
    $(e).addClass('is-invalid');
  } else {
    error.addClass('d-none');
    $(e).removeClass('is-invalid');
  }
}

function checkRut(rut) {
  //debugger;
  // Despejar Puntos
  var valor = rut.value.replace('.', '');
  // Despejar Guión
  valor = valor.replace('-', '');

  // Aislar Cuerpo y Dígito Verificador
  cuerpo = valor.slice(0, -1);
  dv = valor.slice(-1).toUpperCase();

  // Formatear RUN
  rut.value = cuerpo + '-' + dv

  //p de error
  var error = $(rut).siblings('.error');

  // Si no cumple con el mínimo ej. (n.nnn.nnn)
  if (cuerpo.length < 7) {
    error.text('RUT Incompleto');
    error.removeClass('d-none');
    $(rut).addClass('is-invalid');
    return false;
  }

  // Calcular Dígito Verificador
  suma = 0;
  multiplo = 2;

  // Para cada dígito del Cuerpo
  for (i = 1; i <= cuerpo.length; i++) {

    // Obtener su Producto con el Múltiplo Correspondiente
    index = multiplo * valor.charAt(cuerpo.length - i);

    // Sumar al Contador General
    suma = suma + index;

    // Consolidar Múltiplo dentro del rango [2,7]
    if (multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }

  }

  // Calcular Dígito Verificador en base al Módulo 11
  dvEsperado = 11 - (suma % 11);

  // Casos Especiales (0 y K)
  dv = (dv == 'K') ? 10 : dv;
  dv = (dv == 0) ? 11 : dv;

  // Validar que el Cuerpo coincide con su Dígito Verificador
  if (dvEsperado != dv) {
    error.text('RUT Inválido');
    error.removeClass('d-none');
    $(rut).addClass('is-invalid');
    return false;
  }

  // Si todo sale bien, eliminar errores (decretar que es válido)
  rut.setCustomValidity('');
  error.addClass('d-none');
  $(rut).removeClass('is-invalid');
  return true;
}