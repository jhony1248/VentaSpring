package com.control.compraventa.dao;

import java.util.List;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.control.compraventa.models.usuario;

import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Repository
@Transactional

public class UsuarioDaoImp implements UsuarioDao {

    @PersistenceContext
    EntityManager entityManager;

    private static final String nombreTabla = "usuario";

    @Override
    @SuppressWarnings("unchecked")
    public List<usuario> getUsuarios() {
        String query = "FROM " + nombreTabla;
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public void eliminarUsuario(String usuario) {
        usuario BuscarUsuarioEliminar = entityManager.find(usuario.class, usuario);
        entityManager.remove(BuscarUsuarioEliminar);
        entityManager.close();
    }

    @Override
    public void registrar(usuario usuario) {
        entityManager.merge(usuario);
        entityManager.close();
    }

    // Codigo para editar usuario
    @Override
    public void editar(usuario usuario) {
        entityManager.merge(usuario);
    }

    // Codigo para traer un unico usaurio especifico utilizado principalmente en el editar
    @Override
    public usuario ObtenerUsuarioEspecifico(String usuario) {
        String query = "FROM " + nombreTabla + " WHERE Usuario = :usuario";
        return (usuario) entityManager.createQuery(query)
                .setParameter("usuario", usuario)
                .getSingleResult();// esta funcion sirve para traer solo 1 dato si es mas o menos da un error
    }

    // Codigo para verificar si el usuario existe
    @Override
    @SuppressWarnings("unchecked")
    public List<usuario> buscarUsuarioExistente(String usuario) {
        String query = "FROM " + nombreTabla + " WHERE Usuario = :usuario";
        List<usuario> lista = entityManager.createQuery(query)
        .setParameter("usuario", usuario)
        .getResultList();
        return lista;
    }

    // Codigo para verificar si la cedula existe
    @Override
    @SuppressWarnings("unchecked")
    public List<usuario> buscarCedulaExistente(String usuario) {
        String query = "FROM " + nombreTabla + " WHERE Cedula = :usuario";
        List<usuario> lista = entityManager.createQuery(query)
        .setParameter("usuario", usuario)
        .getResultList();
        return lista;
    }

    // Codigo para verificar si el email existe
    @Override
    @SuppressWarnings("unchecked")
    public List<usuario> buscarEmailExistente(String usuario) {
        String query = "FROM " + nombreTabla + " WHERE Email = :usuario";
        List<usuario> lista = entityManager.createQuery(query)
        .setParameter("usuario", usuario)
        .getResultList();
        return lista;
    }

    // Funcion para verificar los datos del login
    @Override
    @SuppressWarnings("unchecked")
    public usuario ObtenerCredenciales(usuario usuario) {
        String query = "FROM " + nombreTabla + " WHERE Email = :email";
        List<usuario> lista = entityManager.createQuery(query)
                .setParameter("email", usuario.getEmail())
                .getResultList();
        entityManager.close();

        if (lista.isEmpty()) {
            return null;
        }

        // Almacenamos la contraseña encriptada en una variable
        String passwordHashed = lista.get(0).getClave();

        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        if (argon2.verify(passwordHashed, usuario.getClave())) {
            return lista.get(0);
        }
        return null;
    }

}
