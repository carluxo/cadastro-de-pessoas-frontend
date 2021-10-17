import { html } from 'lit-element';
import { StyledComponent } from '../../core/styled-component.js';
import { pessoaService } from './service/pessoa-service.js';

class Index extends StyledComponent {
    static get properties() {
        return {
            items: {},
            selected: {}
        }
    }
    constructor() {
        super()

        this.updateComplete.then(() => {
            pessoaService.findAll().then(json => this.items = json);
        })
    }

    _renderizarTabela() {
        if (this.items && this.items.length) {
            return html`
                <div class="table-container is-fluid">
                    <table class="table is-striped is-narrow is-hoverable is-fullwidth">
                        <thead>
                            <tr>
                                <th>CPF</th>
                                <th>Nome</th>
                                <th>Nascimento</th>
                                <th>Genêro</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this._renderizarItens()}
                        </tbody>
                    </table>
                </div>
            `;
        } else {
            return html`
                <div class="notification is-info">
                    Não há registros de pessoas
                </div>
            `;
        }
    }

    _renderizarItens() {
        return this.items.map(item => {
            let data = item.nascimento.substring(0, 10).split('-');
            return html`
                <tr>
                    <td>${item.cpf}</td>
                    <td>${item.nome}</td>
                    <td>${data[2] + '/' + data[1] + '/' + data[0]}</td>
                    <td>${item.genero}</td>
                    <td>
                        <a class="button is-small is-ghost" @click=${(e) => this._selecionarItem(item)}>Editar</a>
                        <a class="button is-small is-ghost has-text-danger" @click=${(e) => this._confirmarExclusao(item)} >Excluir</a>
                    </td>
                </tr>
            `
        }
        );
    }

    _selecionarItem(item) {
        this.selected = item;
    }

    _onSave({detail}) {
        this.items = this.items.map(item => item.id === detail.id ? detail : item);
        this.selected = null;
    }

    _onCreate({detail}) {
        this.items = [detail, ...this.items];
        this.selected = null;
    }

    _confirmarExclusao(item) {
        if (window.confirm('Deseja prosseguir com a exclusão?')) {
            pessoaService.delete(item.id).then(() => {
                this.items = this.items.filter(i => i.id !== item.id);
            });
        }
    }

    renderMe() {
        if (this.selected) {
            return html`
                <formulario-pessoas .item=${this.selected} @on-create=${this._onCreate} @on-save=${this._onSave} @on-cancel=${() => this.selected = null}></formulario-pessoas>
            `;
        } else {
            return html`
                <div class="container is-fluid is-max-desktop">
                    <section class="section">
                        <div class="level">
                            <div class="level-left">
                                <h1 class="title">Cadastro de pessoas</h1>
                            </div>
                            <div class="level-right">
                                <div class="level-item">
                                    <button class=" button is-primary" @click=${() => this.selected = {}}>Novo cadastro</button>
                                </div>
                            </div>
                        </div>
                        ${this._renderizarTabela()}
                    </section>
                </div>
            `;
        }
    }
}

customElements.define("tabela-pessoas", Index);