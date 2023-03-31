import { adoptStyles, LitElement, unsafeCSS } from 'lit'

import style from '../styles/tailwind.global.css' 

declare global {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  export type LitMixin<T = unknown> = new (...args: any[]) => T & LitElement;
}


const stylesheet = unsafeCSS(style)

export const TW = <T extends LitMixin> (superClass: T): T =>
  class extends superClass {
    connectedCallback() {
      const mainClass = this.constructor as any;

      super.connectedCallback();

      if (!!mainClass.styles) {
        adoptStyles(this.shadowRoot, [stylesheet, mainClass.styles])
      } else {
        adoptStyles(this.shadowRoot, [stylesheet])
      }
    }
  };