package com.control.compraventa.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.control.compraventa.dao.CompraDao;
import com.control.compraventa.models.compra;

@RestController
public class CompraControllers {

    @Autowired
    private CompraDao compraDao;

    //añadir nueva compra
    @RequestMapping(value = "api/compra", method = RequestMethod.POST)
    public void registrarCompra(@RequestBody compra compra){

        compraDao.registrar(compra);
    }


}