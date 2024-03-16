
async function registrarProveedor() {

  try {
    let datos = {};
    datos.nombre_Proveedor = document.getElementById('txtNombreProv').value;
    datos.telefono_Proveedor = document.getElementById('txtTelefonoProv').value;
    datos.direccion_Proveedor = document.getElementById('txtDireccionProv').value;
    datos.servicio = document.getElementById('txtServicioProv').value;
    
    // Enviar los datos al servidor
    enviarDatosAlServidor(datos);

  } catch (error) {
    console.error('Error al procesar los datos:', error);
    // Manejar el error según sea necesario
  }
}

async function enviarDatosAlServidor(datos) {
  try {
    const request = await fetch('api/proveedor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    });

    location.reload();
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
