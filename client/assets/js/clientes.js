function eliminarCliente(e) {
  debugger
  $(e).closest('tr').remove();
}

function editarCliente(e) {
  debugger
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
  debugger
  var editores = $(e).closest('tr').find('.editar');
  var valido = true;

  $.each(editores, function (i, editor) {
    //Si es la ultima columna
    if (editores.length - 1 !== i) {
      if (!$(editor).siblings('.error').hasClass('d-none')) {
        valido = false;
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