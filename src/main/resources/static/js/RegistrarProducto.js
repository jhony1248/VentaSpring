// Call the dataTables jQuery plugin
$(document).ready(function () {
  cargarProveedor()
});

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
  document.querySelector('#txtID_Prov').innerHTML = ListProveedorSelect;
}

async function registrarProducto() {

  try {
    let datos = {};
    datos.nombre = document.getElementById('txtNombre').value;
    datos.marca = document.getElementById('txtMarca').value;
    datos.contenido_Neto = document.getElementById('txtContenidoNet').value;
    datos.descripcion = document.getElementById('txtDescripcion').value;
    datos.stock = document.getElementById('txtStock').value;
    datos.precio_Venta = document.getElementById('txtPreVenta').value;
    datos.precio_Compra = document.getElementById('txtPreCompra').value;
    datos.id_Proveedor = document.getElementById('txtID_Prov').value;
    
    // Obtener el archivo de imagen seleccionado
    const imagenInput = document.getElementById('imagenInput');
    const imagenArchivo = imagenInput.files[0];

    // Verificar si se seleccionó una imagen
    if (imagenArchivo) {
      // Crear un objeto FileReader para leer el archivo como una URL de datos (data URL)
      const reader = new FileReader();

      // Definir la función de devolución de llamada una vez que se haya leído el archivo
      reader.onload = function(event) {
        // Obtener el string codificado en base64 de la imagen
        const base64String = event.target.result.split(',')[1];

        // Asignar el string codificado en base64 al campo 'imagen' de los datos
        datos.imagen = base64String;

        // Enviar los datos al servidor
        enviarDatosAlServidor(datos);
      };

      // Leer el archivo como una URL de datos (data URL)
      reader.readAsDataURL(imagenArchivo);
    } else {
      console.error('No se seleccionó ninguna imagen.');
      enviarDatosAlServidor(datos);
    }
  } catch (error) {
    console.error('Error al procesar los datos:', error);
    // Manejar el error según sea necesario
  }
}

async function enviarDatosAlServidor(datos) {
  try {
    const request = await fetch('api/productos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    });

    // Verificar la respuesta del servidor
    if (request.ok) {
      console.log('Producto registrado correctamente');
      // Manejar la respuesta según sea necesario
    } else {
      console.error('Error al registrar el producto:', request.statusText);
      // Manejar el error según sea necesario
    }
  } catch (error) {
    console.error('Error al enviar los datos al backend:', error);
    // Manejar el error según sea necesario
  }
}
