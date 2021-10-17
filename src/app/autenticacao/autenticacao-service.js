class AutenticacaoService {
    _getHeader() {
        return {
                'Access-Control-Allow-Origin': '*'
            };
    }

    async post(autenticacao) {
        return fetch('http://localhost:8080/api/v1/autenticacoes', {
            method: 'POST',
            mode: "cors",
            headers: this._getHeader(),
            body: autenticacao.toJson()
        }).then(async response => {
            const json = await response.json();
            
            if (response.ok) {
                localStorage.setItem("token", json.token);
            } else {
                throw new Error(json.message);
            }
        })
    }

    async logout() {
        let headers = this._getHeader();
        headers.authorization = this.getUserToken();

        return fetch('http://localhost:8080/api/v1/autenticacoes', {
            method: 'DELETE',
            mode: "cors",
            headers
        }).finally(() => {
            localStorage.removeItem('token');
        });
    }

    isAuthenticated() {
        return !!localStorage.getItem('token');
    }

    getUserToken() {
        if (this.isAuthenticated()) {
            return 'Basic ' + localStorage.getItem('token');
        }

        return '';
    }
}

export const autenticacaoService = new AutenticacaoService();