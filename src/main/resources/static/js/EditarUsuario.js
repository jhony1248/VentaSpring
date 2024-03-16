$(document).ready(function () {
  /*let usu = localStorage.getItem('usu');
  localStorage.removeItem('usu');
  alert(usu);
  console.log(usu);
  */

  let params = new URLSearchParams(window.location.search);
  let usu = params.get('usu');

  if (usu == null || usu === "") {

    window.location.href = "404.html";
  } else {
    cargarRol()
    CargarUsuarioEditar(usu)
  }

});

let claveUsuario;
let EmailUsuario;
let cedulaUsuario;

async function CargarUsuarioEditar(usuario) {

  const request = await fetch('api/usuarios/' + usuario, {
    method: 'GET',
    headers: getHeaders()
  });
  const usuarioData = await request.json();

  // Obtener referencias a los campos del formulario
  const txtUsuario = document.getElementById('txtUsuario');
  const txtNombre = document.getElementById('txtNombre');
  const txtApellido = document.getElementById('txtApellido');
  const txtEmail = document.getElementById('txtEmail');
  const selectSexo = document.getElementById('txtSexo');
  const txtCedula = document.getElementById('txtCedula');
  const selectRol = document.getElementById('txtRol');
  const txtTelefono = document.getElementById('txtTelefono');

  // Llenar los campos del formulario con los datos del usuario
  txtUsuario.value = usuarioData.usuario;
  txtNombre.value = usuarioData.nombres;
  txtApellido.value = usuarioData.apellidos;
  txtEmail.value = usuarioData.email;
  txtCedula.value = usuarioData.cedula;
  txtTelefono.value = usuarioData.telefono;
  EmailUsuario = usuarioData.email;
  claveUsuario = usuarioData.clave;
  cedulaUsuario = usuarioData.cedula;

  for (let option of selectSexo.options) {
    // Verificar si el valor de la opción es igual al sexo del usuario
    if (option.value === usuarioData.sexo) {
      // Establecer el atributo selected si el valor coincide
      option.selected = true;
    }
  }

  for (let option of selectRol.options) {
    // Verificar si el valor de la opción es igual al sexo del usuario
    if (option.value === usuarioData.id_Rol.toString()) {
      // Establecer el atributo selected si el valor coincide
      option.selected = true;
    }
  }

}

async function cargarRol() {
  const request = await fetch('api/rols', {
    method: 'GET',
    headers: getHeaders()
  });
  const rolsJS = await request.json();

  let ListRolSelect = '';

  for (let rol of rolsJS) {
    let RolHtml = '<option value="' + rol.id_Rol + '">---' + rol.nombre_Rol + '---</option>'
    ListRolSelect += RolHtml;
  }
  document.querySelector('#txtRol').innerHTML = ListRolSelect;
}

async function EditarUsuario() {

  let datos = {}
  datos.usuario = document.getElementById('txtUsuario').value;
  datos.nombres = document.getElementById('txtNombre').value;
  datos.apellidos = document.getElementById('txtApellido').value;
  datos.sexo = document.getElementById('txtSexo').value;
  datos.cedula = document.getElementById('txtCedula').value;
  datos.email = document.getElementById('txtEmail').value;
  datos.telefono = document.getElementById('txtTelefono').value;
  datos.id_Rol = document.getElementById('txtRol').value;
  datos.clave = claveUsuario;

  const cedulaExistente = await verificarCedulaExistente(datos.cedula);
  const emailExistente = await verificarEmailExistente(datos.email);
  const ValidarCedulaE = validarCedulaEcu(datos.cedula);
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

  if (EmailUsuario != datos.email ){
    if (emailExistente === true ){
      errorContainerEma.innerText = '*El correo electrónico ingresado ya está  registrado.';
      return;
    }
  }

  if ( cedulaUsuario != datos.cedula ){
    if (cedulaExistente === true ){
      errorContainerced.innerText = '*La cedula ingresada ya está  registrado.';
      return;
    } else if ( ValidarCedulaE === false ) {
      errorContainerced.innerText = '*La cedula ingresada no es una cedula Ecuatoriana.';
      return;
    } 
  }
  

  const request = await fetch('api/usuarios/editar', {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(datos)
  });
  window.location.href = 'usuariosTables.html';

}

// Verificar si la cedula existe
async function verificarCedulaExistente(username) {
  const response = await fetch(`api/usuarios/cedula/${username}`);
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
  const response = await fetch(`api/usuarios/email/${username}`);
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
  const campos = ['txtNombre', 'txtApellido', 'txtSexo', 'txtCedula', 'txtEmail', 'txtTelefono', 'txtRol'];

  // Verificar si todos los campos están llenos y la longitud de los valores
  const camposLlenos = campos.every(id => document.getElementById(id).value.trim() !== '');

  // Verificar que el telefono y la cedula tenga 10 digitos
  const NumDigitosCedula = document.getElementById('txtCedula').value.trim().length;
  const NumDigitosTelefono = document.getElementById('txtTelefono').value.trim().length;
  const NumDigitosMIN = NumDigitosCedula === 10 && NumDigitosTelefono === 10;

  // Actualizar el mensaje de error
  const mensajeError = document.getElementById('mensajeError');

  if (!camposLlenos) {
    // Si no todos los campos están llenos, mostrar el mensaje general
    mensajeError.innerText = 'Por favor, llene todos los campos para poder registrar.';
  } else {
    // Si todos los campos están llenos y las contraseñas coinciden, limpiar el mensaje de error
    mensajeError.innerText = '';
  }
  // Habilitar/deshabilitar el botón de registrar
  botonRegistrar.disabled = !(camposLlenos && NumDigitosMIN);
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
