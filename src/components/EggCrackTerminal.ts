import { css, TemplateResult } from "lit";
import { html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { TwLitElement } from "../common/TwLitElement";

@customElement("x-egg-crack-terminal")
export class EggCrackTerminal extends TwLitElement {
  static styles = css`
    @keyframes blink {
      0% {
        opacity: 0;
      }
      40% {
        opacity: 0;
      }
      50% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }

    @keyframes type {
      to {
        width: 100%;
      }
    }

    .terminal {
      color: white;
      font-size: 1.25em;
      font-family: monospace;
      max-width: 100vw;
    }

    .line {
      width: 0px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      animation: type .5s steps(20, end) forwards;
    }

    .invalid {
      color: #ef5350;
    }

    .valid {
      color: #66bb6a;
    }

    .cursor {
      animation: blink 1s infinite;
    }
  `

  @query('#terminal')
  private terminal: HTMLElement;

  @state()
  private started = false;

  @property({ type: String })
  public nonce_1: string;

  @property({ type: String })
  public nonce_2: string;

  @property({ type: String })
  public challenge: string;


  private async hash(string): Promise<string> {
    const utf8 = new TextEncoder().encode(string);
    const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((bytes) => bytes.toString(16).padStart(2, '0'))
      .join('');
    return hashHex;
  }

  private addHashToList(hash: string, valid: boolean) {
    const answerLength = this.challenge.length;

    const hashLookupPartElement = document.createElement('span');
    hashLookupPartElement.innerText = hash.substring(0, answerLength);
    
    const hashRestElement = document.createElement('span');
    hashRestElement.innerText = hash.substring(answerLength);

    const hashElement = document.createElement('p');

    hashLookupPartElement.classList.add(valid ? 'valid' : 'invalid');
    hashElement.classList.add('line');
    hashElement.appendChild(hashLookupPartElement);
    hashElement.appendChild(hashRestElement);

    this.terminal.appendChild(hashElement);
  }

  private solve(numberOfHashes: number) {
    const solveMessageElement = document.createElement('p');
    solveMessageElement.classList.add('line', 'valid');
    solveMessageElement.innerText = `OK - Cracked egg on attempt ${numberOfHashes}`;

    this.terminal.appendChild(solveMessageElement);
    setTimeout(() => this.dispatchEvent(new CustomEvent('resolve', { bubbles: true, detail: numberOfHashes })), 4000)
  }


  private async trySolve() {
    if (!this.started) {
      this.started = true;

      for (let i = 0; true; i++) {
        const hash = await this.hash(this.nonce_1 + this.nonce_2 + i);
        const isValid = hash.startsWith(this.challenge)

        if (!(i % 20000) || isValid) {
          this.addHashToList(hash, isValid);
        }
        if (isValid) {
          setTimeout(() => this.solve(i), 750);
          break;
        }
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();
    setTimeout(() => this.trySolve(), 750);
  }

  render(): TemplateResult {
    return html`
      <div class="rounded-md overflow-hidden terminal bg-black p-5 flex flex-col">
        <div id="terminal" class="flex flex-col">
          <p class="line">sh ./eggCrack.sh --nonce ${this.nonce_1} --nonce ${this.nonce_2} --hash ${this.challenge}</p>
        </div>
        <p>><span class="cursor">_</span></p>
      </div>
    `;
  }
}
