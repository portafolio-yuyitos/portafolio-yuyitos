function valCantidad(e, min, max) {
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
    var precio = $('#precio')['0'].value * cantidad.value;
    var productos = $('#productosContainer').find('tbody');
    var str = '<tr class="border-bottom">';
    str += '<td class="p-2">' + proveedor.val() + '</td>';
    str += '<td>' + producto.val() + '</td>';
    str += '<td>' + cantidad.value + '</td>';
    str += '<td class="precio">' + precio + '</td></tr>';

    productos.append(str);
    proveedor['0'].value = "Seleccione";
    producto['0'].value = "Seleccione";
    $('#precio')['0'].value = 1000;
    cantidad.value = 0;
    return valido;
  }
}

function agregarOP() {
  var valido = validarTodo();

  if (!valido) {
    alert('Hay campos no válidos')
    return false;
  } else {
    sumarTotal();
    return true;
  }
}

function sumarTotal() {
  var productos = $('#productosContainer').find('tbody tr');//Busca todos los productos
  var total = 0;
  $.each(productos, function (i, producto) {//Recorre los productos
    var precio = $(producto).find('.precio').text();//Busca solo los precios por su clase .precio
    total = parseInt(precio) + total;//Suma los precios de cada producto
  });
  $('#total strong').text(total);//pinta en total
}

function generarOP() {
  debugger
  var total = $('#total strong');//Total
  if (total.text() === "0") {//Si es 0
    alert('Debes agregar al menos un producto');
    return false;
  } else {//Si es mas de cero
    var OP = {
      'id': 123321,
      'total':total.text()
    }
    llenarTabla(OP);
  }
}

function llenarTabla(OP) {
  var tabla = $('#tablaOP');
  var largoTabla = tabla.find('tbody tr').length;
  var fila = '<tr>';
  fila += '<th scope="row">' + (largoTabla + 1) + '</th>';
  fila += '<td>' + OP.id + '</td>';
  fila += '<td>' + OP.total + '</td>';
  fila += '<td><a href="#" class="btn btn-danger mr-2" onclick="eliminarOP()">Eliminar</a>';
  fila += '<a href="#" class="btn btn-secondary" onclick="EditarOP">Editar</a>';
  fila += '</td></tr>';
  tabla.find('tbody').append(fila);
}