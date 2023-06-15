package MyContactsBack.MyContactsBack.service;

import java.util.Date;

import javax.crypto.SecretKey;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import MyContactsBack.MyContactsBack.entity.Usuario;
import MyContactsBack.MyContactsBack.repository.UsuarioRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Service
public class AuthService {

	@Autowired
	private UsuarioRepository usuarioRepository;
	
	public SecretKey chave = Keys.secretKeyFor(SignatureAlgorithm.HS256);

	public String authenticate(String email, String senha) {
		Usuario usuario = usuarioRepository.findByEmail(email);
		if (usuario != null) {
			if (BCrypt.checkpw(senha, usuario.getSenha())) {
				String token = Jwts.builder().setSubject(usuario.getId().toString())
						.setExpiration(new Date(System.currentTimeMillis() + 3600000))
						.signWith(chave, SignatureAlgorithm.HS256).compact();
				return token;
			} else {
				System.out.println("Senha inválida !");
				return null;
			}
		} else {
			System.out.println("Usuário não encontrado !");
			return null;
		}
	}

	public static Claims parseToken(String token, String secret) throws JwtException {
		return Jwts.parserBuilder().setSigningKey(secret).build().parseClaimsJws(token).getBody();
	}
}
