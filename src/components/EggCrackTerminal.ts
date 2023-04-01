import { css, TemplateResult } from "lit";
import { html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { TwLitElement } from "../common/TwLitElement";
import { Terminal, TerminalCommandComplete } from "./Terminal";

import "./Terminal";

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
  private crackEggFunction: Function = undefined;

  private crackEggPID: number;

  private closeTerminal(result: CustomEvent<TerminalCommandComplete>) {
    if (this.crackEggPID === result.detail.PID) {
      this.dispatchEvent(new CustomEvent('resolve', { bubbles: true, detail: result.detail.result }))
    }
  }


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
      this.crackEggFunction = async (context: Terminal) => {
        this.crackEggPID = context.runningPID;
        const println = context.getWriter();

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
            return i;
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
          @command-complete="${this.closeTerminal}"
        ></x-terminal>
      </div>
    `;
  }
}
