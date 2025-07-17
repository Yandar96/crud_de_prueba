package com.tutorial.crud_de_prueba.repository;

import com.tutorial.crud_de_prueba.model.Cargo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CargoRepository extends JpaRepository<Cargo, Long> {
}