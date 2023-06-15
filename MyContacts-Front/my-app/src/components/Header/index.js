import React, { useEffect, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import Container from './style';

function Header() {
  const [logado, setLogado] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setLogado(!!localStorage.getItem('token'));
  }, [logado]);

  const sair = () => {
    localStorage.removeItem('token');
    history.push('login');
    window.location.reload();
  };

  return (
    <Container>
      <h1>
        My
        <span>Contacts</span>
      </h1>
      {logado ? null : (
        <>
          <a href="/">Cadastro</a>
          <a href="/login">Login</a>
        </>
      )}
      {logado ? <button className="botao-sair" type="button" onClick={sair}>Sair</button> : null}
    </Container>
  );
}

export default withRouter(Header);
