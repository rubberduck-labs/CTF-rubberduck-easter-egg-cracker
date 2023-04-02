import { css, TemplateResult } from "lit";
import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { TwLitElement } from "../common/TwLitElement";

import "./ChatBubble";

import ducky from "../assets/minified/easterduck.png";

@customElement("x-ducky")
export class Ducky extends TwLitElement {
  static styles = css`
  `

  render(): TemplateResult {
    return html`
      <div class="">
        <div class="md:ml-20">
          <x-chat-bubble width="100%">
            <slot name="say"></slot>
          </x-chat-bubble>
        </div>
        <div class="mt-16 flex h-40">
          <img src="${ducky}" class="lg:absolute w-40 h-40" />
          <div class="flex flex-grow items-center justify-around">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}
