/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ButtonSubmit, Form, Input } from '../Cadastro/style';
import { Container, Select } from './style';
import Loader from '../../components/Loader';
import ContatoService from '../../services/ContatoService';
import formatPhone from '../../services/utils/formatPhone';
import arrow from '../../assets/imgs/arrow.svg';
import delay from '../../services/utils/delay';

export default function NovoContato() {
  const [usuario, setUsuario] = useState({});
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [redeSocial, setRedeSocial] = useState('');
  const [isLoading, setIsLoading] = useState(true);

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

  async function handleSubmit(event) {
    event.preventDefault();
    const contato = {
      nome,
      email,
      telefone,
      redeSocial,
    };

    const response = await ContatoService.criarContato(usuario.id, contato);
    if (response !== null) {
      setNome('');
      setEmail('');
      setTelefone('');
      setRedeSocial('');
    }
    alert('Contato Criado Com Sucesso !');
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />
      <Link className="link" to="/home">
        <img src={arrow} alt="back" />
        <span>Voltar</span>
      </Link>
      <Form onSubmit={handleSubmit}>
        <div>
          <Input
            placeholder="Nome :"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
          />
        </div>
        <div>
          <Input
            placeholder="Email :"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <Input
            placeholder="Telefone :"
            value={telefone}
            onChange={(event) => setTelefone(formatPhone(event.target.value))}
            maxLength="15"
          />
        </div>
        <div>
          <Select
            value={redeSocial}
            onChange={(event) => setRedeSocial(event.target.value)}
          >
            <option value={null}>REDE SOCIAL</option>
            <option value={0}>INSTAGRAM</option>
            <option value={1}>FACEBOOK</option>
            <option value={2}>LINKEDIN</option>
            <option value={3}>GITHUB</option>
          </Select>
        </div>
        <ButtonSubmit type="submit">Criar Contato</ButtonSubmit>
      </Form>
    </Container>
  );
}
