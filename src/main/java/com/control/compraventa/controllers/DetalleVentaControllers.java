package com.control.compraventa.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.control.compraventa.dao.DetalleVentaDao;
import com.control.compraventa.models.detalle_venta;

@RestController
public class DetalleVentaControllers {

    @Autowired
    private DetalleVentaDao detalleVentaDao;

    //añadir nueva factura
    @RequestMapping(value = "api/detalleVenta", method = RequestMethod.POST)
    public void registrarFacturas(@RequestBody detalle_venta detalle_venta){

        detalleVentaDao.registrar(detalle_venta);
    }


}