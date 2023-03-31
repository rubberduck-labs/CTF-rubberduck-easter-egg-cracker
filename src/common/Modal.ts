import { css, TemplateResult } from "lit";
import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { TwLitElement } from "./TwLitElement";

@customElement("x-modal")
export class Modal extends TwLitElement {
  static styles = css`
    :host {
      position: absolute;
      width: 100%;
      height: 100%;
      animation: fade-in 0.3s;
    }
  `;

  private closeModal(rejected: boolean, data?: any) {
    const customEvent = new CustomEvent<any>(rejected ? 'reject': 'resolve', {
      bubbles: true,
      detail: data
    });

    this.dispatchEvent(customEvent);
    this.remove();
  }

  render(): TemplateResult {
    this.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        this.closeModal(true);
      }
    });

    return html`
      <div @click="${() => /*this.closeModal(true)*/ null}" class="w-full h-full absolute top-0 left-0 bg-black/80 flex justify-center">
        <div @click="${evt => evt.stopPropagation()}" class="self-center rounded-lg relative" >
          <slot
            @resolve="${evt => this.closeModal(false, evt.detail)}"
            @reject="${evt => this.closeModal(true, evt.detail)}"
          >
          </slot>
        </div>
      </div>
    `;
  }
}

export default function (element: CustomElementConstructor | HTMLElement | string, parameters: object = {}, mount: HTMLElement = document.body): Promise<any> {
  let mountableElement!: HTMLElement;
  if (element instanceof Function) {
    mountableElement = new element;
  } else if (element instanceof HTMLElement) {
    mountableElement = element;
  } else if (typeof element === 'string') {
    mountableElement = document.createElement(element);
  }

  // Set all parameters to the html element we mount:
  Object.entries(parameters).forEach(([key, value]) => mountableElement.setAttribute(key, value));

  // Create the modal and mount our content:
  const modal = document.createElement('x-modal');
  modal.appendChild(mountableElement);
  
  // Mount the modal to our body:
  mount.appendChild(modal);

  return new Promise((resolve, reject) => {
    modal.addEventListener('resolve', (event: CustomEvent) => {
      resolve(event.detail);
    });
    modal.addEventListener('reject', (event: CustomEvent) => {
      reject(event.detail);
    });
  });
}