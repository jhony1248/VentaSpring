package com.control.compraventa.dao;

import java.util.List;

import com.control.compraventa.models.usuario;

public interface UsuarioDao {

    List<usuario> getUsuarios();

    void eliminarUsuario(String usuario);
    
    void registrar(usuario usuario);

    usuario ObtenerCredenciales(usuario usuario);

    usuario ObtenerUsuarioEspecifico(String usuario);

    void editar(usuario usuario);

    List<usuario> buscarUsuarioExistente(String usuario);

    List<usuario> buscarCedulaExistente(String usuario);

    List<usuario> buscarEmailExistente(String usuario);

} 
    

