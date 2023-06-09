export const adjectives = [
  "liten",
  "stor",
  "lang",
  "kort",
  "bred",
  "smal",
  "tung",
  "lett",
  "rask",
  "langsom",
  "vakker",
  "stygg",
  "elegant",
  "klumpete",
  "myk",
  "hard",
  "fleksibel",
  "stiv",
  "flat",
  "rund",
  "skarp",
  "sløv",
  "glatt",
  "ruglete",
  "fargerik",
  "ensfarget",
  "gjennomsiktig",
  "ugjennomsiktig",
  "skinnende",
  "matt",
  "svak",
  "sterk",
  "tett",
  "porøs",
  "robust",
  "skjør",
  "høy",
  "lav",
  "tykk",
  "tynn",
  "grov",
  "fin",
  "myldrende",
  "enkel",
  "komplisert",
  "ren",
  "skitten",
  "mørk",
  "lys",
  "humpete",
  "slett",
  "flekkete",
  "stripete",
  "mønstret",
  "sjelden",
  "vanlig",
  "moderne",
  "gammeldags",
  "tradisjonell",
  "innovativ",
  "høyteknologisk",
  "primitiv",
  "polert",
  "upolert",
  "solid",
  "hul",
  "symmetrisk",
  "asymmetrisk",
  "firkantet",
  "oval",
  "kantete",
  "avrundet",
  "glitrende",
  "dyster",
  "slitt",
  "ny",
  "gammel",
  "frisk",
  "slapp",
  "fuktig",
  "tørr",
  "varm",
  "kald",
  "leddete",
  "sammensatt",
  "isolert",
  "ledende",
  "ikke-ledende",
  "biologisk",
  "syntetisk",
  "naturlig",
  "kunstig",
  "frodig",
  "spinkel",
  "flekkvis",
  "rufsete",
  "prikete",
  "glinsende",
  "flammende",
  "frostet",
  "dekorativ",
  "funksjonell",
  "bøyelig",
  "uelastisk",
  "sprø",
  "seig",
  "pustende",
  "vanntett",
  "gjennomtrengelig",
  "kompakt",
  "luftig",
  "strukturert",
  "sløy",
  "tettvevd",
  "løs",
  "glødende",
  "innbydende",
  "frastøtende",
  "velduftende",
  "luktsterk",
  "magnetisk",
  "elektrisk",
  "skjult",
  "synlig",
  "lydløs",
  "høylytt",
  "lyssvak",
  "lyssterk",
  "reflekterende",
  "absorberende",
  "kraftig",
  "skjelvende",
  "stasjonær",
  "bevegelig",
  "dynamisk",
  "statisk",
  "gnistrende",
  "knitrende",
  "føyelig",
  "sprudlende",
  "boblende",
  "glitrende",
  "dampende",
  "frimodig",
  "fraværende",
  "svevende",
  "plastisk",
  "støpt",
  "innpakket",
  "utviklet",
  "uferdig",
  "forseggjort",
  "grovkornet",
  "eksklusiv",
  "billig",
  "luksuriøs",
  "enkel",
  "raffinert",
  "rå",
  "bearbeidet",
  "konsentrert",
  "utspedd",
  "kulinarisk",
  "næringsrik",
  "næringsfattig",
  "fruktbar",
  "ufruktbar",
  "organisk",
  "uorganisk",
  "hygienisk",
  "uhygienisk",
  "fremragende",
  "underlegen",
  "ergonomisk",
  "upraktisk",
  "sammensmeltet",
  "sekvensiell",
  "kjedelig",
  "fascinerende",
  "inspirerende",
  "demotiverende",
  "veldreid",
  "formløs",
  "variert",
  "monoton",
  "vibrerende",
  "stillestående",
  "foranderlig",
  "konstant"
];

export function getRandomAdjective() {
  return adjectives[Math.floor(Math.random() * adjectives.length)];
}