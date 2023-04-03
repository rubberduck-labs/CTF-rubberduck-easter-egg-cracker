// Components
import { html, css, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { TwLitElement } from "../../common/TwLitElement";
import { TerminalRunner } from "../terminal/Terminal";
import loginsh from "../terminal/functions/login.sh";

import "../terminal/Terminal";

@customElement("x-login-page")
export class LoginTerminal extends TwLitElement {
  static styles = css`
    code {
      padding: 4px;
      background: #ffd256;
    }
  `;

  @state()
  private loginFunction: TerminalRunner;

  override firstUpdated() {
    this.loginFunction = loginsh;
  }

  render(): TemplateResult {
    return html`
      <div class="rounded-md overflow-hidden">
        <x-terminal .run="${this.loginFunction}" />
      </div>
    `;
  }
}
