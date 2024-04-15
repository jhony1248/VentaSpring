$(document).ready(function () {
  $('#TbClientesMod').DataTable();
  $('#TbProductosMod').DataTable();
  // Agregar evento de clic a las filas de la tabla clientes modal
  $('#TbClientesMod tbody').on('click', 'tr', function () {
    seleccionarFilaCliente($(this));
  });
  // Agregar evento de clic a las filas de la tabla productos modal
  $('#TbProductosMod tbody').on('click', 'tr', function () {
    seleccionarFilaProducto($(this));
  });
  // Agregar evento de clic a las filas de la tabla venta
  $('#TbVenta tbody').on('click', 'tr', function () {
    $('#TbVenta tbody tr').removeClass('selected');
    $(this).addClass('selected');
  });
});

function abrirModalCliente() {
  $(tablaModalCli).modal('show');
  cargarClientesMod();
}

function abrirModalProducto() {
  $(tablaModalPro).modal('show');
  cargarProductosMod();
}

async function cargarClientesMod() {
  const request = await fetch('api/clientes', {
    method: 'GET',
    headers: getHeaders()
  });

  const clientesJS = await request.json();
  let ListCliHtml = '';

  for (let cliente of clientesJS) {

    let telefonoTxt = cliente.telefono == null ? '-' : cliente.telefono;
    let clienteHtml = '<tr> <td>' + cliente.id_Cliente + '</td><td>' + cliente.nombres + ' ' + cliente.apellidos + '</td><td>'
      + cliente.sexo + '</td><td>' + + cliente.cedula + '</td><td>' + cliente.email + '</td><td>' + telefonoTxt +
      '</td> <td>' + cliente.direccion + '</td>';
    ListCliHtml += clienteHtml;
  }

  //codigo para cargar los datos de los clientes en la tabla
  $('#TbClientesMod').DataTable().clear().draw();
  $('#TbClientesMod').DataTable().rows.add($(ListCliHtml)).draw();
}

async function cargarProductosMod() {
  const request = await fetch('api/productos', {
    method: 'GET',
    headers: getHeaders()
  });

  const productosJS = await request.json();
  let ProdCliHtml = '';

  for (let productos of productosJS) {

    let btnVerImagen = '<button class="btn btn-info btn-circle btn-sm" onclick="verImagen(\'' + productos.imagen + '\')"><i class="fas fa-image"></i></button>';
    let contenidoNetoTxt = productos.contenido_Neto == null ? '--' : productos.contenido_Neto;
    let descripcionTxt = productos.descripcion == null ? '--' : productos.descripcion

    let productoHtml = '<tr> <td>' + productos.id_Productos + '</td><td>' + productos.nombre + '</td><td>' + productos.marca + '</td><td>'
      + contenidoNetoTxt + '</td><td>' + descripcionTxt + '</td><td>' + productos.stock + '</td><td>' + productos.precio_Venta +
      '</td> <td>' + productos.precio_Compra + '</td><td>' + btnVerImagen + '</td></tr>';
    ProdCliHtml += productoHtml;
  }

  $('#TbProductosMod').DataTable().clear().draw();
  $('#TbProductosMod').DataTable().rows.add($(ProdCliHtml)).draw();
}

// Objeto para almacenar los datos de la fila seleccionada
let datosFila = {};
let datosFilaPro = {};

let idCli = "";
let telefonoCli = "";
let direccionCli = "";

function seleccionarFilaCliente(fila) {
  $('#TbClientesMod tbody tr').removeClass('selected');
  fila.addClass('selected');

  var celdas = fila.find('td');

  for (var i = 0; i < celdas.length; i++) {
    var nombreColumna = $('#TbClientesMod thead th:eq(' + i + ')').text().trim(); // Nombre de la columna
    var valorCelda = $(celdas[i]).text().trim(); // Valor de la celda
    datosFila[nombreColumna] = valorCelda; // Asignar el valor al objeto usando el nombre de la columna como clave
  }

  idCli = datosFila['ID'];
  telefonoCli = datosFila['Telefono'];
  direccionCli = datosFila['Direccion'];
  $('#nombreCli').val(datosFila['Nombres']);
  $('#cedulaCli').val(datosFila['Cedula']);
}

let idPro = "";

function seleccionarFilaProducto(fila) {
  // Remover la clase 'selected' de todas las filas
  $('#TbProductosMod tbody tr').removeClass('selected');
  // Agregar la clase 'selected' a la fila especificada
  fila.addClass('selected');

  // Obtener las celdas de la fila seleccionada
  var celdas = fila.find('td');

  // Recorrer las celdas y almacenar los datos en el objeto
  for (var i = 0; i < celdas.length; i++) {
    var nombreColumna = $('#TbProductosMod thead th:eq(' + i + ')').text().trim(); // Nombre de la columna
    var valorCelda = $(celdas[i]).text().trim(); // Valor de la celda
    datosFilaPro[nombreColumna] = valorCelda; // Asignar el valor al objeto usando el nombre de la columna como clave
  }

  // Actualizar los valores de los campos del formulario con los datos obtenidos
  idPro = datosFilaPro['ID'];
  $('#nombrePro').val(datosFilaPro['Nombre'] + ' || ' + datosFilaPro['Marca']);
  $('#stock').val(datosFilaPro['Stock']);
  $('#Cont_Net').val(datosFilaPro['Contenido Neto']);
  $('#precioU').val(datosFilaPro['Precio Venta']);
}

function verImagen(base64String) {
  // Obtener el elemento de la imagen dentro del modal
  let imagen = document.getElementById('imagenProducto');
  // Asignar la URL de la imagen al atributo src de la etiqueta img
  imagen.src = "data:image/webp;base64," + base64String; // Cambia 'jpeg' al formato correcto si es diferente
  // Obtener el contenedor de la imagen
  let contenedorImagen = document.getElementById('imagenProductoContainer');

  // Verificar si la imagen ya está visible
  if ($(contenedorImagen).is(":visible")) {
    // Si la imagen ya está visible, ocultarla
    $(contenedorImagen).hide();
  } else {
    // Si la imagen no está visible, mostrarla y centrarla
    $(contenedorImagen).show();
  }
}

// Función para obtener el nombre de usuario y el valor de "jti" desde un token JWT
function obtenerDatosUsuarioDesdeToken(token) {
  const partes = token.split('.');
  // Decodificar la carga útil (parte intermedia del token)
  const payload = JSON.parse(atob(partes[1]));
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

  // Llenar los campos del formulario con los datos del usuario
  document.getElementById('nombreVende').value = datosUsuario.nombreUsuario;
  // Llenar el campo del formulario con el valor de "jti"
  document.getElementById('UsuarioVende').value = datosUsuario.jti;
} else {
  console.log('No se encontró ningún token en el almacenamiento local');
}

// Realizar una solicitud HTTP a la API de WorldTimeAPI para obtener la hora actual de Quito, Ecuador
fetch('https://worldtimeapi.org/api/timezone/America/Guayaquil')
  .then(response => response.json())
  .then(data => {

    const fechaHoraActual = new Date(data.datetime);

    // Extraer el año, mes y día de la fecha y hora actual
    const año = fechaHoraActual.getFullYear();
    const mes = fechaHoraActual.getMonth() + 1; // Se agrega 1 porque los meses se indexan desde 0
    const dia = fechaHoraActual.getDate();

    // Formatear la fecha
    const fechaFormateada = `${dia < 10 ? '0' : ''}${dia}/${mes < 10 ? '0' : ''}${mes}/${año}`

    // Llenar el campo de fecha con la fecha actual de Quito, Ecuador
    document.getElementById('Fecha').value = fechaFormateada;
  })
  .catch(error => {
    console.error('Error al obtener la fecha de Quito, Ecuador:', error);
  });

function calcularSuma() {
  var precio = document.getElementById("precioU").value;
  var cantidad = document.getElementById("Cantidad").value;
  var stock = document.getElementById("stock").value;
  var resultado = document.getElementById("totalSuma");

  if (precio !== "" && cantidad !== "" && stock !== "") {
    //Validar que la cantidad no supere el stock
    if (cantidad > stock) {
      resultado.value = "";
      resultado.style.backgroundColor = "red";
      mostrarModalValidacion("¡La cantidad que desea vender supera el stock disponible!");
    } else if (stock - cantidad === 1 || cantidad == stock) {
      resultado.style.backgroundColor = "yellow";
      resultado.value = (parseFloat(precio) * parseFloat(cantidad)).toFixed(2);

      mostrarModalValidacion("¡Cuidado! La cantidad que está a punto de vender agotará el stock del producto.");
    } else {
      resultado.style.backgroundColor = "";
      // Calcular la suma de los valores y asignarla al tercer input
      resultado.value = (parseFloat(precio) * parseFloat(cantidad)).toFixed(2);
    }
  } else {
    // Si alguno de los inputs está vacío, establecer el tercer input como vacío
    resultado.value = "";
    resultado.style.backgroundColor = "";
  }
}

function agregarFila() {
  // Obtener los valores de los inputs
  var nombre = document.getElementById("nombrePro").value;
  var cantidad = document.getElementById("Cantidad").value;
  var precio = document.getElementById("precioU").value;
  var total = document.getElementById("totalSuma").value;
  var stock = document.getElementById("stock").value;

  // Validar si tanto idPro como cantidad no están vacíos
  if (idPro === '' || cantidad === '') {
    mensaje = "Debe ingresar un ID de producto y una cantidad.";
    mostrarModalValidacion(mensaje)
    return;
  }

  // Verificar si la cantidad ingresada supera al stock
  if (cantidad > stock) {
    mensaje = "No se puede agregar el producto. La cantidad ingresada supera el stock disponible.";
    mostrarModalValidacion(mensaje);
    return;
  }

  // Verificar si el idPro ya existe en la tabla
  var tabla = $('#TbVenta').DataTable();
  var existe = false;
  tabla.rows().every(function () {
    var data = this.data();
    if (data[0] === idPro) {
      existe = true;
      return false; // Detener el bucle ya que se encontró un ID repetido
    }
  });
  // Si el idPro ya existe, mostrar un mensaje y salir de la función
  if (existe) {
    mensaje = "El producto ya ha sido agregado.";
    mostrarModalValidacion(mensaje)
    return;
  }

  let ventaHtml = '<tr><td>' + idPro + '</td><td>' + nombre + '</td><td>' + cantidad + '</td><td>'
    + precio + '</td><td>' + total + '</td><td>' + stock + '</td></tr>';

  // Agregar la nueva fila al cuerpo de la tabla
  tabla.row.add($(ventaHtml)).draw();
  document.getElementById("totalSuma").value = '';
  document.getElementById("Cantidad").value = '';
  // Calcular el valor total de la venta
  var totalVenta = calcularTotalVenta(tabla);
  // Mostrar el valor total de la venta
  document.getElementById("valor_venta").value = totalVenta.toFixed(2);
  calcularTotalPagar()
}

// Calcular el valor total de la venta
function calcularTotalVenta(tabla) {
  var totalVenta = 0;
  tabla.rows().every(function () {
    var data = this.data();
    totalVenta += parseFloat(data[4]); // Sumar el total de cada fila
  });
  return totalVenta;
}

function calcularTotalPagar() {
  var valorVenta = parseFloat(document.getElementById("valor_venta").value);
  var iva = parseFloat(document.getElementById("ivaT").value);
  var subTotal = document.getElementById("subtotal");
  var totalPagar = document.getElementById("totalPagar");

  // Verificar si ambos inputs tienen valores numéricos
  if (!isNaN(valorVenta)) {
    // Verificar si el valor de iva es igual a 0 o está vacío
    if (iva !== 0 && !isNaN(iva)) {
      // Calcular la suma de los valores y asignarla al tercer input
      let ivaDec = iva / 100;
      let valorsubTotal = valorVenta * ivaDec;
      subTotal.value = valorsubTotal.toFixed(2); // Redondear a 2 decimales
      totalPagar.value = (valorVenta + valorsubTotal).toFixed(2); // Calcular y asignar el total a pagar
    } else {
      let ivaDec = 0;
      let valorsubTotal = valorVenta * ivaDec;
      subTotal.value = valorsubTotal.toFixed(2);
      totalPagar.value = valorVenta.toFixed(2);
    }
  } else {
    // Si alguno de los inputs no tiene un valor numérico, establecer los inputs de subtotal y total como vacíos
    subTotal.value = "0.00";
    totalPagar.value = "0.00";
  }
}

// Función para eliminar la fila seleccionada de la tabla
function eliminarFilaSeleccionada() {
  var tabla = $('#TbVenta').DataTable();
  var filaSeleccionada = $('#TbVenta tbody tr.selected');

  if (filaSeleccionada.length === 0) {
    var mensaje = "Por favor, selecciona una fila para eliminar.";
    mostrarModalValidacion(mensaje);
    return;
  }
  // Función de callback para eliminar la fila después de la confirmación
  function eliminarFila() {
    eliminarFilaDeTabla(tabla, filaSeleccionada);
  }
  mostrarModalConfirmacion('¿Estás seguro de que deseas eliminar esta fila?', eliminarFila);
}

// Función para eliminar una fila de la tabla
function eliminarFilaDeTabla(tabla, fila) {
  var filaDataTable = tabla.row(fila);
  filaDataTable.remove().draw();
  var totalVenta = calcularTotalVenta(tabla);
  document.getElementById("valor_venta").value = totalVenta.toFixed(2);
  calcularTotalPagar();
}

// Función para mostrar un modal de confirmación antes de realizar una acción
function mostrarModalConfirmacion(mensaje, callback) {
  $('#modalConfirmacion .modal-body').text(mensaje);
  $('#modalConfirmacion').modal('show');

  // Agrega un manejador de eventos al botón de confirmación
  $('#btnConfirmarEliminar').one('click', function () {
    callback();
    $('#modalConfirmacion').modal('hide');
  });
}

function eliminarTablaCompleta() {
  // Mostrar el modal de confirmación con el mensaje proporcionado
  $('#modalConfirmacion .modal-body').text('¿Estás seguro de que deseas limpiar la tabla?');
  $('#modalConfirmacion').modal('show');
  // Configurar el evento click del botón de confirmación en el modal
  $('#btnConfirmarEliminar').click(function () {
    var tabla = $('#TbVenta').DataTable();
    tabla.clear().draw();
    // Recalcular el valor total de la venta después de eliminar la fila
    document.getElementById("valor_venta").value = "";
    calcularTotalPagar();
    // Ocultar el modal
    $('#modalConfirmacion').modal('hide');

    // Remover el evento click del botón de confirmación para evitar problemas de referencia
    $('#btnConfirmarEliminar').off('click');
  });
}

//enviamos los datos a la api para guardar la factura
async function registrarFactura() {
  mostrarModalConfirmacion('¿Enviar datos a guardar?');
  let datos = {}
  datos.num_Factura = document.getElementById('Num_venta').value;
  datos.fecha = document.getElementById('Fecha').value;
  datos.venta_Total = document.getElementById('valor_venta').value;
  datos.sub_Total = document.getElementById('subtotal').value;
  datos.iva = document.getElementById('ivaT').value;
  datos.total = document.getElementById('totalPagar').value;
  datos.id_Cliente = idCli;
  datos.usuario = document.getElementById('UsuarioVende').value;

  const request = await fetch('api/facturas', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  });

  mostrarModalValidacion("Venta registrada correctamente");
  registrarDetalleVenta();
}

async function registrarDetalleVenta() {
  var tabla = $('#TbVenta').DataTable();
  const num_Fact = document.getElementById('Num_venta').value;

  const promesasEnvio = [];

  for (var i = 0; i < tabla.rows().count(); i++) {
    var rowData = tabla.row(i).data(); // Obtener los datos de la fila 
    let datos = {}
    datos.num_Factura = num_Fact;
    datos.id_Producto = rowData[0];
    datos.cantidad = rowData[2];
    const promesa = enviarDatosDetalleVenta(datos);
    promesasEnvio.push(promesa); // Agregar la promesa al array
  }
  // Esperar a que todas las promesas se resuelvan
  await Promise.all(promesasEnvio);
}

async function enviarDatosDetalleVenta(datos) {
  try {
    const request = await fetch('api/detalleVenta', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    });
    if (!response.ok) {
      throw new Error('Error al enviar los datos.');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para mostrar el modal de validación con un mensaje personalizado
function mostrarModalValidacion(mensaje) {
  document.getElementById("mensajeValidacionBody").innerText = mensaje;
  $('#validacionModal').modal('show');
}

// Función para imprimir y generar la factura
function generarFactura() {

  const facturaNumero = document.getElementById('Num_venta').value;
  const fecha = document.getElementById('Fecha').value;
  const datosCliente = obtenerDatosCliente();
  const datosTabla = obtenerDatosTabla();

  // Obtener el nombre del cliente para generar el nombre de la factura
  const nombreCliente = datosCliente.nombre;

  // Generar el nombre de la factura combinando el número de factura y el nombre del cliente
  const nombreFactura = `Factura_${facturaNumero}_${nombreCliente}.pdf`;

  // Crear un documento PDF
  const doc = new jsPDF();

  var img = new Image();

  img.src = '../img/iconFact.png';

  // Esperar a que la imagen se cargue completamente
  img.onload = function () {

    // Agregar la imagen al documento
    doc.addImage(img, 'png', 15, 10, 30, 30); // Parámetros: imagen, formato, posición x, posición y, ancho, alto

    // Establecer el tamaño de fuente más pequeño
    doc.setFontSize(10);

    doc.text('Ruc: 1725233618054', 70, 20);
    doc.text('Nombre: MODA VIVA', 70, 30);
    doc.text('Teléfono: 0984756542', 70, 40);
    doc.text('Dirección: Guamaní', 70, 50);

    // Diseñar el contenido del PDF
    doc.text('Factura: ' + facturaNumero, 140, 30);
    doc.text('Fecha: ' + fecha, 140, 40);

    // Cambiar el color del texto a azul
    doc.setTextColor(0, 0, 255);
    doc.setFontSize(11);
    // Agregar datos del cliente encima de la tabla
    doc.text(`Cédula:`, 15, 60);
    doc.text(`Nombre:`, 50, 60);
    doc.text(`Teléfono:`, 120, 60);
    doc.text(`Dirección:`, 160, 60);
    doc.setTextColor(0);

    // Agregar datos del cliente encima de la tabla
    doc.text(datosCliente.cedula, 15, 70);
    doc.text(datosCliente.nombre, 50, 70);
    doc.text(datosCliente.telefono, 120, 70);
    doc.text(datosCliente.direccion, 160, 70);
    doc.setFontSize(10);

    // Cambiar el color del texto a azul
    doc.setTextColor(0, 0, 255);

    // Aplicar un fondo de color gris en la línea especificada
    doc.setFillColor(192, 192, 192);
    doc.rect(10, 75, 190, 10, 'F'); // Dibujar un rectángulo de fondo gris

    doc.text('Cantidad:', 15, 80);
    doc.text('Descripción:', 40, 80);
    doc.text('Precio:', 150, 80);
    doc.text('Total a Pagar:', 170, 80);

    // Restaurar el color del texto a negro
    doc.setTextColor(0);

    // Insertar datos de la tabla
    datosTabla.forEach((fila, indice) => {
      doc.text(fila.cantidad, 20, 90 + (indice * 10)); // Columna de cantidad
      doc.text(fila.nombre, 40, 90 + (indice * 10));   // Columna de nombre
      doc.text(fila.precio, 150, 90 + (indice * 10));   // Columna de precio
      doc.text(fila.totalPa, 175, 90 + (indice * 10));  // Columna de totalPagado
    });

    const totalSpace = 90 + (datosTabla.length * 10);
    const totalSpaceFirma = 110 + (datosTabla.length * 10);
    const totalSpaceLinea = 130 + (datosTabla.length * 10);
    const totalSpaceGracias = 140 + (datosTabla.length * 10);

    doc.text(`Total a pagar: ${datosCliente.total}`, 165, totalSpace);

    doc.setFontSize(12);

    // Agregar la firma
    doc.text('Firma', 100, totalSpaceFirma);

    // Agregar línea divisoria
    doc.setLineWidth(0.5); // Establecer el ancho de la línea
    doc.line(75, totalSpaceLinea, 135, totalSpaceLinea); // Dibujar la línea
    doc.text('¡Gracias por su compra!', 82, totalSpaceGracias);

    // Generar el PDF y abrirlo en una nueva ventana del navegador
    doc.save(nombreFactura);
  }
}


function obtenerDatosCliente() {
  // Obtener los valores de los campos del formulario
  const cedula = document.getElementById('cedulaCli').value;
  const nombre = document.getElementById('nombreCli').value;
  const total = document.getElementById('totalPagar').value;
  const telefono = telefonoCli;
  const direccion = direccionCli;

  // Crear un objeto con los datos del cliente
  const datosCliente = {
    cedula: cedula,
    nombre: nombre,
    telefono: telefono,
    direccion: direccion,
    total: total
  };

  return datosCliente;
}

function obtenerDatosTabla() {
  const datosTabla = [];
  const tabla = $('#TbVenta').DataTable();
  // Recorrer cada fila de la tabla
  tabla.rows().every(function () {
    // Obtener los datos de la fila actual
    const rowData = this.data();
    // Crear un objeto para almacenar los datos de la fila
    const datosFila = {
      nombre: rowData[1],
      cantidad: rowData[2],
      precio: rowData[3],
      totalPa: rowData[4]
    };
    // Agregar los datos de la fila al array 
    datosTabla.push(datosFila);
  });
  return datosTabla;
}

function getHeaders() {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': localStorage.token
  }
}
