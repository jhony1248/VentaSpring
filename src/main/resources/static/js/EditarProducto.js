$(document).ready(function () {
  const pro = new URLSearchParams(window.location.search).get('pro');
  if (!pro){
    window.location.href = "404.html";
  } else {
    cargarProveedor() 
    CargarProductoEditar(pro);
  }
});

// Objeto que contiene las referencias a los elementos del formulario
const formulario = {
  txtNombre: document.getElementById('txtNombre'),
  txtMarca: document.getElementById('txtMarca'),
  txtContenido_Neto: document.getElementById('txtContenidoNet'),
  txtDescripcion: document.getElementById('txtDescripcion'),
  txtStock: document.getElementById('txtStock'),
  txtPrecio_Venta: document.getElementById('txtPreVenta'),
  txtPrecio_Compra: document.getElementById('txtPreCompra'),
  imagenDiv: document.getElementById('imagenDiv'),
  fileInputImg: document.getElementById('fileInputImg')
};

// Asignar evento de clic a la imagen para abrir el selector de archivos
formulario.imagenDiv.addEventListener('click', function () {
  formulario.fileInputImg.click();
});

// Asignar evento de cambio al input de tipo file
formulario.fileInputImg.addEventListener('change', function (event) {
  if (event.target.files && event.target.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      formulario.imagenDiv.src = e.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  }
});

let idPro;

async function CargarProductoEditar(pro) {

  const request = await fetch('api/productos/' + pro, {
    method: 'GET',
    headers: getHeaders()
  });
  const productoData = await request.json();

  // Llenar los campos del formulario con los datos del producto
  formulario.txtNombre.value = productoData.nombre;
  formulario.txtMarca.value = productoData.marca;
  formulario.txtContenido_Neto.value = productoData.contenido_Neto;
  formulario.txtDescripcion.value = productoData.descripcion;
  formulario.txtStock.value = productoData.stock;
  formulario.txtPrecio_Venta.value = productoData.precio_Venta;
  formulario.txtPrecio_Compra.value = productoData.precio_Compra;
  const selectProveedor = document.getElementById('txtProv');

  idPro = pro;

  // Obtener la imagen en base64String desde productoData.imagen
  const base64String = productoData.imagen;

  // Crear una URL de datos para la imagen Base64
  const imgUrl = `data:image/webp;base64,${base64String}`;

  // Establecer la URL de la imagen como fondo del div a través de CSS
  formulario.imagenDiv.src = imgUrl;

  for (let option of selectProveedor.options) {
    // Verificar si el valor de la opción es igual al sexo del usuario
    if (option.value === productoData.id_Proveedor.toString()) {
      // Establecer el atributo selected si el valor coincide
      option.selected = true;
    }
  }

}

async function editarProducto() {
  let datos = {}
  datos.id_Productos = idPro;
  datos.nombre = document.getElementById('txtNombre').value;
  datos.marca = document.getElementById('txtMarca').value;
  datos.contenido_Neto = document.getElementById('txtContenidoNet').value;
  datos.descripcion = document.getElementById('txtDescripcion').value;
  datos.stock = document.getElementById('txtStock').value;
  datos.precio_Venta = document.getElementById('txtPreVenta').value;
  datos.precio_Compra = document.getElementById('txtPreCompra').value;
  const base64Data = imagenDiv.src.split(',')[1]; 
  datos.imagen = base64Data
  datos.id_Proveedor = document.getElementById('txtProv').value;

  enviarDatosAlServidor(datos);

}

async function obtenerBase64Imagen(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}

async function enviarDatosAlServidor(datos) {
  try {
    const request = await fetch('api/productos/editar', {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(datos)
    });
    window.location.href = 'productosTables.html';
  } catch (error) {
    console.error('Error al enviar los datos al backend:', error);
  }
}

async function cargarProveedor() {

  const request = await fetch('api/proveedor', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  const proveedorJS = await request.json();

  let ListProveedorSelect = '';

  for (let proveedor of proveedorJS) {

    let ProveedorHtml = '<option disabled selected hidden>- Selecciona el Proveedor -</option>' +
      '<option value="' + proveedor.id_Proveedor + '">---' + proveedor.nombre_Proveedor + '---</option>'
      ListProveedorSelect += ProveedorHtml;

  }
  document.querySelector('#txtProv').innerHTML = ListProveedorSelect;
}

function getHeaders() {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': localStorage.token
  }
}