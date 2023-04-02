import { css, TemplateResult } from "lit";
import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { TwLitElement } from "./TwLitElement";

@customElement("x-message")
export class Message extends TwLitElement {
  static styles = css`
    :host {
      position: fixed;
      bottom: 10px;
      animation: fade-in 1s;
    }
  `;

  @property({ type: String })
  public message: string;

  @property({ type: String })
  public type: MessageType;

  private getColorForMessageType() {
    switch (this.type) {
      case MessageType.INFO: return 'bg-white';
      case MessageType.WARNING: return 'bg-orange-500';
      case MessageType.ERROR: return 'bg-red-500';
    }
  }

  render(): TemplateResult {
    return html`
      <div class="rounded-md flex px-8 py-3 ${this.getColorForMessageType()}">
        <p>${this.message}</p>
      </div>
    `;
  }
}

export enum MessageType {
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR'
};

export default function (message: string, type: MessageType, closeWhen?: Promise<any>, mount: HTMLElement = document.body): void {
  // // Create the message and mount our content:
  const messageComponent = document.createElement('x-message');
  messageComponent.setAttribute('message', message);
  messageComponent.setAttribute('type', type);
  mount.appendChild(messageComponent);

  if (!!closeWhen) {
    closeWhen.finally(() => messageComponent.remove());
  }
}