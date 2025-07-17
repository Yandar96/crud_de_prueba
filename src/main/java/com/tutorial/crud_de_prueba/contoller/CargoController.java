package com.tutorial.crud_de_prueba.contoller;

import com.tutorial.crud_de_prueba.model.Cargo;
import com.tutorial.crud_de_prueba.repository.CargoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cargos")
@CrossOrigin(origins = "*")
public class CargoController {

    @Autowired
    private CargoRepository cargoRepository;

    @GetMapping
    public List<Cargo> listar() {
        return cargoRepository.findAll();
    }

    @PostMapping
    public Cargo guardar(@RequestBody Cargo cargo) {
        return cargoRepository.save(cargo);
    }

    @PutMapping("/{id}")
    public Cargo actualizar(@PathVariable Long id, @RequestBody Cargo cargo) {
        cargo.setId(id);
        return cargoRepository.save(cargo);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        cargoRepository.deleteById(id);
    }
}
