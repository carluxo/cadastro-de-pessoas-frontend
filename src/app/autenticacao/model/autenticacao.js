export class Autenticacao {
    constructor() {
        this._usuario = "";
        this._senha = "";
    }

    get usuario() {
        return this._usuario;
    }

    set usuario(value) {
        this._usuario = value;
    }

    get senha() {
        return this._senha;
    }

    set senha(value) {
        this._senha = value;
    }

    toJson() {
        return JSON.stringify({ usuario: this._usuario, senha: this._senha });
    }
}