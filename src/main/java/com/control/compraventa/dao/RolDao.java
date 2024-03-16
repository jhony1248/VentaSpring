package com.control.compraventa.dao;

import java.util.List;

import com.control.compraventa.models.rol;

public interface RolDao {

    List<rol> getRol();

    void eliminarRol(int rol);

    void registrarRol(rol rol);

    rol ObtenerRolEspecifico(String rol);

    void editarRol(rol rol);

    List<rol> buscarRolExistente(String rol);

} 
    

