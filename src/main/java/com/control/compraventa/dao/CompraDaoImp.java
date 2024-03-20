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

    @Override
    public void registrar(compra compra) {
        entityManager.merge(compra);
        entityManager.close();
    }

}
