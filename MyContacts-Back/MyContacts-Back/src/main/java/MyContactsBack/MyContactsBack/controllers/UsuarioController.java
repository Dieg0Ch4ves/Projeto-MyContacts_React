package MyContactsBack.MyContactsBack.controllers;

import java.util.ArrayList;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import MyContactsBack.MyContactsBack.controllers.models.LoginDTO;
import MyContactsBack.MyContactsBack.controllers.models.UsuarioDTO;
import MyContactsBack.MyContactsBack.entity.Usuario;
import MyContactsBack.MyContactsBack.repository.UsuarioRepository;
import MyContactsBack.MyContactsBack.service.AuthService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;

@RestController
@RequestMapping("/usuario")
@CrossOrigin(origins = "*")
public class UsuarioController {

	@Autowired
	UsuarioRepository usuarioRepository;

	@Autowired
	private AuthService authService;

	@PostMapping
	public ResponseEntity<Object> novoUsuario(@Validated @RequestBody UsuarioDTO usuarioDto) {
		Usuario usuario = new Usuario(usuarioDto.nome(), usuarioDto.email(), usuarioDto.senha(), new ArrayList<>());
		String senhaCripto = BCrypt.hashpw(usuario.getSenha(), BCrypt.gensalt());
		usuario.setSenha(senhaCripto);
		usuarioRepository.save(usuario);
		return ResponseEntity.ok().build();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Object> usuarioPorId(@PathVariable Long id) {
		Usuario usuario = usuarioRepository.findById(id).get();
		return ResponseEntity.ok(usuario);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Object> atualizarUsuario(@PathVariable Long id, @RequestBody UsuarioDTO usuarioDto) {
		Usuario usuario = usuarioRepository.findById(id).get();
		usuario.setNome(usuarioDto.nome());
		usuario.setEmail(usuarioDto.email());
		usuario.setSenha(usuarioDto.senha());
		return ResponseEntity.ok(usuario);
	}

	@DeleteMapping("/{id}")
	public void deletarUsuario(@PathVariable Long id) {
		usuarioRepository.deleteById(id);
	}

	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody LoginDTO login) throws JsonProcessingException {
		String token = authService.authenticate(login.email(), login.senha());
		if (token != null) {
			ObjectMapper json = new ObjectMapper();
			String jsonResponse = json.writeValueAsString(token);
			return ResponseEntity.ok(jsonResponse);
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}

	}

	@GetMapping("/lista")
	public ResponseEntity<Usuario> obterUsuario(@RequestParam String token) {
		try {
			Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(authService.chave).build().parseClaimsJws(token);

			Long usuarioId = Long.parseLong(claims.getBody().getSubject());
			Usuario usuario = usuarioRepository.findById(usuarioId).orElse(null);
			if (usuario == null) {
				return ResponseEntity.notFound().build();
			}
			return ResponseEntity.ok(usuario);

		} catch (Exception ex) {
			return ResponseEntity.badRequest().build();
		}
	}
}
