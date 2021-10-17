import { html } from 'lit-element';
import { StyledComponent } from './core/styled-component.js';
import './app/autenticacao/index.js';
import './app/pessoas/index.js';
import './app/pessoas/detail.js';

export class Index extends StyledComponent {
    constructor() {
        super();
    }

    renderMe() {
        return html`
         <div id="main">
            <!-- <formulario-autenticacao></formulario-autenticacao> -->
            <tabela-pessoas></tabela-pessoas>
            <!-- <formulario-pessoas></formulario-pessoas> -->
         </div>
        `;
    }
}

customElements.define('cadastro-de-pessoas', Index);
