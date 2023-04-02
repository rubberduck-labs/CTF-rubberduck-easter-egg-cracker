import { css, TemplateResult } from "lit";
import { html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import DOMPurify from "dompurify";
import { TwLitElement } from "../../common/TwLitElement";
import Sleep from "../../common/Sleep";
import "./functions";

export type TerminalCommandComplete = {
  PID: number;
  result: any;
};

export type TerminalCommandSeek = {
  command: string;
  terminal: Terminal;
};

export type TerminalWriter = (string: string) => Promise<void>;
export type TerminalReader = (string: string) => Promise<string>;
export type TerminalRunner = (terminal: Terminal, writer: TerminalWriter, reader: TerminalReader) => Promise<any>;

function isSigterm(event: KeyboardEvent) {
  return event.ctrlKey && event.key.toLowerCase() === 'c';
}

function isSubmit(event: KeyboardEvent) {
  return event.key.toLowerCase() === 'enter';
}

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

  @state()
  public waitingForPrompt: boolean;

  @property({ type: Function })
  public set run(runnable: TerminalRunner) {
    if (!!runnable) {
      const PID = Math.floor(Math.random() * 1000);
      this.runningPID = PID;
      runnable(this, this.getWriterForPID(PID), this.getReaderForPID(PID))
        .then(result => {
          if (!this.isAborted(PID)) {
            this.dispatchEvent(new CustomEvent<TerminalCommandComplete>('command-complete', {
              bubbles: true, detail: { result, PID }
            }));
          }
        })
        .catch(err => this.addLine(`<span class="invalid">[ERROR] - ${err}</span>`))
        .finally(() => {
          this.runningPID = undefined;
          this.waitingForPrompt = false;
        });
    }
  }


  private async addLine(lineContent: string) {
    const lineContentElement = document.createElement('p');
    lineContentElement.classList.add('line');
    lineContentElement.innerHTML = DOMPurify.sanitize(lineContent, { USE_PROFILES: { html: true } });
    this.commands.appendChild(lineContentElement);
    await Sleep(750); // Wait for line animation
  }

  private async getPrompt() {
    this.waitingForPrompt = true;

    let promtEventListener;
    const submit = new Promise<string>((resolve, reject) => {
      promtEventListener = (event: KeyboardEvent) => {
        if (isSigterm(event)) reject('sigterm');
        if (event.key === 'Enter') {
          event.preventDefault();
          const result = this.input.innerText;
          this.addLine(`> ${result}`);
          this.input.innerText = '';
          resolve(result);
        }
      };
    });

    this.input.addEventListener('keydown', promtEventListener);
    return submit.finally(() => {
      this.waitingForPrompt = false;
      this.input.removeEventListener('keydown', promtEventListener);
    })
  }

  public isAborted(PID: number) {
    return this.runningPID !== PID;
  }

  private getWriterForPID(PID: number) {
    return async (string: string) => {
      if (!this.isAborted(PID)) {
        return this.addLine(string);
      }
    }
  }

  private getReaderForPID(PID: number) {
    return async (string: string) => {
      if (!this.isAborted(PID)) {
        this.addLine(string);
        return this.getPrompt();
      }
    }
  }

  firstUpdated() {
    this.input.focus();
    this.input.addEventListener('keydown', event => {
      if (isSigterm(event) && !!this.runningPID) {
        this.addLine(`^C (aborted process[${this.runningPID}])`);
        this.runningPID = undefined;
      }
      if (isSubmit(event) && !this.runningPID) {
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
          ${!this.runningPID || this.waitingForPrompt
            ? html`<span>></span>`
            : html`<span class="spinning">|</span>`
          }
          <span
            id="input"
            class="outline-none caret-transparent"
            contenteditable="${!this.runningPID || this.waitingForPrompt}"
            tabindex="1"
            spellcheck="false"
          ></span><span class="cursor">_</span>
        </p>
        <div id="commands" class="flex flex-col"></div>
      </div>
    `;
  }
}
