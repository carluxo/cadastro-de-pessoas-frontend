import { html, css } from 'lit-element';
import { StyledComponent } from '../../core/styled-component.js';

class FormularioAutenticacao extends StyledComponent {

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
    }

    renderMe() {
        return html`
            <div class="field">
                <div class="control">
                    <input class="input is-success" type="text" placeholder="Usuário">
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <input class="input" type="password" placeholder="Senha">
                </div>
            </div>
            <div>
                <button class="button">Login</button>
            </div>            
        `;
    }
}

customElements.define('formulario-autenticacao', FormularioAutenticacao);