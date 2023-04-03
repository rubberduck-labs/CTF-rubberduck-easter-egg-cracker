import { css, TemplateResult } from "lit";
import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { TwLitElement } from "../common/TwLitElement";

@customElement("x-button")
export class Button extends TwLitElement {
  static styles = css`
  `

  render(): TemplateResult {
    return html`
      <button type="submit" class="m-2 rounded-md bg-accent text-white py-5 px-7">
        <slot></slot>
      </button>
    `;
  }
}
