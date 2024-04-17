package com.control.compraventa.dao;

import java.util.List;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import com.control.compraventa.models.productos;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Repository
@Transactional

public class ProductoDaoImp implements ProductoDao {

    @PersistenceContext
    EntityManager entityManager;

    private static final String nombreTabla = "productos";

    @Override
    @SuppressWarnings("unchecked")
    public List<productos> getProductos() {
        String query = "FROM " + nombreTabla;
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public void eliminarProducto(String producto) {
        productos BuscarProductoEliminar = entityManager.find(productos.class, producto);
        entityManager.remove(BuscarProductoEliminar);

        // Ejecutar la instrucción ALTER TABLE para reiniciar el autoincremento
        String query = "ALTER TABLE " + nombreTabla + " AUTO_INCREMENT = 1";
        entityManager.createNativeQuery(query).executeUpdate();
        entityManager.close();
    }

    @Override
    public void registrarProducto(productos producto) {
        entityManager.merge(producto);
        entityManager.close();
    }

    // Codigo para traer un unico producto especifico utilizado principalmente en el
    // editar
    @Override
    public productos ObtenerProductoEspecifico(String producto) {
        String query = "FROM " + nombreTabla + " WHERE ID_Productos = :producto";
        return (productos) entityManager.createQuery(query)
                .setParameter("producto", producto)
                .getSingleResult();// esta funcion sirve para traer solo 1 dato si es mas o menos da un error
    }

    // Codigo para editar producto
    @Override
    public void editarProducto(productos producto) {
        entityManager.merge(producto);
    }

    @Override
    public void actualizarStock(int idProducto, int cantidad) {
        String query = "UPDATE productos SET Stock = Stock - :cantidad WHERE ID_Productos = :idProducto";

        int filasActualizadas = entityManager.createQuery(query)
                                             .setParameter("cantidad", cantidad)
                                             .setParameter("idProducto", idProducto)
                                             .executeUpdate();

        if (filasActualizadas == 0) {
            System.out.println("El producto con ID " + idProducto + " no existe.");
        }
    }

}
