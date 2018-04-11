function validarTodo() {
  var proveedor = $('#proveedor');
  var producto = $('#producto');
  var cantidad = $('#cantidad');

  var valido = true;

  if (!valSelect(proveedor)) {
    valido = false;
  }
  if (!valSelect(producto)) {
    valido = false;
  }
  if (!valNumber(numero, 1, 6)) {
    valido = false;
  }

  if (valido) {
    var productos = $('#productosContainer').find('ul');
    productos.append('<li>'+producto.val()+'</li>')
  } else {
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