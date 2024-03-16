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
@Table(name = "rol")
public class rol {
    //esta anotacion sirve para definir la clave principal 
    @Id
    //auto incrementado del id
    //@column sirve para referenciar la columna de un tabla 
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Getter @Setter @Column(name = "ID_Rol")
    private int ID_Rol;

    @Getter @Setter @Column(name = "Nombre_Rol")
    private String Nombre_Rol;

}
