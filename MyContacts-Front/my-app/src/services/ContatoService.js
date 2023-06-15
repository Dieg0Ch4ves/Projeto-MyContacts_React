import HttpClient from './utils/HttpClient';

class ContatoService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:8080');
  }

  criarContato(idUsuario, contato) {
    return this.httpClient.post(`/contato/${idUsuario}`, contato);
  }

  altertarOrderBy(idUsuario) {
    return this.httpClient.post(`/usuario/${idUsuario}/ordenacao`);
  }

  contatoPorId(idContato) {
    return this.httpClient.get(`/contato/contatoId/${idContato}`);
  }

  alterarContato(idContato, contato) {
    return this.httpClient.put(`/contato/${idContato}`, contato);
  }

  deletarContato(idUsuario, idContato) {
    return this.httpClient.delete(`/contato/${idUsuario}/${idContato}`);
  }
}

export default new ContatoService();
