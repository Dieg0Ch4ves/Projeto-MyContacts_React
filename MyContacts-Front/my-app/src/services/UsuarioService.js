import HttpClient from './utils/HttpClient';

class UsuarioService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:8080');
  }

  async criarUsuario(usuario) {
    return this.httpClient.post('/usuario', usuario);
  }

  async logarUsuario(usuario) {
    return this.httpClient.post('/usuario/login', usuario);
  }
}

export default new UsuarioService();
