import { autenticacaoService } from '../../autenticacao/autenticacao-service.js';
class PessoaService {
    _getHeader() {
        return {
                Authorization: autenticacaoService.getUserToken(),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            };
    }

    async _extractResponse(response) {
        if (response.ok) {
            return response.json();
        } else {
            let error = await response.json();

            if (response.status === 401) {
                localStorage.removeItem('token');
            }

            if (response.status === 422) {
                throw new Error(JSON.stringify(error));
            } else {
                throw new Error(error.message);
            }
        }
    }

    async post(pessoa) {
        return fetch('http://localhost:8080/api/v1/pessoas', {
            method: 'POST',
            headers: this._getHeader(),
            body: JSON.stringify(pessoa)
        }).then(this._extractResponse);
    }

    async patch(pessoa) {
        return fetch('http://localhost:8080/api/v1/pessoas/' + pessoa.id, {
            method: 'PATCH',
            headers: this._getHeader(),
            body: JSON.stringify(pessoa)
        }).then(this._extractResponse);
    }

    async findAll() {
        return fetch('http://localhost:8080/api/v1/pessoas', {
            method: 'GET',
            headers: this._getHeader(),
        }).then(this._extractResponse);
    }

    async delete(id) {
        return fetch('http://localhost:8080/api/v1/pessoas/' + id, {
            method: 'DELETE',
            headers: this._getHeader()
        });
    }
}

export const pessoaService = new PessoaService();