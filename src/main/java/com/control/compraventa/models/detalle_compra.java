package com.control.compraventa.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
//referencia a la tabla de la base de datos que vamos a usar
@Table(name = "detalle_compra")
public class detalle_compra {
    
    @Id
    //auto incrementado del id
    //@column sirve para referenciar la columna de un tabla 
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Getter @Setter @Column(name = "ID")
    private int ID;

    @Getter @Setter @Column(name = "Num_Factura")
    private String Num_Factura;

    @Getter @Setter @Column(name = "ID_Producto")
    private int ID_Producto;

    @Getter @Setter @Column(name = "Cantidad")
    private float Cantidad;

}
