import { LitElement, html, css } from "lit-element";
import { nothing } from "lit-html";

export class StyledComponent extends LitElement {
    static get styles() {
        let globalStyle = "";
        for (const { cssRules } of document.styleSheets) {
            globalStyle = [...globalStyle, css([Object.values(cssRules).map(rule =>
                rule.cssText).join('\n')])];
        }

        return [
            globalStyle,
            css`
                :host {
                    display: flex;
                    flex: 1;
                    flex-direction: column;
                    width: 100%;
                }
            `
        ];
    }

    constructor() {
        super()
    }

    renderMe() {
        return nothing;
    }

    render() {
        return html`
            ${this.renderMe()}
        `;
    }
}