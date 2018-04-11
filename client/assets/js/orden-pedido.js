function valCantidad(e,min,max) {
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
  } else if (valor < min) {
    error.text('Mínimo: ' + min);
    error.removeClass('d-none');
    $(e).addClass('is-invalid');
    valido = false;
  } else if (valor > max) {
    error.text('Máximo: ' + max);
    error.removeClass('d-none');
    $(e).addClass('is-invalid');
    valido = false;
  } else {
    error.addClass('d-none');
    $(e).removeClass('is-invalid');
  }
  return valido;
}

function validarTodo() {
  var proveedor = $('#proveedor');
  var producto = $('#producto');
  var cantidad = document.getElementById('cantidad');

  var valido = true;

  if (!valSelect(proveedor)) {
    valido = false;
  }
  if (!valSelect(producto)) {
    valido = false;
  }
  if (!valCantidad(cantidad, 1, 99999999)) {
    valido = false;
  }

  if (valido) {
    var productos = $('#productosContainer').find('ul');
    productos.append('<li>'+producto.val()+'</li>');
    proveedor['0'].value = "Seleccione";
    producto['0'].value = "Seleccione";
    cantidad.value = 0;
    return valido;
  }
}

function agregarOP(){
debugger
  var valido = validarTodo();

  if(!valido){
    alert('Hay campos no válidos')
    return false;
  }else{
    llenarTabla(valido);
    return true;
  }
}