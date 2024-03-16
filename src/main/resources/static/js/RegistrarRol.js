
async function registrarRoles() {

  let datos = {}
  datos.nombre_Rol = document.getElementById('txtNombreRol').value;

  const request = await fetch('api/rols', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  });
  window.location.href = 'RolTables.html';

}



