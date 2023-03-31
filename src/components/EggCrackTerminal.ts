import { css, TemplateResult } from "lit";
import { html } from "lit";
import { customElement, query, state } from "lit/decorators.js";
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
    }

    .line {
      width: 0px;
      white-space: nowrap;
      overflow: hidden;
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


  private async hash(string): Promise<string> {
    const utf8 = new TextEncoder().encode(string);
    const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((bytes) => bytes.toString(16).padStart(2, '0'))
      .join('');
    return hashHex;
  }

  @state()
  private started = false;

  private addHashToList(hash: string, valid: boolean) {
    const hashLookupPartElement = document.createElement('span');
    hashLookupPartElement.innerText = hash.substring(0, 5);
    
    const hashRestElement = document.createElement('span');
    hashRestElement.innerText = hash.substring(5,35) + '...';

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
    setTimeout(() => this.dispatchEvent(new CustomEvent('resolve', { bubbles: true })), 4000)
  }


  private async trySolve() {
    if (!this.started) {
      this.started = true;

      for (let i = 0; true; i++) {
        const hash = await this.hash('a' + i);
        const isValid = hash.startsWith('e3b99')

        if (!(i % 20000) || isValid) {
          this.addHashToList(hash, isValid);
        }
        if (isValid) {
          this.solve(i);
          break;
        }
      }
    }
  }

  updated(): void {
    this.trySolve();
  }

  render(): TemplateResult {
    return html`
      <div class="rounded-md overflow-hidden terminal bg-black p-5 flex flex-col">
        <div id="terminal" class="flex flex-col">
          <p class="line">sh ./eggCrack.sh</p>
        </div>
        <p>><span class="cursor">_</span></p>
      </div>
    `;
  }
}
