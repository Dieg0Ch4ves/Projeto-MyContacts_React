import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ButtonPassword, ButtonSubmit, Form, Input,
} from './style';
import olho from '../../assets/imgs/olho.png';
import olhoFechado from '../../assets/imgs/olho-fechado.png';
import UsuarioService from '../../services/UsuarioService';
import Loader from '../../components/Loader';
import delay from '../../services/utils/delay';

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [cad, setCad] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    try {
      setIsLoading(true);
      await delay(500);
    } finally {
      setIsLoading(false);
    }
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const usuario = {
      nome,
      email,
      senha,
    };

    UsuarioService.criarUsuario(usuario);
    setCad(true);
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    // eslint-disable-next-line react/jsx-no-bind
    <Form onSubmit={handleSubmit}>
      <Loader isLoading={isLoading} />
      <div>
        <Input
          type="text"
          placeholder="Nome :"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
        />
      </div>
      <div>
        <Input
          type="email"
          placeholder="Email :"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div>
        <Input
          type={showPassword ? 'new-password' : 'password'}
          placeholder="Senha :"
          value={senha}
          onChange={(event) => setSenha(event.target.value)}
        />
        <ButtonPassword type="button" onClick={toggleShowPassword}>
          <img src={showPassword ? olhoFechado : olho} alt="mostrar-senha" />
        </ButtonPassword>
      </div>
      <ButtonSubmit type="submit">Criar Usuário</ButtonSubmit>
      {cad ? (
        <p style={{ color: 'green' }}>Usuario cadastrado com Sucesso !</p>
      ) : (
        <p>Preecha o formúlario</p>
      )}
      <Link to="/login">Ja tem Cadastro ?</Link>
    </Form>
  );
}
