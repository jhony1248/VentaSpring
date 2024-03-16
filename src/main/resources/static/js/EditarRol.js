$(document).ready(function () {

  let params = new URLSearchParams(window.location.search);
  let rolId  = params.get('rolId');

  if (rolId  == null || rolId  === "") {

    window.location.href = "404.html";
  } else {
    CargarRolEditar(rolId)
  }

});

let nombreRol;

async function CargarRolEditar(rolId ) {

  const request = await fetch('api/rols/' + rolId , {
    method: 'GET',
    headers: getHeaders()
  });
  const rolData = await request.json();
  

  // Obtener referencias a los campos del formulario
  const txtIdRol = document.getElementById('txtIdRol');
  const txtNombreRol = document.getElementById('txtNombreRol');

  // Llenar los campos del formulario con los datos del usuario
  txtIdRol.value = rolData.id_Rol;
  txtNombreRol.value = rolData.nombre_Rol;
  nombreRol = rolData.nombre_Rol;

}

async function EditarRol() {

  let datos = {}
  datos.id_Rol = document.getElementById('txtIdRol').value;
  datos.nombre_Rol = document.getElementById('txtNombreRol').value;

  const RolExistente = await verificarRolExistente(datos.nombre_Rol);
  const errorContainerRol = document.getElementById('errorRol');

  // Agregar eventos de escucha para limpiar los mensajes de error cuando se modifiquen los campos
  document.getElementById('txtNombreRol').addEventListener('input', function() {
    // Limpiar el mensaje de error de cédula cuando se modifica el campo
    errorContainerced.innerText = '';
  });

  if (nombreRol != datos.nombre_Rol ){
    if (RolExistente === true ){
      errorContainerRol.innerText = '*El Nombre del rol ingresado ya está  registrado.';
      return;
    }
  }

  const request = await fetch('api/rols/editar', {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(datos)
  });
  window.location.href = 'RolTables.html';

}

// Verificar si el rol existe
async function verificarRolExistente(rol) {
  const response = await fetch(`api/rols/nombreRol/${rol}`);
  const roles = await response.json();
  
  // Verificar si la lista está vacía
  if (roles.length === 0) {
    // Si la lista está vacía, significa que el usuario no existe
    return false;
  } else {
    // Si la lista no está vacía, significa que el usuario existe
    return true;
  }
}

function getHeaders() {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': localStorage.token
  }
}
