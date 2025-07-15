package com.tutorial.crud_de_prueba.repository;

import com.tutorial.crud_de_prueba.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}
