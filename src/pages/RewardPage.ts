// Components
import type { Session } from '../../api/next_egg';

import confetti from 'canvas-confetti';
import { Router } from '@vaadin/router';
import { html, css, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { TwLitElement } from "../common/TwLitElement";
import { dbConnect } from "../util/Supabase";
import spawnModal from '../common/Modal';

import "../components/Button";


@customElement("x-reward-page")
export class RewardPage extends TwLitElement {
  static styles = css`
  `;

  @state()
  private reward: string;

  @state()
  private loggedIn: boolean;

  private async getInfo(answer?: string) {
    const eggSession = fetch('/api/next_egg')
      .then(response => response.json());
    const userSession = dbConnect().auth
      .getSession()
      .then(({ data }) => data?.session?.user);
    

    const [egg, user]: [Session, boolean] = await spawnModal((await import('../components/Loader')).Loader, {}, Promise.all([eggSession, userSession]));
    this.reward = egg.reward;
    this.loggedIn = !!user;
  }

  private async showLogin() {
    spawnModal((await import('../components/modals/LoginTerminal')).LoginTerminal);
  }

  connectedCallback(): void {
    this.getInfo().then(() => super.connectedCallback());
  }

  render(): TemplateResult {
    if (this.reward) {
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
          <img class="rounded-lg w-1/2" src="data:image/jpeg;base64,${this.reward}" />
          <p class="py-5 text-2xl">Gratulerer du er en veldig iherdig kodeknekker!</p>
          ${this.loggedIn
            ? ''
            : html`
              <div class="flex flex-col items-center">
                <p>Det ser ikke ut som du er logget inn.</p>
                <p>Du kan logge inn / registrere deg for å komme på scoreboardet</p>
                <x-button @click="${this.showLogin}">Login / registert deg</x-button>
              </div>
            `}
        </div>
      `
    } else {
      // Session does not have reward - redirect to crack page
      Router.go('/crack');
    }
  }
}
