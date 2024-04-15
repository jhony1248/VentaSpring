package com.control.compraventa.dao;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import com.control.compraventa.models.detalle_compra;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Repository
@Transactional

public class DetalleCompraDaoImp implements DetalleCompraDao {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public void registrar(detalle_compra detalle_compra) {
        entityManager.merge(detalle_compra);
        entityManager.close();
    }

}
