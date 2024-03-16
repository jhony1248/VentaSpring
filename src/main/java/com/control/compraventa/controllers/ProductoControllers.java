package com.control.compraventa.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.control.compraventa.dao.ProductoDao;
import com.control.compraventa.models.productos;

@RestController
public class ProductoControllers {

    @Autowired
    private ProductoDao productoDao;

    //Listar producto
    @RequestMapping(value = "api/productos", method = RequestMethod.GET)
    public List<productos> getProducto(){
        return productoDao.getProductos();
    }

    //Eliminar producto Tabla
    @RequestMapping(value = "api/productos/{producto}", method = RequestMethod.DELETE)
    public void eliminar(@PathVariable String producto){
        productoDao.eliminarProducto(producto);
    }

    //añadir nuevo producto
    @RequestMapping(value = "api/productos", method = RequestMethod.POST)
    public void registrarProductos(@RequestBody productos producto) {
    
        productoDao.registrarProducto(producto);
    } 
    
    //Listar producto especifico 
    @RequestMapping(value = "api/productos/{producto}", method = RequestMethod.GET)
    public productos ObtenerUsuario(@PathVariable String producto){
        
        productos prod = productoDao.ObtenerProductoEspecifico(producto);
        if(prod != null) {
            return prod;
        } else {
            return null;
        }
    }
     
    //editar producto
    @RequestMapping(value = "api/productos/editar", method = RequestMethod.PUT)
    public void editarProducto(@RequestBody productos producto){

        productoDao.editarProducto(producto);
    }
     
}