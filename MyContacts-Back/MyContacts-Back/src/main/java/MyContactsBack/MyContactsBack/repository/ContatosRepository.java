package MyContactsBack.MyContactsBack.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import MyContactsBack.MyContactsBack.entity.Contatos;

public interface ContatosRepository extends JpaRepository<Contatos, Long> {

}
