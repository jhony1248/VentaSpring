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
@Table(name = "clientes")
public class clientes {
    //esta anotacion sirve para definir la clave principal 
    @Id
    //auto incrementado del id
    //@column sirve para referenciar la columna de un tabla 
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Getter @Setter @Column(name = "ID_Cliente")
    private int ID_Cliente;

    @Getter @Setter @Column(name = "Nombres")
    private String Nombres;

    @Getter @Setter @Column(name = "Apellidos")
    private String Apellidos;

    @Getter @Setter @Column(name = "Sexo")
    private String Sexo;

    @Getter @Setter @Column(name = "Cedula")
    private String Cedula;

    @Getter @Setter @Column(name = "Email")
    private String Email;

    @Getter @Setter @Column(name = "Telefono")
    private String Telefono;

    @Getter @Setter @Column(name = "Direccion")
    private String Direccion;

}
