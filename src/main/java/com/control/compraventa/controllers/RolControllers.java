package com.control.compraventa.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.control.compraventa.dao.RolDao;
import com.control.compraventa.models.rol;

@RestController
public class RolControllers {

    //habilita la inyección automática de dependencias
    @Autowired
    private RolDao rolDao;

    //Listar rol
    @RequestMapping(value = "api/rols", method = RequestMethod.GET)
    public List<rol> getRol(){
        return rolDao.getRol();
    }

    //añadir nuevo rol
    @RequestMapping(value = "api/rols", method = RequestMethod.POST)
    public void registrarUsuarios(@RequestBody rol rol){

        rolDao.registrarRol(rol);
    }

    //Eliminar Rol Tabla
    @RequestMapping(value = "api/rols/{rol}", method = RequestMethod.DELETE)
    public void eliminar(@PathVariable int rol){
        rolDao.eliminarRol(rol);
    }

    //editar usuario
    @RequestMapping(value = "api/rols/editar", method = RequestMethod.PUT)
    public void editarRolsApi(@RequestBody rol rol){

        rolDao.editarRol(rol);
    }

    //Listar rol especifico 
    @RequestMapping(value = "api/rols/{rol}", method = RequestMethod.GET)
    public rol ObtenerUsuario(@PathVariable String rol){
        
        rol user = rolDao.ObtenerRolEspecifico(rol);
        if(user != null) {
            return user;
        } else {
            return null;
        }
    }

    //Listar rol por nombre_rol 
    @RequestMapping(value = "api/rols/nombreRol/{rol}", method = RequestMethod.GET)
    public List<rol> verificarCedulaExistente(@PathVariable String rol) {
        List<rol> lista = rolDao.buscarRolExistente(rol);
        return lista;
    }
}