
async function registrarClientes() {

  let datos = {}
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

  if (ValidarCedulaE === false) {
    // Si el valor ingresado no es una cedula Ecuatoriana valida, mostrar un mensaje de error y salir
    errorContainerced.innerText = '  *La cedula ingresada no es una cedula Ecuatoriana.';
    return;
  } else if (cedulaExistente === true) {
    // Si la cedula existe, mostrar un mensaje de error y salir de la función
    errorContainerced.innerText = '  *La cedula ingresada ya está registrada.';
    return;
  } else if (emailExistente === true) {
    // Si el email existe, mostrar un mensaje de error y salir de la función
    errorContainerEma.innerText = '  *El email ingresado ya está registrado.';
    return;
  } else {

    const request = await fetch('api/clientes', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    });
    window.location.href = 'ClientesTables.html';
  }

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

// Agregar event listener para cada cambio en los campos
document.querySelectorAll('input').forEach(input => input.addEventListener('input', toggleBotonRegistrar));

// Agregar event listener para el cambio en el campo de sexo
document.getElementById('txtSexo').addEventListener('change', toggleBotonRegistrar);