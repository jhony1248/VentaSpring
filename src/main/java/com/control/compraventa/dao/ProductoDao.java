package com.control.compraventa.dao;

import java.util.List;

import com.control.compraventa.models.productos;

public interface ProductoDao {

    List<productos> getProductos();

    void eliminarProducto(String producto);

    void registrarProducto(productos producto);

    productos ObtenerProductoEspecifico(String producto);

    void editarProducto(productos producto);

} 
    

