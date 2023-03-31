import { css, TemplateResult } from "lit";
import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { TwLitElement } from "../common/TwLitElement";

@customElement("x-chat-bubble")
export class ChatBubble extends TwLitElement {
  static styles = css`
    .speech-bubble {
      width: 400px;
      animation: float 5s ease-in-out infinite;
      box-shadow: 20px 20px #2e2e2e;
    }

    .speech-bubble::after {
      content: '.';
      animation: float2 5s ease-in-out infinite;
      font-weight: bold;
      -webkit-text-fill-color: white;
      text-shadow: 22px 22px #2e2e2e;
      text-align: left;
      font-size: 55px;
      width: 55px;
      height: 11px;
      line-height: 30px;
      border-radius: 11px;
      background-color: white;
      position: absolute;
      display: block;
      bottom: -30px;
      left: 0;
      box-shadow: 22px 22px #2e2e2e;
      z-index: -2;
    }

    @keyframes float {
      0% {
        transform: translatey(0px);
      }
      50% {
        transform: translatey(-20px);
      }
      100% {
        transform: translatey(0px);
      }
    }

    @keyframes float2 {
      0% {
        line-height: 30px;
        transform: translatey(0px);
      }
      55% {
        transform: translatey(-20px);
      }
      60% {
        line-height: 10px;
      }
      100% {
        line-height: 30px;
        transform: translatey(0px);
      }
    }
  `

  @property({ type: String })
  public width: string = '400px';

  render(): TemplateResult {
    return html`
      <div class="">
        <div class="relative p-5 rounded-lg bg-white speech-bubble flex" style="width: ${this.width}">
          <slot></slot>
        </div>
      </div>
    `;
  }
}
