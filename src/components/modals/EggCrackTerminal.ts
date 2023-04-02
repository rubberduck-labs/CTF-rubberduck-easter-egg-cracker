import { css, TemplateResult } from "lit";
import { html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { TwLitElement } from "../../common/TwLitElement";
import Sleep from "../../common/Sleep";
import { TerminalRunner } from "../terminal/Terminal";

import "../terminal/Terminal";

@customElement("x-egg-crack-terminal")
export class EggCrackTerminal extends TwLitElement {
  static styles = css`
  `

  @property({ type: String })
  public adjective1: string;

  @property({ type: String })
  public adjective2: string;

  @property({ type: String })
  public challenge: string;

  @state()
  private crackEggFunction: TerminalRunner = undefined;


  private async hash(string): Promise<string> {
    const utf8 = new TextEncoder().encode(string);
    const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((bytes) => bytes.toString(16).padStart(2, '0'))
      .join('');
    return hashHex;
  }

  firstUpdated() {
    if (!this.crackEggFunction) {
      this.crackEggFunction = async (context, println, prompt) => {
        const currentPID = context.runningPID;

        await println(`sh ./eggCrack.sh --desc1 ${this.adjective1} --desc2 ${this.adjective2} --hash ${this.challenge}`);
        for (let i = 0; true; i++) {
          const hash = await this.hash(this.adjective1 + this.adjective2 + i);
          const isValid = hash.startsWith(this.challenge)
      
          if (!(i % 20000) || isValid) {
            const answerLength = this.challenge.length;
            const checkPart = hash.substring(0, answerLength);
            const restPart = hash.substring(answerLength);
      
            println(`<span class="${isValid ? 'valid' : 'invalid'}">${checkPart}</span><span class="unimportant">${restPart}</span>`);
          }
          if (isValid) {
            await println(`<span class="valid">[OK]</span> - Cracked egg with adjustment ${i}`);
            await Sleep(1500); // Wait a few seconds for the user to read OK message
            if (!context.isAborted(currentPID)) {
              return this.dispatchEvent(new CustomEvent('resolve', { bubbles: true, detail: i }));
            } 
          }
        }
      }
    }
  }

  render(): TemplateResult {
    return html`
      <div class="rounded-md overflow-hidden">
        <x-terminal
          .run="${this.crackEggFunction}"
        ></x-terminal>
      </div>
    `;
  }
}
