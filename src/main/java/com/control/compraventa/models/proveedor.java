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
@Table(name = "proveedor")
public class proveedor {
    //esta anotacion sirve para definir la clave principal 
    @Id
    //auto incrementado del id
    //@column sirve para referenciar la columna de un tabla 
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Getter @Setter @Column(name = "ID_Proveedor")
    private int ID_Proveedor;

    @Getter @Setter @Column(name = "Nombre_Proveedor")
    private String Nombre_Proveedor;

    @Getter @Setter @Column(name = "Telefono_Proveedor")
    private String Telefono_Proveedor;

    @Getter @Setter @Column(name = "Direccion_Proveedor")
    private String Direccion_Proveedor;

    @Getter @Setter @Column(name = "Servicio")
    private String Servicio;

}
