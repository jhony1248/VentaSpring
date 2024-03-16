package com.control.compraventa.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.control.compraventa.dao.ProveedorDao;
import com.control.compraventa.models.proveedor;
@RestController
public class ProveedorControllers {

    @Autowired
    private ProveedorDao proveedorDao;

    //Listar proveedor
    @RequestMapping(value = "api/proveedor", method = RequestMethod.GET)
    public List<proveedor> getUsuarios(){
        return proveedorDao.getProveedores();
    }

    //Eliminar proveedor Tabla
    @RequestMapping(value = "api/proveedor/{proveedor}", method = RequestMethod.DELETE)
    public void eliminar(@PathVariable String proveedor){
        proveedorDao.eliminarProveedor(proveedor);
    }

    //añadir nuevo proveedor
    @RequestMapping(value = "api/proveedor", method = RequestMethod.POST)
    public void registrarProveedor(@RequestBody proveedor proveedor) {
    
        proveedorDao.registrarProveedor(proveedor);
    } 

    //Listar producto especifico 
    @RequestMapping(value = "api/proveedor/{proveedor}", method = RequestMethod.GET)
    public proveedor ObtenerProveedor(@PathVariable String proveedor){
        
        proveedor prov = proveedorDao.ObtenerProveedorEspecifico(proveedor);
        if(prov != null) {
            return prov;
        } else {
            return null;
        }
    }
     
    //editar producto
    @RequestMapping(value = "api/proveedor/editar", method = RequestMethod.PUT)
    public void editarProveedor(@RequestBody proveedor proveedor){

        proveedorDao.editarProveedor(proveedor);
    }
     

}