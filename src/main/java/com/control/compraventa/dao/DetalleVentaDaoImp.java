package com.control.compraventa.dao;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.control.compraventa.models.detalle_venta;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Repository
@Transactional

public class DetalleVentaDaoImp implements DetalleVentaDao {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public void registrar(detalle_venta detalle_venta) {
        entityManager.merge(detalle_venta);
        entityManager.close();
    }

}
