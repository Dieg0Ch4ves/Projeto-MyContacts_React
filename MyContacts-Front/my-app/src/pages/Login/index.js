import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  ButtonPassword, ButtonSubmit, Form, Input,
} from '../Cadastro/style';

import olho from '../../assets/imgs/olho.png';
import olhoFechado from '../../assets/imgs/olho-fechado.png';
import UsuarioService from '../../services/UsuarioService';
import Loader from '../../components/Loader';
import delay from '../../services/utils/delay';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(async () => {
    try {
      setIsLoading(true);
      await delay(500);
    } finally {
      setIsLoading(false);
    }
  }, []);

  async function handleLogin(event) {
    event.preventDefault();
    const usuarioLogin = {
      email,
      senha,
    };

    const response = await UsuarioService.logarUsuario(usuarioLogin);
    localStorage.setItem('token', response);
    history.push('/home');
    window.location.reload();
  }

  return (
    // eslint-disable-next-line react/jsx-no-bind
    <Form onSubmit={handleLogin}>
      <Loader isLoading={isLoading} />
      <div>
        <Input
          placeholder="Email :"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div>
        <Input
          placeholder="Senha :"
          value={senha}
          type={showPassword ? 'text' : 'password'}
          onChange={(event) => setSenha(event.target.value)}
        />
        <ButtonPassword type="button" onClick={toggleShowPassword}>
          <img src={showPassword ? olhoFechado : olho} alt="mostrar-senha" />
        </ButtonPassword>
      </div>
      <ButtonSubmit type="submit">Logar Usuário</ButtonSubmit>
      <Link to="/">Não tem Cadastro ?</Link>
    </Form>
  );
}
