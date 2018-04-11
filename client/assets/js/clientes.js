function eliminarCliente(e) {
  $(e).closest('tr').remove();
}

function editarCliente(e) {
  var editores = $(e).closest('tr').find('.editar');
  $.each(editores, function (i, editor) {
    //Si es la ultima columna
    if (editores.length - 1 === i) {
      $(editor).removeClass('d-none');
      $(editor).siblings('.btnEliminar').addClass('d-none');
      $(editor).siblings('.btnEditar').addClass('d-none');
    } else {
      $(editor).removeClass('d-none');
      $(editor).siblings('p').addClass('d-none');
    }
  })
}

function guardarCliente(e) {
  var editores = $(e).closest('tr').find('.editar');
  var valido = true;

  $.each(editores, function (i, editor) {
    //Si es la ultima columna
    if (editores.length - 1 !== i) {
      if (!$(editor).siblings('.error').hasClass('d-none')) {
        valido = false;
        alert('Debe ingresar todos los campos válidos');
        return false;
      }
    }
  })

  if(valido){
    $.each(editores, function (i, editor) {
      //Si es la ultima columna
      if (editores.length - 1 === i) {
        $(editor).addClass('d-none');
        $(editor).siblings('.btnEliminar').removeClass('d-none');
        $(editor).siblings('.btnEditar').removeClass('d-none');
      } else {
        $(editor).addClass('d-none');
        var texto = $(editor).val();
        $(editor).siblings('p').text(texto);
        $(editor).siblings('p').removeClass('d-none');
      }
    })
  }
}

function validarTodo(){

  var rut = $('#rut');
  var nombres = $('#nombres');
  var apellidos = $('#apellidos');
  var email = $('#email');
  var numero = $('#numero');

  var valido = true;

  if(!valTexto(rut, 10, 10)){
    valido = false;  
  }
  if(!valTexto(nombres, 10, 10)){
    valido = false;  
  }
  if(!valTexto(apellidos, 10, 10)){
    valido = false;  
  }
  if(!valTexto(email, 10, 20)){
    valido = false;  
  }
  if(!valTexto(numero, 10, 10)){
    valido = false;  
  }

  if(valido){
      return cliente = {
        "rut":rut.val(),
        "nombres": nombres.val(),
        "apellidos": apellidos.val(),
        "email": email.val(),
        "numero": numero.val()
      }
  }else{
    return valido;
  }
}

function agregarCliente(){

  var valido = validarTodo();

  if(!valido){
    alert('Hay campos no válidos')
    return false;
  }else{
    llenarTablaCliente(valido);
    return true;
  }
}

function llenarTablaCliente(cliente){
  debugger;
  var tabla = $('#tablaClientes');
  var largoTabla = tabla.find('tbody tr').length;
  var fila = '<tr>';
  fila += '<th scope="row">'+(largoTabla+1)+'</th>';
  fila += '<td>';
  fila += '<p>'+cliente.rut+'</p>';
  fila += '<input type="text" value="'+cliente.rut+'" class="form-control editar d-none" onkeyup="valTexto(this,10,20)">';
  fila += '<label class="error text-danger d-none "></label>';
  fila += '</td>';
  fila += '<td>';
  fila += '<p>'+cliente.nombres+'</p>';
  fila += '<input type="text" value="'+cliente.nombres+'" class="form-control editar d-none" onkeyup="valTexto(this,10,20)">';
  fila += '<label class="error text-danger d-none "></label>';
  fila += '</td>';
  fila += '<td>';
  fila += '<p>'+cliente.apellidos+'</p>';
  fila += '<input type="text" value="'+cliente.apellidos+'" class="form-control editar d-none" onkeyup="valTexto(this,10,20)">';
  fila += '<label class="error text-danger d-none "></label>';
  fila += '</td>';
  fila += '<td>';
  fila += '<input type="text" value="'+cliente.email+'" class="form-control editar d-none">';
  fila += '<label class="error text-danger d-none "></label>';
  fila += '<p>'+cliente.email+'</p>';
  fila += '</td>';
  fila += '<td>';
  fila += '<p>'+cliente.numero+'</p>';
  fila += '<input type="text" value="'+cliente.numero+'" class="form-control editar d-none" onkeyup="valNumber(this,5,10)">';
  fila += '<label class="error text-danger d-none "></label>';
  fila += '</td>';
  fila += '<td class="d-flex">';
  fila += '<a  class="btn btn-primary editar d-none cursor-pointer" onclick="guardarCliente(this)" data-toggle="tooltip" data-placement="top" title="Guardar cliente"><i class="fas fa-check-circle"></i></a>';
  fila += '<a  class="btn btn-danger btnEliminar mr-2 cursor-pointer" onclick="eliminarCliente(this)" data-toggle="tooltip" data-placement="top" title="Eliminar cliente"><i class="fas fa-trash-alt"></i></a>';
  fila += '<a  class="btn btn-secondary btnEditar cursor-pointer" onclick="editarCliente(this)" data-toggle="tooltip" data-placement="top" title="Editar cliente"><i class="fas fa-edit"></i></a>';
  fila += '</td>';
  fila += '</tr>';

  tabla.find('tbody').append(fila);
  alert('Se ha agregado el cliente');
}