// ********** VALIDACIONES **********

/// e = elemento, 
/// min = minima cantidad de texto, 
/// max = maxima cantidad de texto
function valTexto(e, min, max) {
  let valor = $(e).val();
  var error = $(e).siblings('.error');
  if (valor.trim() === "") {
    error.text('No debe estar vacío');
    error.removeClass('d-none');
  } else if (valor.length < min) {
    error.text('Mínimo de caracteres: ' + min);
    error.removeClass('d-none');
  } else if (valor.length > max) {
    error.text('Máximo de caracteres: ' + max);
    error.removeClass('d-none');
  } else {
    error.addClass('d-none');
  }
}

function valNumber(e, min, max) {
  let valor = e.value;
  var reg = new RegExp('^[0-9]+$');
  var error = $(e).siblings('.error');
  if (valor.trim() === "") {
    error.text('No debe estar vacío');
    error.removeClass('d-none');
  } else if (!reg.test(valor)) {
    e.value = valor.substring(0, valor.length - 1)//quitar ultimo caracter
    error.text('Ingrese sólo números');
    error.removeClass('d-none');
  } else if (valor.length < min) {
    error.text('Mínimo de caracteres: ' + min);
    error.removeClass('d-none');
  } else if (valor.length > max) {
    error.text('Máximo de caracteres: ' + max);
    error.removeClass('d-none');
  } else {
    error.addClass('d-none');
  }
}