import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import lixo from '../../assets/imgs/trash.svg';
import edit from '../../assets/imgs/edit.svg';

import { Banner, Card, Container } from './style';
import Loader from '../../components/Loader';
import ContatoService from '../../services/ContatoService';
import delay from '../../services/utils/delay';

export default function Home() {
  const [usuario, setUsuario] = useState({ listaContatos: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContatos = usuario.listaContatos.filter((contato) => (
    contato.nome.toLowerCase().includes(searchTerm.toLowerCase())
  ));

  const obterUsuario = (token) => {
    fetch(`http://localhost:8080/usuario/lista?token=${token}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Erro ao obter usuário');
      })
      .then((usuarioToken) => {
        setUsuario(usuarioToken);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    async function usuarioListar() {
      try {
        setIsLoading(true);

        await delay(500);
        const token = localStorage.getItem('token');
        obterUsuario(token);
      } catch (error) {
        console.log('Erro', error);
      } finally {
        setIsLoading(false);
      }
    }

    usuarioListar();
  }, []);

  function deletarContato(contatoId) {
    if (window.confirm('Deseja realmente excluir o contato ?')) {
      ContatoService.deletarContato(usuario.id, contatoId)
        .then(() => {
          setUsuario((prevUsuario) => ({
            ...prevUsuario,
            listaContatos: prevUsuario.listaContatos.filter(
              (contato) => contato.id !== contatoId,
            ),
          }));
        })
        .catch((error) => {
          console.error('Erro ao excluir contato', error);
        });
    }
  }

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />
      <Banner>
        <input value={searchTerm} type="text" placeholder="Pesquise pelo nome..." onChange={handleChangeSearchTerm} />
        <div className="header-banner">
          <h2>
            <span>
              {filteredContatos.length}
              {' '}
            </span>
            {filteredContatos.length === 1 ? 'Contato' : 'Contatos'}
          </h2>
          <Link to="/novoContato">Novo Contato</Link>
        </div>
      </Banner>
      {filteredContatos && filteredContatos.length > 0 ? (
        filteredContatos.map((contatos) => (
          <Card key={contatos.id}>
            <div className="div1-banner">
              <h1>{contatos.nome}</h1>
              <h2>{contatos.redeSocial}</h2>
              <p>{contatos.email}</p>
              <p>{contatos.telefone}</p>
            </div>
            <div className="div2-banner">
              <Link to={`/alterarContato/${contatos.id}`}>
                <img href className="edit" src={edit} alt="edit" />
              </Link>
              <button
                className="trash"
                type="button"
                onClick={() => deletarContato(contatos.id)}
              >
                <img src={lixo} alt="lixo" />
              </button>
            </div>
          </Card>
        ))
      ) : (
        <p>Nenhum contato encontrado.</p>
      )}
    </Container>
  );
}
