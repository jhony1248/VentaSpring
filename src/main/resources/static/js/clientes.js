// Call the dataTables jQuery plugin
$(document).ready(function() {
  cargarClientes();
  $('#TbClientes').DataTable();
});

async function cargarClientes(){

  const request = await fetch('api/clientes', {
    method: 'GET',
    headers: getHeaders()   
  });
  
  const clientesJS = await request.json();
  let ListCliHtml = '';

  for (let cliente of clientesJS){

    let cli = cliente.id_Cliente;
    let btnEliminar = '<a href="#" onclick="eliminarCliente(\'' + cli + '\')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';
    let btnEditar = '<a href="clienteEditar.html?cli=' + encodeURIComponent(cli) + '" class="btn btn-primary btn-circle btn-sm ml-2"><i class="fas fa-edit"></i></a>';

    let telefonoTxt = cliente.telefono == null ? '-' : cliente.telefono;
    let clienteHtml = '<tr> <td>'+ cliente.id_Cliente +'</td><td>'+ cliente.nombres +' '+ cliente.apellidos +'</td><td>'
      + cliente.sexo +'</td><td>'+ + cliente.cedula +'</td><td>'+ cliente.email +'</td><td>'+ telefonoTxt +
        '</td> <td>'+ cliente.direccion+'</td><td>'+ btnEliminar + '    ' + btnEditar +'</td></tr>';
    ListCliHtml += clienteHtml;
  }

  //codigo para cargar los datos de los usuarios en la tabla
  $('#TbClientes').DataTable().clear().draw();
  $('#TbClientes').DataTable().rows.add($(ListCliHtml)).draw();

}

async function eliminarCliente(cliente){  
  if(!confirm('¿Desea eliminar este cliente?')){
    return;
  }
  const request = await fetch('api/clientes/'+cliente , {
    method: 'DELETE',
    headers: getHeaders()   
  });
  
  location.reload();
}

function getHeaders(){
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': localStorage.token 
  }
}

//validar solo letras
function validarEntradaUsuario(input) {
  // Eliminar caracteres especiales y números, permitiendo letras con tildes
  input.value = input.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚ]/g, '');
}

//validar solo numeros
function validarSoloNumeros(input) {
  // Verificar si el valor ingresado contiene caracteres que no son números
  if ( /\D/.test(input.value) ) {
    // Si contiene caracteres que no son números, eliminarlos
    input.value = input.value.replace(/\D/g, '');
  }
}

function validarCampos(inputId, minLength, fieldName) {
  // Obtener el valor del campo
  var fieldValue = document.getElementById(inputId).value.trim();

  // Validar que la longitud del texto no supere los dígitos solicitados
  if (fieldValue.length > minLength) {
    // Limitar el campo a los minimos caracteres solicitados
    document.getElementById(inputId).value = fieldValue.slice(0, minLength);
  }

  // Obtener el contenedor del mensaje de error
  var errorContainer = document.getElementById('error' + inputId.substring(3));

  // Validar si el campo está vacío o tiene una longitud menor que la mínima requerida
  if (fieldValue === '') {
    // Mostrar mensaje de error
    errorContainer.innerHTML = '*El campo ' + fieldName + ' no debe estar vacio';
  }else if (fieldValue.length < minLength) {
    errorContainer.innerHTML = '*El campo ' + fieldName + ' debe tener al menos ' + minLength + ' caracteres.';
  }else {
    // Limpiar el mensaje de error si la longitud es válida y activar el boton
    errorContainer.innerHTML = '';
  }
}