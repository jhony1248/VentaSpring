package com.control.compraventa.dao;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import com.control.compraventa.models.facturas;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Repository
@Transactional

public class FacturaDaoImp implements FacturaDao {

    @PersistenceContext
    EntityManager entityManager;

    private static final String nombreTabla = "facturas";

    @Override
    public void registrar(facturas factura) {
        entityManager.merge(factura);
        entityManager.close();
    }

    // Codigo para traer un unico numero de venta especifico
    @Override
    public String ObtenerNumeroVentaEspecifico() {
        String query = "SELECT Num_Factura FROM " + nombreTabla + " ORDER BY Num_Factura DESC LIMIT 1";
        try {
            return (String) entityManager.createQuery(query).getSingleResult();
        } catch(Exception exception){
            // Manejar la excepción cuando no hay resultados encontrados
            return "0";
        }
    }

}
