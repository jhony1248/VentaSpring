// Call the dataTables jQuery plugin
$(document).ready(function() {
  cargarProductos();
  $('#TbProductos').DataTable();
});

async function cargarProductos(){

  const request = await fetch('api/productos', {
    method: 'GET',
    headers: getHeaders()   
  });
  
  const productosJS = await request.json();
  let ProdCliHtml = '';

  for (let productos of productosJS){

    let pro = productos.id_Productos;
    let btnEliminar = '<a href="#" onclick="eliminarProducto('+ pro +')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';
    let btnEditar = '<a href="productoEditar.html?pro=' + encodeURIComponent(pro) + '" class="btn btn-primary btn-circle btn-sm ml-2"><i class="fas fa-edit"></i></a>';
    let btnVerImagen = '<button class="btn btn-info btn-circle btn-sm" onclick="verImagen(\'' + productos.imagen + '\')"><i class="fas fa-image"></i></button>';

    let contenidoNetoTxt = productos.contenido_Neto == null ? '--' : productos.contenido_Neto;
    let descripcionTxt = productos.descripcion == null ? '--' : productos.descripcion

    let productoHtml = '<tr> <td>'+ productos.id_Productos +'</td><td>'+ productos.nombre + '</td><td>' + productos.marca +'</td><td>'
      + contenidoNetoTxt +'</td><td>'+ descripcionTxt +'</td><td>'+ productos.stock +'</td><td>'+ productos.precio_Venta +
        '</td> <td>'+ productos.precio_Compra+'</td><td>'+ btnEliminar + '    ' + btnEditar +'</td><td>' + btnVerImagen + '</td></tr>';
    ProdCliHtml += productoHtml;
  }

  $('#TbProductos').DataTable().clear().draw();
  $('#TbProductos').DataTable().rows.add($(ProdCliHtml)).draw();

}

function getHeaders(){
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': localStorage.token 
  }
}

async function eliminarProducto(producto){  
  if(!confirm('¿Desea eliminar este producto?')){
    return;
  }
  const request = await fetch('api/productos/'+producto , {
    method: 'DELETE',
    headers: getHeaders()   
  });
  
  location.reload();
}

// Función para mostrar la imagen en un modal
function verImagen(base64String) {
  // Obtener el elemento de la imagen dentro del modal
  let modalImagen = document.getElementById('imagenModal');
  let imagen = modalImagen.querySelector('.modal-body img');
  // Asignar la URL de la imagen al atributo src de la etiqueta img
  imagen.src = "data:image/webp;base64," + base64String; // Cambia 'jpeg' al formato correcto si es diferente
  // Mostrar el modal
  $(modalImagen).modal('show');
}

