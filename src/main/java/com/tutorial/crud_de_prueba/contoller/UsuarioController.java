package com.tutorial.crud_de_prueba.contoller;


import com.tutorial.crud_de_prueba.model.Usuario;
import com.tutorial.crud_de_prueba.repository.UsuarioRepository;
import org.springframework.web.bind.annotation.*;

        import java.util.List;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private final UsuarioRepository repository;

    public UsuarioController(UsuarioRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Usuario> listar() {
        return repository.findAll();
    }

    @PostMapping
    public Usuario crear(@RequestBody Usuario usuario) {
        return repository.save(usuario);
    }

    @GetMapping("/{id}")
    public Usuario obtener(@PathVariable Long id) {
        return repository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Usuario actualizar(@PathVariable Long id, @RequestBody Usuario usuario) {
        Usuario existente = repository.findById(id).orElse(null);
        if (existente != null) {
            existente.setNombre(usuario.getNombre());
            existente.setCorreo(usuario.getCorreo());
            return repository.save(existente);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
