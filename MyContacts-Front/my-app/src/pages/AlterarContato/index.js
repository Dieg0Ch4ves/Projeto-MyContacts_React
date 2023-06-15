/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { ButtonSubmit, Form, Input } from '../Cadastro/style';
import { Container, Select } from '../NovoContato/style';
import ContatoService from '../../services/ContatoService';
import arrow from '../../assets/imgs/arrow.svg';
import formatPhone from '../../services/utils/formatPhone';
import delay from '../../services/utils/delay';
import Loader from '../../components/Loader';

export default function AlterarContato() {
  const [contato, setContato] = useState({});
  const [nome, setNome] = useState(contato.nome);
  const [email, setEmail] = useState(contato.email);
  const [telefone, setTelefone] = useState(contato.telefone);
  const [redeSocial, setRedeSocial] = useState(contato.redeSocial);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function carregarContato() {
      try {
        setIsLoading(true);
        await delay(500);
        const response = await fetch(`http://localhost:8080/contato/contatoId/${id}`);
        const data = await response.json();
        setContato(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    carregarContato();
  }, [id]);

  useEffect(() => {
    if (contato.nome) setNome(contato.nome);
    if (contato.email) setEmail(contato.email);
    if (contato.telefone) setTelefone(contato.telefone);
    if (contato.redeSocial) setRedeSocial(contato.redeSocial);
  }, [contato]);

  async function handleSubmit(event) {
    event.preventDefault();

    const contatoDto = {
      nome,
      email,
      telefone,
      redeSocial,
    };
    ContatoService.alterarContato(id, contatoDto);
    alert('Contato  Alterado Com Sucesso !');
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />
      <Form key={contato.id} onSubmit={handleSubmit}>
        <Link className="link" to="/home">
          <img src={arrow} alt="back" />
          <span>Voltar</span>
        </Link>
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
            <option value="default">REDE SOCIAL</option>
            <option value={0}>INSTAGRAM</option>
            <option value={1}>FACEBOOK</option>
            <option value={2}>LINKEDIN</option>
            <option value={3}>GITHUB</option>
          </Select>
        </div>
        <ButtonSubmit type="submit">Alterar Contato</ButtonSubmit>
      </Form>
    </Container>
  );
}
