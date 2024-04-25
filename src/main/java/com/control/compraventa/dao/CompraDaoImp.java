package com.control.compraventa.dao;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import com.control.compraventa.models.compra;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Repository
@Transactional

public class CompraDaoImp implements CompraDao {

    @PersistenceContext
    EntityManager entityManager;

    private static final String nombreTabla = "compra";

    @Override
    public void registrar(compra compra) {
        entityManager.merge(compra);
        entityManager.close();
    }

    // Codigo para traer un unico numero de venta especifico
    @Override
    public String ObtenerNumeroCompraEspecifico() {
        String query = "SELECT ID_Compra FROM " + nombreTabla + " ORDER BY ID_Compra DESC LIMIT 1";
        try {
            return (String) entityManager.createQuery(query).getSingleResult();
        } catch(Exception exception){
            // Manejar la excepción cuando no hay resultados encontrados
            return "0";
        }
    }

}
