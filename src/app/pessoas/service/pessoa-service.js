class PessoaService {
    _extractResponse(response) {
        if (response.ok) {
            return response.json();
        }

        throw new Error(response.json())
    }

    async post(pessoa) {
        return fetch('http://localhost:8080/api/v1/pessoas', {
            method: 'POST',
            mode: "cors",
            body: JSON.stringify(pessoa)
        }).then(this._extractResponse);
    }

    async patch(pessoa) {
        return fetch('http://localhost:8080/api/v1/pessoas/' + pessoa.id, {
            method: 'PATCH',
            mode: "cors",
            body: JSON.stringify(pessoa)
        }).then(this._extractResponse);
    }

    async findAll() {
        return fetch('http://localhost:8080/api/v1/pessoas', {
            method: 'GET',
            mode: "cors"
        }).then(response => response.json());
    }

    async delete(id) {
        return fetch('http://localhost:8080/api/v1/pessoas/' + id, {
            method: 'DELETE',
            mode: "cors"
        });
    }
}

export const pessoaService = new PessoaService();