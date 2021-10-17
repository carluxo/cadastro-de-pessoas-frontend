import { html } from 'lit-element';
import { StyledComponent } from './core/styled-component.js';
import Navigo from 'navigo';
import { classMap } from 'lit-html/directives/class-map.js'
import './app/autenticacao/index.js';
import './app/pessoas/index.js';
import './app/pessoas/detail.js';
import { autenticacaoService } from './app/autenticacao/autenticacao-service.js';

export class Index extends StyledComponent {
    static get properties() {
        return {
            route: {}
        }
    }
    constructor() {
        super();
        this.router = new Navigo("/", true, "#!");

        this.router
            .on('/', () => {
                if (autenticacaoService.isAuthenticated()) {
                    this.router.navigate('/pessoas');
                } else {
                    this.route = html`<formulario-autenticacao @on-authenticated=${this._onAuthenticated}></formulario-autenticacao>`;
                }
            })
            .on('/pessoas', () => {
                if (!autenticacaoService.isAuthenticated()) {
                    this.router.navigate('/');
                } else {
                    this.route = html`<tabela-pessoas></tabela-pessoas>`
                }
            })
            .resolve();
    }

    _onAuthenticated() {
        this.router.navigate('/pessoas');
    }

    _logout() {
        autenticacaoService.logout().then(() => {
            this.router.navigate("/");
        });
    }

    renderMe() {
        return html`
        <nav class="navbar is-primary">
            <div class="navbar-brand">
                <a class="navbar-item" href="#">
                    Carlos Eduardo Wayand
                </a>
            </div>
            <div class="navbar-start">
            </div>
            <div class="navbar-end m-0">
                <div class="navbar-item"><button class="button ${classMap({'is-hidden': !autenticacaoService.isAuthenticated()})}" @click=${this._logout}>Logout</button></div>
            </div>
        </nav>
        <div id="main">
            ${this.route}
        </div>
        `;
    }
}

customElements.define('cadastro-de-pessoas', Index);
