package com.tutorial.crud_de_prueba.model;

import jakarta.persistence.*;

@Entity
@Table(name = "cargo")
public class Cargo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String dependencia;
    private Double salario;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre(){return nombre;}
    public void setNombre(String nombre) {this.nombre=nombre;}

    public String getDependencia() {return dependencia; }
    public void setDependencia(String dependencia) {this.dependencia = dependencia; }

    public Double getSalario() {return salario; }
    public void setSalario(Double salario) {this.salario = salario; }
}