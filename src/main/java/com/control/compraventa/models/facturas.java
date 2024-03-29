package com.control.compraventa.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;

@Entity
//referencia a la tabla de la base de datos que vamos a usar
@Table(name = "facturas")
public class facturas {
    //esta anotacion sirve para definir la clave principal 
    @Id
    //@column sirve para referenciar la columna de un tabla 
    @Getter @Setter @Column(name = "Num_Factura")
    private String Num_Factura;

    @Getter @Setter @Column(name = "Fecha")
    @JsonFormat(pattern = "dd/MM/yyyy")
    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    private LocalDate Fecha;

    @Getter @Setter @Column(name = "Venta_Total")
    private float Venta_Total;

    @Getter @Setter @Column(name = "Sub_Total")
    private float Sub_Total;

    @Getter @Setter @Column(name = "Iva")
    private float Iva;

    @Getter @Setter @Column(name = "Total")
    private float Total;

    @Getter @Setter @Column(name = "ID_Cliente")
    private int ID_Cliente;

    @Getter @Setter @Column(name = "Usuario")
    private String Usuario;

}
