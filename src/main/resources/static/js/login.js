// Call the dataTables jQuery plugin
$(document).ready(function () {

});

async function iniciarSesion() {

  let datos = {}
  datos.email = document.getElementById('txtEmail').value;
  datos.clave = document.getElementById('txtPassword').value;

  const request = await fetch('api/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  });

  const respuesta = await request.text();
  if (respuesta != 'Fail') {
    localStorage.token = respuesta;
    localStorage.email = datos.email;
    window.location.href = 'usuariosTables.html'
  } else {
    alert("credenciales incorrectas")
  }
}

function cerrarSesion() {
  localStorage.removeItem('token');
  localStorage.removeItem('email');
 
  window.location.href = 'login.html';
}

// Función para obtener el nombre de usuario y el valor de "jti" desde un token JWT
function obtenerDatosUsuarioDesdeToken(token) {
  // Dividir el token en sus partes: encabezado, carga útil y firma
  const partes = token.split('.');
  // Decodificar la carga útil (parte intermedia del token)
  const payload = JSON.parse(atob(partes[1]));
  // Retornar un objeto con el nombre de usuario y el valor de "jti"
  return {
    nombreUsuario: payload.nombreUsuario,
    jti: payload.jti
  };
}

// Obtener el token del almacenamiento local
const token = localStorage.token;

// Verificar si el token existe
if (token) {
  // Obtener el nombre de usuario y el valor de "jti" desde el token
  const datosUsuario = obtenerDatosUsuarioDesdeToken(token);

  document.querySelector('.nav-link .text-gray-600').innerText = datosUsuario.nombreUsuario;
}