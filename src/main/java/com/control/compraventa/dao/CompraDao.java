package com.control.compraventa.dao;

import com.control.compraventa.models.compra;

public interface CompraDao {

    void registrar(compra compra);

    String ObtenerNumeroCompraEspecifico();

} 
    

