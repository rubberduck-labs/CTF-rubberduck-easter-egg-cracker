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
          Påskeharen er godt i gang med årets levering av påskeegg, men har hvert år en del defekte egg som ikke vil åpnes. Disse kan selvfølgelige ikke påskeharen utlevere, men det finnes en instruks for hvordan eggene kan åpnes<br>
          <br>
          Hvert egg har to tilhørende tilfeldig adjektiver som beskriver egget og en "lykke-kode". Påskeharen sier at hvert egg som er låst ikke er korrekt justert for å oppnå sin "lykke-kode". Du kan justere egget ved å finne en hash av typen <code>SHA256(ADJEKTIV_1 + ADJEKTIV_2 + justering)</code> som begynner på eggets "lykke-kode".<br>
          <br>
          For eksempel så vil et egg med adjektivene <code>brilliant</code> og <code>stappfullt</code> trenge en justing på <code>123</code> for å oppnå sin "lykke-kode" med verdi <code>37964</code>. Fordi <code>SHA256(brilliantstappfullt123) == 37964....</code><br>
          <br>
          Men vi begynner å lure på om ikke påskeharen har lurt oss i år. Hen vil at vi skal åpne 100 000 000 egg på denne måten før vi får belønningen våres! Klarer du å lure en luring?<br>
        </p>
        <x-button @click="${() => Router.go('/crack')}">Begynn å knekke egg</x-button>
      </x-ducky>
    `;
  }
}
