// Call the dataTables jQuery plugin
$(document).ready(function() {
  cargarProveedores();
  $('#TbProveedores').DataTable();
});

async function cargarProveedores(){

  const request = await fetch('api/proveedor', {
    method: 'GET',
    headers: getHeaders()   
  });
  
  const proveedorJS = await request.json();
  let ListProvHtml = '';

  for (let proveedor of proveedorJS){

    let prov = proveedor.id_Proveedor;
    let btnEliminar = '<a href="#" onclick="eliminarProveedor('+ prov +')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';
    let btnEditar = '<a href="proveedorEditar.html?prov=' + encodeURIComponent(prov) + '" class="btn btn-primary btn-circle btn-sm ml-2"><i class="fas fa-edit"></i></a>';

    let proveedorHtml = '<tr> <td>'+ proveedor.id_Proveedor +'</td><td>'+ proveedor.nombre_Proveedor + '</td><td>'
      + proveedor.telefono_Proveedor +'</td><td>'+ proveedor.direccion_Proveedor +'</td><td>'+ 
      proveedor.servicio +'</td><td>'+ btnEliminar + '    ' + btnEditar +'</td></tr>';;
    ListProvHtml += proveedorHtml;
  }

  //codigo para cargar los datos de los usuarios en la tabla
  $('#TbProveedores').DataTable().clear().draw();
  $('#TbProveedores').DataTable().rows.add($(ListProvHtml)).draw();

}

async function eliminarProveedor(proveedor){  
  if(!confirm('¿Desea eliminar este proveedor?')){
    return;
  }
  const request = await fetch('api/proveedor/'+proveedor , {
    method: 'DELETE',
    headers: getHeaders()   
  });
  
  location.reload();
}

function getHeaders(){
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': localStorage.token 
  }
}
 



