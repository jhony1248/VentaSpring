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

    @Override
    public void registrar(facturas factura) {
        entityManager.merge(factura);
        entityManager.close();
    }

}
