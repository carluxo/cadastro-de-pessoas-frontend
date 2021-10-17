import { html, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import { StyledComponent } from '../../core/styled-component.js';
import { autenticacaoService } from './autenticacao-service.js';
import { Autenticacao } from './model/autenticacao.js';

class FormularioAutenticacao extends StyledComponent {
    static get properties() {
        return {
            autenticacao: { attribute: false },
            message: {}
        }
    }
    static get styles() {
        return [
            super.styles,
            css`
                :host {
                    justify-content: center;
                }
            `
        ]
    }

    constructor() {
        super()
        this.autenticacao = new Autenticacao();
        this.message = null;
    }

    _autenticar() {
        this.message = null;
        
        autenticacaoService.post(this.autenticacao).then(() => this.dispatchEvent(new CustomEvent('on-authenticated'))).catch(e => {
            this.message = e.message;
        });
    }

    _alterarUsuario({ target }) {
        this.autenticacao.usuario = target.value;
        this.autenticacao = Object.assign(this.autenticacao);
    }

    _alterarSenha({ target }) {
        this.autenticacao.senha = target.value;
        this.autenticacao = Object.assign(this.autenticacao);
    }

    renderMe() {
        return html`
            <div class="container is-max-desktop is-align-items-center">
                <section class="section">
                    <h1 class="title">Realize o login</h1>
                </section>
                <p class="notification is-danger ${classMap({'is-hidden': !this.message})}">${this.message}</p>
                <div class="field">
                    <div class="control">
                        <input class="input is-success" type="text" placeholder="Usuário" @change=${this._alterarUsuario}>
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <input class="input" type="password" placeholder="Senha" @change=${this._alterarSenha}>
                    </div>
                </div>
                <div>
                    <button class="button" @click=${this._autenticar}>Login</button>
                </div>
            </div>
        `;
    }
}

customElements.define('formulario-autenticacao', FormularioAutenticacao);