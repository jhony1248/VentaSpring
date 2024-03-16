package com.control.compraventa.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.control.compraventa.dao.FacturaDao;
import com.control.compraventa.models.facturas;

@RestController
public class FacturaControllers {

    @Autowired
    private FacturaDao facturaDao;

    //añadir nueva factura
    @RequestMapping(value = "api/facturas", method = RequestMethod.POST)
    public void registrarFacturas(@RequestBody facturas factura){

        facturaDao.registrar(factura);
    }


}