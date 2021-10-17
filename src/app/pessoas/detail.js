import { html } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js'
import { StyledComponent } from '../../core/styled-component.js';
import { ValueTest } from '../../core/utils/value-test.js';
import { Cpf } from './domain/cpf.js';
import { Email } from './domain/email.js';
import { pessoaService } from './service/pessoa-service.js';

class Detail extends StyledComponent {
    static get properties() {
        return {
            item: {},
            error: {},
            message: {}
        }
    }

    constructor() {
        super()
        this.item = null;
        this.message = "";

        this.error = {
            nome: null,
            email: null,
            cpf: null,
            nascimento: null
        };
    }

    _changeItemProperty(property, value) {
        let obj = { ...this.item }
        obj[property] = value;
        this.item = obj;
    }

    _changeItemPropertyAndError(property, value) {
        this._changeItemProperty(property, value);

        let error = { ...this.error }
        error[property] = null;
        this.error = error
    }

    _alterarDataDeNascimento(value) {
        try {
            this.item.nascimento = new Date(value).toISOString();
        } catch(e) {
            this.item.nascimento = '';
        } finally {
            this.error.nascimento = null
        }
    }

    _renderizarOpcoesDeGenero() {
        let opcoes = [];

        if (this.item.genero) {
            opcoes.push(html`<option ?selected=${this.item.genero === "MASCULINO" } value="MASCULINO">Masculino</option>`);
            opcoes.push(html`<option ?selected=${this.item.genero ==="FEMININO" } value="FEMININO">Feminino</option>`);
        } else {
            opcoes.push(html`<option selected disabled hidden value="NAO_INFORMADO">Não informado</option>`);
            opcoes.push(html`<option value="MASCULINO">Masculino</option>`);
            opcoes.push(html`<option value="FEMININO">Feminino</option>`);
        }
        
        return opcoes;
    }

    _validar() {
        let errors = {};

        if (!this.item.nome) {
            errors.nome = "Deve ser informado";
        }

        if (ValueTest.isEmpty(this.item.cpf)) {
            errors.cpf = "Deve ser informado";
        } else {
            try {
                Cpf.validate(this.item.cpf);
            } catch (e) {
                errors.cpf = e.message;
            }
        }

        if (!ValueTest.isEmpty(this.item.email)) {
            try {
                Email.validate(this.item.email);
            } catch (e) {
                errors.email = e.message;
            }
        }

        if (ValueTest.isEmpty(this.item.nascimento)) {
            errors.nascimento = "Deve ser informada";
        } else if (ValueTest.dateIsIntheFuture(this.item.nascimento)) {
            errors.nascimento = "Data inválida"
        }

        this.error = errors;

        return Object.keys(errors).length == 0;
    }

    _validarEGravar() {
        try {
            if (this._validar()) {
                if (this.item.id) {
                    pessoaService.patch(this.item).then(response => 
                        this.dispatchEvent(new CustomEvent('on-save', { detail: response }))
                    );
                } else {
                    pessoaService.post(this.item).then(response =>
                        this.dispatchEvent(new CustomEvent('on-create', { detail: response }))
                    );
                }
            }
        } catch (e) {
            if (e.message.contains('error:')) {
                this.error = json.parse(e.message)
            } else {
                this.message = `Erro na gravação do registro:\n${e.message}`;
            }
        }
    }

    _cancelar() {
        this.dispatchEvent(new CustomEvent('on-cancel'));
    }

    renderMe() {
        return html`
            <div class="container is-fluid">
                <section class="section">
                    <div class="level">
                        <div class="level-left">
                            <h1 class="title">Novo registro</h1>
                        </div>
                    </div>
                </section>
                <div class="columns is-justify-content-center ${classMap({ 'is-hidden': !this.message })}">
                    <div class="column is-four-fifths">
                        <p class="notification is-danger">${this.message}</p>
                    </div>
                </div>
                <div class="columns is-justify-content-center">
                    <div class="column is-four-fifths">
                        <div class="field is-horizontal">
                            <div class="field-label is-normal">
                                <label for="nome">Nome:</label>
                            </div>
                            <div class="field-body">
                                <div class="field">
                                    <div class="control">
                                        <input class="input ${classMap({ 'is-danger': this.error.nome })}}" type="text" name="nome"
                                            value=${this.item.nome ? this.item.nome : ''} 
                                            @change=${e => this._changeItemPropertyAndError('nome', e.target.value)}}>
                                        <p class="help is-danger">${this.error.nome}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="field is-horizontal">
                            <div class="field-label is-normal">
                                <label for="nome">Gênero:</label>
                            </div>
                            <div class="field-body">
                                <div class="field">
                                    <div class="control">
                                        <div class="select">
                                            <select @change=${e => this._changeItemProperty('genero', e.target.value)}>
                                                ${this._renderizarOpcoesDeGenero()}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="field is-horizontal">
                            <div class="field-label is-normal">
                                <label for="email">E-mail:</label>
                            </div>
                            <div class="field-body">
                                <div class="field">
                                    <div class="control">
                                        <input class="input ${classMap({ 'is-danger': this.error.email })}}" type="email"
                                            name="email" value=${this.item.email ? this.item.email : ''} @change=${e =>
                this._changeItemPropertyAndError('email', e.target.value)}>
                                        <p class="help is-danger">${this.error.email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="field is-horizontal">
                            <div class="field-label is-normal">
                                <label for="cpf">CPF:</label>
                            </div>
                            <div class="field-body">
                                <div class="field">
                                    <div class="field">
                                        <div class="control">
                                            <input class="input ${classMap({ 'is-danger': this.error.cpf })}}" type="text"
                                                name="cpf" value=${this.item.cpf ? this.item.cpf : ''} @change=${e =>
                                            this._changeItemPropertyAndError('cpf', e.target.value)}>
                                            <p class="help is-danger">${this.error.cpf}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="field is-horizontal">
                            <div class="field-label is-normal">
                                <label for="nascimento">Nascimento:</label>
                            </div>
                            <div class="field-body">
                                <div class="field">
                                    <div class="control">
                                        <input class="input ${classMap({ 'is-danger': this.error.nascimento })}}" type="date"
                                            name="nascimento" .value=${this.item.nascimento ? this.item.nascimento.substring(0, 10) : ''} 
                                            @change=${e => this._alterarDataDeNascimento(e.target.value)}>
                                        <p class="help is-danger">${this.error.nascimento}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="field is-horizontal">
                            <div class="field-label is-normal">
                                <label for="naturalidade">Natural de:</label>
                            </div>
                            <div class="field-body">
                                <div class="field">
                                    <div class="control">
                                        <input class="input" type="text" name="naturalidade" value=${this.item.naturalidade ?
                this.item.naturalidade : ''} @change=${e => this._changeItemProperty('naturalidade',
                    e.target.value)}>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="field is-horizontal">
                            <div class="field-label is-normal">
                                <label for="nacionalidade">Nacionalidade:</label>
                            </div>
                            <div class="field-body">
                                <div class="field">
                                    <div class="control">
                                        <input class="input" type="text" name="nacionalidade" value=${this.item.nacionalidade ?
                this.item.nacionalidade : ''} @change=${e => this._changeItemProperty('nacionalidade',
                    e.target.value)}>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="field is-grouped is-grouped-right">
                            <div class="control">
                                <button class="button is-primary" @click=${this._validarEGravar}>Gravar</button>
                            </div>
                            <div class="control">
                                <button class="button" @click=${this._cancelar}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
    }
}

customElements.define("formulario-pessoas", Detail);