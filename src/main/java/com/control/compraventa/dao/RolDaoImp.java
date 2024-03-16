package com.control.compraventa.dao;

import java.util.List;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.control.compraventa.models.rol;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Repository
@Transactional

public class RolDaoImp implements RolDao{

    @PersistenceContext
    EntityManager entityManager;

    // Variable global para el nombre de la tabla
    private static final String nombreTabla = "rol";

    @Override
    @SuppressWarnings("unchecked")
    public List<rol> getRol() {
        String query = "FROM " + nombreTabla;
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public void registrarRol(rol rol) {
        entityManager.merge(rol);
        entityManager.close();
    }

    @Override
    public void eliminarRol(int rol) {
        rol BuscarRolEliminar = entityManager.find(rol.class, rol);
        entityManager.remove(BuscarRolEliminar);

        // Ejecutar la instrucción ALTER TABLE para reiniciar el autoincremento
        String query = "ALTER TABLE " + nombreTabla + " AUTO_INCREMENT = 1";
        entityManager.createNativeQuery(query).executeUpdate();
    }

    // Codigo para editar usuario
    @Override
    public void editarRol(rol rol) {
        entityManager.merge(rol);
    }

    // Codigo para traer un unico rol especifico utilizado principalmente en el editar
    @Override
    public rol ObtenerRolEspecifico(String rol) {
        String query = "FROM " + nombreTabla + " WHERE ID_Rol = :rol";
        return (rol) entityManager.createQuery(query)
                .setParameter("rol", rol)
                .getSingleResult();// esta funcion sirve para traer solo 1 dato si es mas o menos da un error
    }

    // Codigo para verificar si el usuario existe
    @Override
    @SuppressWarnings("unchecked")
    public List<rol> buscarRolExistente(String rol) {
        String query = "FROM " + nombreTabla + " WHERE Nombre_Rol = :rol";
        List<rol> lista = entityManager.createQuery(query)
        .setParameter("rol", rol)
        .getResultList();
        return lista;
    }

}
