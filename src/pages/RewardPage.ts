// Components
import type { Session } from '../../api/next_egg';

import confetti from 'canvas-confetti';
import { Router } from '@vaadin/router';
import { html, css, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { TwLitElement } from "../common/TwLitElement";
import spawnModal from '../common/Modal';
import spawnMessage, { MessageType } from '../common/Message';
import Sleep from '../common/Sleep';

import "../components/Button";


@customElement("x-reward-page")
export class RewardPage extends TwLitElement {
  static styles = css`
  `;

  @state()
  private reward: string;

  @state()
  private registered: boolean;

  private async getInfo(answer?: string) {
    const eggSession = fetch('/api/next_egg')
      .then(response => response.json());
    // const userSession = dbConnect().auth
    //   .getSession()
    //   .then(({ data }) => data?.session?.user);
    

    const egg: Session = await spawnModal((await import('../components/Loader')).Loader, {}, eggSession);
    this.reward = egg.reward;
    // this.loggedIn = true;
  }

  private async showLogin() {
    spawnModal((await import('../components/modals/LoginTerminal')).LoginTerminal);
  }

  private async signup(event: FormDataEvent) {
    event.preventDefault();
    const formEntries = [...new FormData(event.target as HTMLFormElement).entries()].reduce((acc, [key, value]) => {
      return {...acc, [key]: value};
    }, {}) as any;


    const register = fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ email: formEntries.email }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => { if (!response.ok) { throw 'error' } });
    

    await spawnModal((await (await import('../components/Loader')).Loader), {}, register)
      .then(success => {
        spawnMessage(`${formEntries.email} er nå registrert!`, MessageType.INFO, Sleep(3000));
        this.registered = true;
      })
      .catch(ex => spawnMessage(`Klarte ikke registere ${formEntries.email}, prøv på nytt`, MessageType.ERROR, Sleep(3000)))
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
          <p class="py-5 text-center text-2xl">Gratulerer du er en veldig iherdig kodeknekker!</p>

          ${this.registered
            ? ''
            : html`
              <p class="text-center">Vil du være med i trekningen av kule premier kan du legge igjen e-postadressen din under.</p>
              <p class="text-center text-gray-700 text-sm">(Merk at e-post kun vil bli brukt i forbindelse med trekning av premier og for å kontakte vinneren(e). Alle data vil bli slettet etter dette)</p>
              <form class="flex mt-5" @submit="${this.signup}">
                <input type="text" name="email" type="email" class="p-3 rounded-md text-center" placeholder="påskeharen@rubberduck.no" />
                <button type="submit" class="w-12 h-12 ml-5 bg-accent rounded-full p-3 text-white">↲</button>  
              </form>
            `}
        </div>
      `
    } else {
      // Session does not have reward - redirect to crack page
      Router.go('/crack');
    }
  }
}
