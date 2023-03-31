// Components
import { css, TemplateResult } from "lit";
import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { TwLitElement } from "./common/TwLitElement";

import "./styles/global.css";


@customElement("x-app")
export class App extends TwLitElement {
  static styles = css`
    :host {
      width: 100%;
    }
  `;


  render(): TemplateResult {
    return html`
      <div class="p-7 md:p-14 relative">
        <slot></slot>
      </div>
    `;
  }
}
