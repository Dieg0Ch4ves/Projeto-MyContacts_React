package MyContactsBack.MyContactsBack.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import MyContactsBack.MyContactsBack.entity.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long>{
	public Usuario findByEmailAndSenha(String email, String senha);
	public Usuario findByEmail(String email);
}
