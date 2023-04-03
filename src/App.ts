// Components
import { css, TemplateResult } from "lit";
import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { TwLitElement } from "./common/TwLitElement";

import "./styles/global.css";

import rubberduck from "./assets/rubberduck.png";


@customElement("x-app")
export class App extends TwLitElement {
  static styles = css`
    :host {
      width: 100%;
    }
  `;


  render(): TemplateResult {
    return html`
      <div class="p-7 md:p-14 relative flex flex-col">
        <div class="pb-12 flex justify-between items-center">
          <a href="/">
            <img class="w-24" src="${rubberduck}" />
          </a>
          <div class="flex">
            <a href="https://www.instagram.com/rubberduck.no/" target="_blank">
              <img class="w-10 h-10 mr-2" src="https://static.wixstatic.com/media/e1aa082f7c0747168d9cf43e77046142.png/v1/fill/w_39,h_39,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/e1aa082f7c0747168d9cf43e77046142.png" />
            </a>
            <a href="https://www.linkedin.com/company/rubberduck-dev" target="_blank">
              <img class="w-10 h-10" src="https://static.wixstatic.com/media/aa0402eb9ba2430d9d0620b59556efca.png/v1/fill/w_39,h_39,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/aa0402eb9ba2430d9d0620b59556efca.png" />
            </a>
          </div>
        </div>
        <slot></slot>
      </div>
    `;
  }
}
