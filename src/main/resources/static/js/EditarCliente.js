$(document).ready(function () {

  let params = new URLSearchParams(window.location.search);
  let cli = params.get('cli');

  if (cli == null || cli === "") {

    window.location.href = "404.html";
  } else {
    CargarClienteEditar(cli)
  }

});

let EmailCliente;
let cedulaCliente;
let idCli;

async function CargarClienteEditar(cli) {

  const request = await fetch('api/clientes/' + cli, {
    method: 'GET',
    headers: getHeaders()
  });
  const clienteData = await request.json();

  // Obtener referencias a los campos del formulario
  const txtNombre = document.getElementById('txtNombre');
  const txtApellido = document.getElementById('txtApellido');
  const selectSexo = document.getElementById('txtSexo');
  const txtCedula = document.getElementById('txtCedula');
  const txtEmail = document.getElementById('txtEmail');
  const txtTelefono = document.getElementById('txtTelefono');
  const txtDireccion = document.getElementById('txtDireccion');

  // Llenar los campos del formulario con los datos del cliente
  txtNombre.value = clienteData.nombres;
  txtApellido.value = clienteData.apellidos;
  txtEmail.value = clienteData.email;
  txtCedula.value = clienteData.cedula;
  txtTelefono.value = clienteData.telefono;
  txtDireccion.value = clienteData.direccion;
  EmailCliente = clienteData.email;
  cedulaCliente = clienteData.cedula;
  idCli = cli;

  for (let option of selectSexo.options) {
    // Verificar si el valor de la opción es igual al sexo del cliente
    if (option.value === clienteData.sexo) {
      // Establecer el atributo selected si el valor coincide
      option.selected = true;
    }
  }

}

async function EditarUsuario() {

  let datos = {}
  datos.id_Cliente = idCli;
  datos.nombres = document.getElementById('txtNombre').value;
  datos.apellidos = document.getElementById('txtApellido').value;
  datos.sexo = document.getElementById('txtSexo').value;
  datos.cedula = document.getElementById('txtCedula').value;
  datos.email = document.getElementById('txtEmail').value;
  datos.telefono = document.getElementById('txtTelefono').value;
  datos.direccion = document.getElementById('txtDireccion').value;

  const cedulaExistente = await verificarCedulaExistente(datos.cedula);
  const emailExistente = await verificarEmailExistente(datos.email);
  const ValidarCedulaE = await validarCedulaEcu(datos.cedula);

  const errorContainerced = document.getElementById('errorCedula');
  const errorContainerEma = document.getElementById('errorEmail');
  
  // Agregar eventos de escucha para limpiar los mensajes de error cuando se modifiquen los campos
  document.getElementById('txtCedula').addEventListener('input', function() {
    // Limpiar el mensaje de error de cédula cuando se modifica el campo
    errorContainerced.innerText = '';
  });

  document.getElementById('txtEmail').addEventListener('input', function() {
    // Limpiar el mensaje de error de correo electrónico cuando se modifica el campo
    errorContainerEma.innerText = '';
  });

  if (EmailCliente != datos.email ){
    if (emailExistente === true ){
      errorContainerEma.innerText = '*El correo electrónico ingresado ya está  registrado.';
      return;
    }
  }

  if ( cedulaCliente != datos.cedula ){
    if (cedulaExistente === true ){
      errorContainerced.innerText = '*La cedula ingresada ya está  registrado.';
      return;
    } else if ( ValidarCedulaE === false ) {
      errorContainerced.innerText = '*La cedula ingresada no es una cedula Ecuatoriana.';
      return;
    } 
  }
  
  const request = await fetch('api/clientes/editar', {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(datos)
  });
  window.location.href = 'clientesTables.html';

}

// Verificar si la cedula existe
async function verificarCedulaExistente(username) {
  const response = await fetch(`api/clientes/cedula/${username}`);
  const usuario = await response.json();
  
  // Verificar si la lista está vacía
  if (usuario.length === 0) {
    // Si la lista está vacía, significa que el usuario no existe
    return false;
  } else {
    // Si la lista no está vacía, significa que el usuario existe
    return true;
  }
}

// Verificar si el email existe
async function verificarEmailExistente(username) {
  const response = await fetch(`api/clientes/email/${username}`);
  const usuario = await response.json();
  
  // Verificar si la lista está vacía
  if (usuario.length === 0) {
    // Si la lista está vacía, significa que el usuario no existe
    return false;
  } else {
    // Si la lista no está vacía, significa que el usuario existe
    return true;
  }
}

// Validar que la cedula sea una cedula ecuatoriana
function validarCedulaEcu(cedula) {

  // Extraer los primeros 9 dígitos
  var digitos = cedula.substring(0, 9);

  // Calcular el dígito verificador
  var suma = 0;
  for (var i = 0; i < digitos.length; i++) {
      var digito = parseInt(digitos[i]);
      if (i % 2 === 0) {
          digito *= 2;
          if (digito > 9) {
              digito -= 9;
          }
      }
      suma += digito;
  }

  var modulo = suma % 10;
  var verificador = (modulo === 0) ? 0 : 10 - modulo;

  // Comparar el dígito verificador con el último dígito de la cédula
  return verificador === parseInt(cedula[9]);
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

// Función para habilitar/deshabilitar el botón de registrar y mostrar msg de errores
function toggleBotonRegistrar() {
  const botonRegistrar = document.getElementById('BtnRegistrar');
  const campos = ['txtNombre', 'txtApellido', 'txtSexo', 'txtCedula', 'txtEmail', 'txtTelefono', 'txtDireccion'];

  // Verificar si todos los campos están llenos y la longitud de los valores
  const camposLlenos = campos.every(id => document.getElementById(id).value.trim() !== '');

  // Verificar que el telefono y la cedula tenga 10 digitos
  const NumDigitosCedula = document.getElementById('txtCedula').value.trim().length;
  const NumDigitosTelefono = document.getElementById('txtTelefono').value.trim().length;
  const NumDigitosMIN = NumDigitosCedula === 10 && NumDigitosTelefono === 10;

  // Verificar si se ha seleccionado una opción en los campos de rol y sexo
  const selectElementS = document.getElementById('txtSexo');
  const sexoSeleccionado = selectElementS.value;
  const sexoSeleccionadoValido = sexoSeleccionado !== "- Selecciona el sexo -";

  // Actualizar el mensaje de error
  const mensajeError = document.getElementById('mensajeError');

  if (!camposLlenos) {
    // Si no todos los campos están llenos, mostrar el mensaje general
    mensajeError.innerText = 'Por favor, llene todos los campos para poder registrar.';
  } else if (!sexoSeleccionadoValido) {
    // Si no se ha seleccionado una opción de sexo válida, mostrar un mensaje específico
    mensajeError.innerText = 'Por favor, selecciona una opción en el campo de sexo.';
  } else {
    // Si todos los campos están llenos y las contraseñas coinciden, limpiar el mensaje de error
    mensajeError.innerText = '';
  }
  // Habilitar/deshabilitar el botón de registrar
  botonRegistrar.disabled = !(camposLlenos && NumDigitosMIN && sexoSeleccionadoValido);
}

function getHeaders() {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': localStorage.token
  }
}

// Agregar event listener para cada cambio en los campos
document.querySelectorAll('input').forEach(input => input.addEventListener('input', toggleBotonRegistrar));
