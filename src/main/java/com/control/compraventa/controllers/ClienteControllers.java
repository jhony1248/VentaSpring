package com.control.compraventa.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.control.compraventa.dao.ClienteDao;
import com.control.compraventa.models.clientes;

@RestController
public class ClienteControllers {

    @Autowired
    private ClienteDao clienteDao;

    //Listar cliente
    @RequestMapping(value = "api/clientes", method = RequestMethod.GET)
    public List<clientes> getClientes(){
        return clienteDao.getClientes();
    }

    //añadir nuevo cliente
    @RequestMapping(value = "api/clientes", method = RequestMethod.POST)
    public void registrarClientes(@RequestBody clientes cliente){

        clienteDao.registrarCliente(cliente);
    }

    //Eliminar cliente Tabla
    @RequestMapping(value = "api/clientes/{cliente}", method = RequestMethod.DELETE)
    public void eliminar(@PathVariable String cliente){
        clienteDao.eliminarCliente(cliente);
    }

    //editar cliente
    @RequestMapping(value = "api/clientes/editar", method = RequestMethod.PUT)
    public void editarCliente(@RequestBody clientes cliente){

        clienteDao.editarCliente(cliente);
    }

    //Listar cliente especifico 
    @RequestMapping(value = "api/clientes/{cliente}", method = RequestMethod.GET)
    public clientes ObtenerCliente(@PathVariable String cliente){
        
        clientes cli = clienteDao.ObtenerClienteEspecifico(cliente);
        if(cli != null) {
            return cli;
        } else {
            return null;
        }
    }

    //Listar cliente por cedula 
    @RequestMapping(value = "api/clientes/cedula/{cliente}", method = RequestMethod.GET)
    public List<clientes> verificarCedulaExistente(@PathVariable String cliente) {
        List<clientes> lista = clienteDao.buscarCedulaExistente(cliente);
        return lista;
    }

    //Listar cliente por email 
    @RequestMapping(value = "api/clientes/email/{cliente}", method = RequestMethod.GET)
    public List<clientes> verificarEmailExistente(@PathVariable String cliente) {
        List<clientes> lista = clienteDao.buscarEmailExistente(cliente);
        return lista;
    }

}