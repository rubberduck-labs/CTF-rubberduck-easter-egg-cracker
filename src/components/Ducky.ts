import { css, TemplateResult } from "lit";
import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { TwLitElement } from "../common/TwLitElement";

import "./ChatBubble";

import ducky from "../assets/minified/easterduck.png";

@customElement("x-ducky")
export class Ducky extends TwLitElement {
  static styles = css`
  `

  @property({ type: String, attribute: 'duck-image' })
  public duckImage?: string = ducky;

  render(): TemplateResult {
    return html`
      <div class="">
        <div class="md:ml-20">
          <x-chat-bubble>
            <slot name="say">
              <div class="flex flex-col items-center">
                <p class="text-4xl">Scoreboard</p>
                <x-scoreboard />
              </div>
            </slot>
          </x-chat-bubble>
        </div>
        <div class="mt-16 flex flex-wrap h-40">
          <img src="${this.duckImage}" class="lg:absolute w-40 h-40" />
          <div class="flex flex-grow items-center justify-around">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}
