package com.control.compraventa.dao;

import java.util.List;

import com.control.compraventa.models.proveedor;

public interface ProveedorDao {

    List<proveedor> getProveedores();

    void eliminarProveedor(String proveedor);

    void registrarProveedor(proveedor proveedor);

    proveedor ObtenerProveedorEspecifico(String proveedor);

    void editarProveedor(proveedor proveedor);
} 