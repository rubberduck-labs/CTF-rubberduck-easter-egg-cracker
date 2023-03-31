// Components
import { html, css, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { TwLitElement } from "../common/TwLitElement";
import spawnModal from '../common/Modal';

import "../components/ChatBubble";
import "../components/Ducky";
import "../components/Button";

import egg_1 from "../assets/egg_1.png";
import egg_2 from "../assets/egg_2.png";
import egg_3 from "../assets/egg_3.png";
import egg_4 from "../assets/egg_4.png";


@customElement("x-crack-page")
export class CrackPage extends TwLitElement {
  static styles = css`
    code {
      padding: 4px;
      background: #ffd256;
    }

    .egg {
      animation: shaking 1s ease-in-out infinite;
    }
    
    @keyframes shaking {
      0% { transform: rotate(0deg); }
      25% { transform: rotate(5deg); }
      50% { transform: rotate(0eg); }
      75% { transform: rotate(-5deg); }
      100% { transform: rotate(0deg); }
    }
  `;

  private async startInspection() {
    await spawnModal(((await import('../components/EggCrackTerminal')).EggCrackTerminal));
  }

  render(): TemplateResult {
    return html`
      <div class="flex flex-col justify-center items-center">
        <h1 class="text-5xl pb-14" >1 av 100 000 000</h1>

        <x-chat-bubble>
          <p>
            Dette egget er <code>kul</code> og <code>dum</code> og må oppnå en perfeksjons-score på <code>5276</code>
          </p>
        </x-chat-bubble>
          
        <img src="${egg_1}" class="egg my-5 w-72 h-72" />

        <x-button @click="${this.startInspection}">Start eggCrack.sh</x-button>
      </div>
    `;
  }
}
