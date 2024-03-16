package com.control.compraventa.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.control.compraventa.dao.UsuarioDao;
import com.control.compraventa.models.usuario;
import com.control.compraventa.utils.JWTUtil;

import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;

@RestController
public class UsuarioControllers {

    @Autowired
    private UsuarioDao usuarioDao;

    @Autowired
    private JWTUtil jwtUtil;

    //Listar usuario
    @RequestMapping(value = "api/usuarios", method = RequestMethod.GET)
    public List<usuario> getUsuarios(){
        return usuarioDao.getUsuarios();
    }

    //añadir nuevo usuario
    @RequestMapping(value = "api/usuarios", method = RequestMethod.POST)
    public void registrarUsuarios(@RequestBody usuario usuario){
        
        //encriptacion de contraseñas con argon2
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String PasswordHash = argon2.hash(1, 1024, 1, usuario.getClave());
        usuario.setClave(PasswordHash);

        usuarioDao.registrar(usuario);
    }

    //Eliminar usuario Tabla
    @RequestMapping(value = "api/usuarios/{usuario}", method = RequestMethod.DELETE)
    public void eliminar(@PathVariable String usuario){
        usuarioDao.eliminarUsuario(usuario);
    }

    //editar usuario
    @RequestMapping(value = "api/usuarios/editar", method = RequestMethod.PUT)
    public void editarUsuario(@RequestBody usuario usuario){

        usuarioDao.editar(usuario);
    }

    //Listar usuario especifico 
    @RequestMapping(value = "api/usuarios/{usuario}", method = RequestMethod.GET)
    public usuario ObtenerUsuario(@PathVariable String usuario){
        
        usuario user = usuarioDao.ObtenerUsuarioEspecifico(usuario);
        if(user != null) {
            return user;
        } else {
            return null;
        }
    }

    // Listar usuario por usuario
    @RequestMapping(value = "api/usuarios/existe/{usuario}", method = RequestMethod.GET)
    public List<usuario> verificarUsuarioExistente(@PathVariable String usuario) {
        List<usuario> lista = usuarioDao.buscarUsuarioExistente(usuario);
        return lista;
    }

    //Listar usuario por cedula 
    @RequestMapping(value = "api/usuarios/cedula/{usuario}", method = RequestMethod.GET)
    public List<usuario> verificarCedulaExistente(@PathVariable String usuario) {
        List<usuario> lista = usuarioDao.buscarCedulaExistente(usuario);
        return lista;
    }

    //Listar usuario por email 
    @RequestMapping(value = "api/usuarios/email/{usuario}", method = RequestMethod.GET)
    public List<usuario> verificarEmailExistente(@PathVariable String usuario) {
        List<usuario> lista = usuarioDao.buscarEmailExistente(usuario);
        return lista;
    }

    //Iniciar sesion usuario
    @RequestMapping(value = "api/login", method = RequestMethod.POST)
    public String login(@RequestBody usuario usuario){
        
        usuario usuarioLogueado = usuarioDao.ObtenerCredenciales(usuario);

        if ( usuarioLogueado != null){

            String nombreCompleto = usuarioLogueado.getNombres() + " " + usuarioLogueado.getApellidos();
            String tokenJwt = jwtUtil.create(usuarioLogueado.getUsuario(), usuarioLogueado.getEmail(), String.valueOf(usuarioLogueado.getID_Rol()), nombreCompleto);
            return tokenJwt; 
        }
        return "Fail";
    }

}