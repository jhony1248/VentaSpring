package com.control.compraventa.dao;

import java.util.List;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import com.control.compraventa.models.proveedor;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Repository
@Transactional

public class ProveedorDaoImp implements ProveedorDao {

    @PersistenceContext
    EntityManager entityManager;

    private static final String nombreTabla = "proveedor";

    @Override
    @SuppressWarnings("unchecked")
    public List<proveedor> getProveedores() {
        String query = "FROM " + nombreTabla;
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public void eliminarProveedor(String proveedor) {
        proveedor BuscarProveedorEliminar = entityManager.find(proveedor.class, proveedor);
        entityManager.remove(BuscarProveedorEliminar);
        entityManager.close();
    }
    
     @Override
    public void registrarProveedor(proveedor proveedor) {
        entityManager.merge(proveedor);
        entityManager.close();
    }

    // Codigo para traer un unico proveedor especifico utilizado principalmente en el editar
    @Override
    public proveedor ObtenerProveedorEspecifico(String proveedor) {
        String query = "FROM " + nombreTabla + " WHERE ID_Proveedor = :proveedor";
        return (proveedor) entityManager.createQuery(query)
                .setParameter("proveedor", proveedor)
                .getSingleResult();// esta funcion sirve para traer solo 1 dato si es mas o menos da un error
    } 
     
    // Codigo para editar proveedor
    @Override
    public void editarProveedor(proveedor proveedor) {
        entityManager.merge(proveedor);
    }
    

}
