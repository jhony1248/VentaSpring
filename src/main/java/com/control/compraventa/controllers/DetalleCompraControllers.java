package com.control.compraventa.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.control.compraventa.dao.DetalleCompraDao;
import com.control.compraventa.models.detalle_compra;

@RestController
public class DetalleCompraControllers {

    @Autowired
    private DetalleCompraDao detalleCompraDao;

    @RequestMapping(value = "api/detalleCompra", method = RequestMethod.POST)
    public void registrarFacturas(@RequestBody detalle_compra detalle_compra){

        detalleCompraDao.registrar(detalle_compra);
    }


}