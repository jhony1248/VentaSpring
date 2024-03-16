package com.control.compraventa.dao;

import java.util.List;

import com.control.compraventa.models.clientes;

public interface ClienteDao {

    List<clientes> getClientes();

    void eliminarCliente(String cliente);
    
    void registrarCliente(clientes cliente);

    clientes ObtenerClienteEspecifico(String cliente);

    void editarCliente(clientes cliente);

    List<clientes> buscarCedulaExistente(String cliente);

    List<clientes> buscarEmailExistente(String cliente);

} 
    

