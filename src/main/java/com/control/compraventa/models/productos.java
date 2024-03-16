package com.control.compraventa.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
//referencia a la tabla de la base de datos que vamos a usar
@Table(name = "productos")
public class productos {
    //esta anotacion sirve para definir la clave principal 
    @Id
    //auto incrementado del id
    //@column sirve para referenciar la columna de un tabla 
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Getter @Setter @Column(name = "ID_Productos")
    private int ID_Productos;

    @Getter @Setter @Column(name = "Nombre")
    private String Nombre;

    @Getter @Setter @Column(name = "Marca")
    private String Marca;

    @Getter @Setter @Column(name = "Contenido_Neto")
    private String Contenido_Neto;

    @Getter @Setter @Column(name = "Descripcion")
    private String Descripcion;

    @Getter @Setter @Column(name = "Stock")
    private int Stock;

    @Getter @Setter @Column(name = "Precio_Venta")
    private float Precio_Venta;

    @Getter @Setter @Column(name = "Precio_Compra")
    private float Precio_Compra;

    @Lob // Para especificar un objeto grande en la base de datos (como la imagen)
    @Getter @Setter @Column(name = "Imagen", columnDefinition = "LONGBLOB")
    private byte[] imagen;

    @Getter @Setter @Column(name = "ID_Proveedor")
    private int ID_Proveedor;

}
