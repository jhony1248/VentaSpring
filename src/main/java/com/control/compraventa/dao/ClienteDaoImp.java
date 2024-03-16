package com.control.compraventa.dao;

import java.util.List;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.control.compraventa.models.clientes;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Repository
@Transactional

public class ClienteDaoImp implements ClienteDao {

    @PersistenceContext
    EntityManager entityManager;

    private static final String nombreTabla = "clientes";

    @Override
    @SuppressWarnings("unchecked")
    public List<clientes> getClientes() {
        String query = "FROM " + nombreTabla;
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public void eliminarCliente(String cliente) {
        clientes BuscarClienteEliminar = entityManager.find(clientes.class, cliente);
        entityManager.remove(BuscarClienteEliminar);
        entityManager.close();
    }

    @Override
    public void registrarCliente(clientes cliente) {
        entityManager.merge(cliente);
        entityManager.close();
    }

    // Codigo para editar cliente
    @Override
    public void editarCliente(clientes cliente) {
        entityManager.merge(cliente);
    }

    // Codigo para traer un unico usaurio especifico utilizado principalmente en el editar
    @Override
    public clientes ObtenerClienteEspecifico(String cliente) {
        String query = "FROM " + nombreTabla + " WHERE ID_Cliente = :cliente";
        return (clientes) entityManager.createQuery(query)
                .setParameter("cliente", cliente)
                .getSingleResult();// esta funcion sirve para traer solo 1 dato si es mas o menos da un error
    }

    // Codigo para verificar si la cedula existe
    @Override
    @SuppressWarnings("unchecked")
    public List<clientes> buscarCedulaExistente(String cliente) {
        String query = "FROM " + nombreTabla + " WHERE Cedula = :cliente";
        List<clientes> lista = entityManager.createQuery(query)
        .setParameter("cliente", cliente)
        .getResultList();
        return lista;
    }

    // Codigo para verificar si el email existe
    @Override
    @SuppressWarnings("unchecked")
    public List<clientes> buscarEmailExistente(String cliente) {
        String query = "FROM " + nombreTabla + " WHERE Email = :cliente";
        List<clientes> lista = entityManager.createQuery(query)
        .setParameter("cliente", cliente)
        .getResultList();
        return lista;
    }

}
