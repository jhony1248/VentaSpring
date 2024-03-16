$(document).ready(function () {
  const prov = new URLSearchParams(window.location.search).get('prov');
  if (!prov) window.location.href = "404.html";
  else CargarProveedorEditar(prov);
});

// Objeto que contiene las referencias a los elementos del formulario
const formulario = {
  txtNombre_Proveedor: document.getElementById('txtNombreProv'),
  txtTelefono_Proveedor: document.getElementById('txtTelefonoProv'),
  txtDireccion_Proveedor: document.getElementById('txtDireccionProv'),
  txtServicio: document.getElementById('txtServicioProv'),

};


let idProv;

async function CargarProveedorEditar(prov) {

  const request = await fetch('api/proveedor/' + prov, {
    method: 'GET',
    headers: getHeaders()
  });
  const proveedorData = await request.json();

  // Llenar los campos del formulario con los datos del producto
  formulario.txtNombre_Proveedor.value = proveedorData.nombre_Proveedor;
  formulario.txtTelefono_Proveedor.value = proveedorData.telefono_Proveedor;
  formulario.txtDireccion_Proveedor.value = proveedorData.direccion_Proveedor;
  formulario.txtServicio.value = proveedorData.servicio;
  idProv = prov;

}

async function editarProveedor() {
  let datos = {}
  datos.id_Proveedor = idProv;
  datos.nombre_Proveedor = document.getElementById('txtNombreProv').value;
  datos.telefono_Proveedor = document.getElementById('txtTelefonoProv').value;
  datos.direccion_Proveedor = document.getElementById('txtDireccionProv').value;
  datos.servicio = document.getElementById('txtServicioProv').value;

  enviarDatosAlServidor(datos);

}

async function enviarDatosAlServidor(datos) {
  try {
    const request = await fetch('api/proveedor/editar', {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(datos)
    });
    window.location.href = 'proveedorTables.html';
  } catch (error) {
    console.error('Error al enviar los datos al backend:', error);
  }
}

function getHeaders() {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': localStorage.token
  }
}