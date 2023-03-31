// Components
import { html, css, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { TwLitElement } from "../common/TwLitElement";
import spawnModal from '../common/Modal';
import type { Session } from '../../api/next_egg';
import confetti from 'canvas-confetti';

import "../components/ChatBubble";
import "../components/Ducky";
import "../components/Button";
import "../components/Loader";

import egg_1 from "../assets/egg_1.png";
import egg_2 from "../assets/egg_2.png";
import egg_3 from "../assets/egg_3.png";
import egg_4 from "../assets/egg_4.png";

function getEgg(number: number) {
  return [
    egg_1,
    egg_2,
    egg_3,
    egg_4
  ][number];
}


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
    const answer = await spawnModal(((await import('../components/EggCrackTerminal')).EggCrackTerminal), { ...this.sessionInfo });
    await this.getNextEgg(answer);
    confetti({ particleCount: 100, spread: 70 });
  }

  @state()
  private sessionInfo?: Session;

  private async getNextEgg(answer?: string) {
    const apiPromise = fetch('/api/next_egg' + (!!answer ? `?padding=${answer}` : ''))
      .then(response => response.json());

    this.sessionInfo = await spawnModal((await import('../components/Loader')).Loader, {}, apiPromise);
  }

  connectedCallback(): void {
    this.getNextEgg().then(() => super.connectedCallback());
  }

  render(): TemplateResult {
    if (this.sessionInfo?.reward) {
      const end = Date.now() + (10 * 1000);
      const colors = ['F72585', '7209B7', '3A0CA3', '4361EE', '4CC9F0'];
      (function frame() {
        confetti({ colors, particleCount: 2, angle: 60, spread: 55, origin: { x: 0 } });
        confetti({ colors, particleCount: 2, angle: 120, spread: 55, origin: { x: 1 } });
      
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
      return html`
        <div class="flex flex-col justify-center items-center">
          <img class="rounded-lg w-1/2" src="data:image/jpeg;base64,${this.sessionInfo.reward}" />
          <p class="pt-5 text-lg">Ingen flere påskeegg å åpne! Påskeharen er stolt av deg!</p>
        </div>
      `
    } else {
      return html`
        <div class="flex flex-col justify-center items-center">
          <h1 class="text-5xl underline pb-14" >Egg nr. ${this.sessionInfo?.solves + 1}</h1>

          <x-chat-bubble>
            <p>
              Dette egget er
              <code>${this.sessionInfo?.nonce_1}</code> og <code>${this.sessionInfo?.nonce_2}</code>
              og har <code>${this.sessionInfo?.challenge}</code> som sin "lykke-kode"
            </p>
          </x-chat-bubble>
            
          <img id="egg" src="${getEgg((this.sessionInfo?.solves) % 4)}" class="egg my-5 w-72 h-72" />

          <x-button @click="${this.startInspection}">Start eggCrack.sh</x-button>
        </div>
      `;
    }
    
  }
}
