import { css, TemplateResult } from "lit";
import { html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { TwLitElement } from "../common/TwLitElement";
import Sleep from "../common/Sleep";

export type TerminalCommandComplete = {
  PID: number;
  result: any;
};

export type TerminalCommandSeek = {
  command: string;
  terminal: Terminal;
};

@customElement("x-terminal")
export class Terminal extends TwLitElement {
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

    @keyframes spin {
      from {
        transform:rotate(0deg);
      }
      to {
        transform:rotate(360deg);
      }
    }

    #terminal {
      color: white;
      font-size: 1.25em;
      font-family: monospace;
      width: 700px;
      max-width: 100vw;
      max-height: 90vh;
      overflow-y: scroll;
      scrollbar-width: none;
    }
    #terminal::-webkit-scrollbar {
      display: none;
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

    .unimportant {
      color: #949494;
    }

    .cursor {
      animation: blink 1s infinite;
    }

    .spinning {
      display: inline-block;
      animation: spin 0.8s infinite linear;
    }
  `

  @query('#commands')
  public commands: HTMLElement;

  @query('#input')
  public input: HTMLSpanElement;

  @state()
  public runningPID: number;

  @property({ type: Function })
  public set run(runnable: (context: Terminal) => Promise<any>) {
    if (!!runnable) {
      const PID = Math.floor(Math.random() * 1000);
      this.runningPID = PID;
      runnable(this)
        .then(result => {
          if (!this.isAborted(PID)) {
            this.dispatchEvent(new CustomEvent<TerminalCommandComplete>('command-complete', {
              bubbles: true, detail: { result, PID }
            }));
          }
        })
        .catch(err => this.addLine(`<span class="invalid">[ERROR] - ${err}</span>`))
        .finally(() => this.runningPID = undefined);
    }
  }


  private async addLine(lineContent: string) {
    const lineContentElement = document.createElement('p');
    lineContentElement.classList.add('line');
    lineContentElement.innerHTML = lineContent;
    this.commands.appendChild(lineContentElement);
    await Sleep(750); // Wait for line animation
  }

  public isAborted(PID: number) {
    return this.runningPID !== PID;
  }

  public getWriter() {
    const PID = this.runningPID;
    return async (string: string) => {
      if (!this.isAborted(PID)) {
        return this.addLine(string);
      }
    }
  }

  firstUpdated() {
    this.input.focus();
    this.input.addEventListener('keydown', event => {
      if (event.ctrlKey && event.key.toLowerCase() === 'c' && !!this.runningPID) {
        this.addLine(`^C (aborted process[${this.runningPID}])`);
        this.runningPID = undefined;
      }
      if (event.key === 'Enter') {
        const command = this.input.innerText;
        this.addLine(`> ${command}`);
        event.preventDefault();
        this.dispatchEvent(new CustomEvent<TerminalCommandSeek>('seek-command', {
          bubbles: true,
          composed: true,
          detail: { command, terminal: this }
        }));
        this.input.innerText = '';
      }
    });
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('seek-command', (event: CustomEvent<TerminalCommandSeek>) => {
      this.addLine(`<span class="invalid">command not found: ${event.detail.command}</span>`);
    });
  }

  render(): TemplateResult {
    return html`
      <div id="terminal" class="bg-black p-5 flex flex-col-reverse" @click="${() => this.input.focus()}">
        <p>
          ${!this.runningPID
            ? html`<span>></span>`
            : html`<span class="spinning">|</span>`
          }
          <span
            id="input"
            class="outline-none caret-transparent"
            contenteditable="${!this.runningPID}"
            tabindex="1"
            spellcheck="false"
          ></span><span class="cursor">_</span>
        </p>
        <div id="commands" class="flex flex-col"></div>
      </div>
    `;
  }
}
