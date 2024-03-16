// Call the dataTables jQuery plugin
$(document).ready(function() {
  cargarRol();
  $('#TbRol').DataTable();
});

async function cargarRol(){

  const request = await fetch('api/rols', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }   
  });
  const rolsJS = await request.json();

  let ListRolHtml = '';

  for (let rol of rolsJS){

    let rolId = rol.id_Rol;
    let btnEliminar = '<a href="#" onclick="eliminarRol('+ rolId +')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';
    let btnEditar = '<a href="rolEditar.html?rolId=' + encodeURIComponent(rolId) + '" class="btn btn-primary btn-circle btn-sm ml-2"><i class="fas fa-edit"></i></a>';

    let RolHtml = '<tr> <td>'+ rol.id_Rol +'</td><td>'+ rol.nombre_Rol + 
    '</td><td>'+ btnEliminar + '    ' + btnEditar +'</td></tr>';
    ListRolHtml += RolHtml;

  }

  //codigo para cargar los datos de los usuarios en la tabla
  $('#TbRol').DataTable().clear().draw();
  $('#TbRol').DataTable().rows.add($(ListRolHtml)).draw();
  
}

async function eliminarRol(rol){

  if(!confirm('¿Desea eliminar este Rol?')){
    return;
  }

  const request = await fetch('api/rols/'+rol , {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }   
  });

  location.reload();

}
