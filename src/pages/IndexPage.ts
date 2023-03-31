// Components
import { html, css, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { TwLitElement } from "../common/TwLitElement";
import { Router } from '@vaadin/router';

import "../components/ChatBubble";
import "../components/Ducky";
import "../components/Button";

@customElement("x-index-page")
export class IndexPage extends TwLitElement {
  static styles = css`
    code {
      padding: 4px;
      background: #ffd256;
    }
  `;

  render(): TemplateResult {
    return html`
      <x-ducky>
        <p slot="say">
          Påskeharen er godt i gang med årets påskeegglevering, men har hvert år en del defekte egg som ikke vil åpnes. Disse kan selvfølgelige ikke påskeharen utlevere<br>
          Informasjonen vi har fått fra påskeharen om hvordan eggene kan åpnes lyder som følger:<br>
          <br>
          Hvert egg har to tilhørende tilfeldig adjektiver som beskriver egget og en <code>perfksjons-score</code>. Påskeharen sier at hvert egg som er låst må oppnå sin <code>perfeksjons-score</code> ved å finne en hash av typen <code>SHA256(ADJEKTIV_1 + ADJEKTIV_2 + "???")</code> som begynner på eggets unike <code>perfeksjons-score</code>.<br>
          <br>
          For denne jobben har Rubberduck program <code>eggCrack.sh</code>, men vi begynner å lure på om ikke påskeharen har lurt oss i år. Hen vil at vi skal åpne 100 000 000 egg på denne måten før vi får belønningen våres! Klarer du å lure en luring?<br>
        </p>
        <x-button @click="${() => Router.go('/crack')}">Begynn å knekke egg</x-button>
      </x-ducky>
    `;
  }
}
