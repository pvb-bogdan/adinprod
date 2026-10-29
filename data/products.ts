// Produsele: cele trei categorii și cele 7 tipuri de folie de protecție.
// Textele se modifică aici, fără să umbli în componente.
// Pentru engleză, înlocuiește '[PLACEHOLDER]' cu traducerea.

export type Locale = 'ro' | 'en'
export type Localized = Record<Locale, string>

// Cheile corespund etichetelor din i18n/locales/*.json -> "specs"
export type SpecKey = 'type' | 'color' | 'thickness' | 'width' | 'length' | 'adhesion' | 'maxLoad'

export interface Spec {
  key: SpecKey
  // Text simplu (ex. '30 – 60 mic') sau tradus (ex. culorile)
  value: string | Localized
}

export interface ProductItem {
  slug: string
  image: string
  title: Localized
  text: Localized
  specs: Spec[]
}

export interface Category {
  slug: 'folii-protectie' | 'folii-stretch' | 'benzi-adezive'
  // Cheia din i18n/locales/*.json -> "seo"
  seoKey: 'foliiProtectie' | 'foliiStretch' | 'benziAdezive'
  title: Localized
  // Card pe pagina principală și pe /produse
  card: { image: string; text: Localized }
  // Pagina categoriei
  image?: string
  intro: Localized[]
  surfaces?: Localized
  note?: Localized
  specsTitle?: 'commonSpecs' | 'specs'
  specs?: Spec[]
  items?: ProductItem[]
}

const PH = '[PLACEHOLDER]'
const l = (ro: string, en: string = PH): Localized => ({ ro, en })

const solventOrWater = l('polietilenă cu adeziv pe bază de solvent sau apă')
export const categories: Category[] = [
  {
    slug: 'folii-protectie',
    seoKey: 'foliiProtectie',
    title: l('Folii de protecție'),
    card: {
      image: 'folie-protectie-general-poza-1.jpg',
      text: l(
        'Film din polietilenă cu adeziv acrilic pe bază de apă sau solvent, pentru protecția suprafețelor pe toată durata producției, depozitării, transportului și montajului.',
      ),
    },
    intro: [
      l(
        'Foliile de protecție sunt folosite pentru protejarea suprafețelor împotriva deteriorării în timpul producției, depozitării, transportului și montajului. Sunt realizate din polietilenă, acoperite cu un strat de adeziv acrilic pe bază de apă sau solvent și sunt disponibile într-o gamă largă de grosimi și lățimi, în funcție de suprafața pe care se aplică.',
      ),
    ],
    surfaces: l(
      'tablă prevopsită, tablă tip țiglă, panouri sandwich, tablă din inox, tablă din aluminiu, plăci Alcobond, mochetă, sticlă etc.',
    ),
    note: l('Folia se îndepărtează fără a lăsa urme de adeziv.'),
    specsTitle: 'commonSpecs',
    specs: [{ key: 'type', value: solventOrWater }],
    items: [
      {
        slug: 'tabla-prevopsita',
        image: 'folie_tabla_prevopsita.jpg',
        title: l('Tablă prevopsită'),
        text: l(
          'Folia se aplică pe tabla prevopsită pentru a o proteja în timpul prelucrării, depozitării, transportului și montajului. Poate fi folosită pe panouri sandwich, țiglă metalică, tablă cutată, tablă plană etc. Nu interacționează chimic cu suprafața și se îndepărtează ușor, fără urme de adeziv. Poate fi personalizată cu logo-ul sau numele companiei.',
        ),
        specs: [
          { key: 'color', value: l('transparentă, albastru deschis, albă') },
          { key: 'thickness', value: '30 – 60 mic' },
          { key: 'width', value: '1000 – 1250 mm' },
          { key: 'length', value: '500 – 1500 m' },
          { key: 'adhesion', value: '200 – 1500 g/50 mm' },
        ],
      },
      {
        slug: 'inox-ambutisat',
        image: 'folie_inox_ambutisat.jpg',
        title: l('Inox ambutisat'),
        text: l(
          'Folia se aplică pe tabla din inox ambutisat pentru a proteja împotriva zgârieturilor care pot apărea în timpul procesului de ambutisare sau presare. Are rezistență mare la rupere și alungire. Nu interacționează chimic cu suprafața și se îndepărtează ușor, fără urme de adeziv. Poate fi personalizată cu logo-ul sau numele companiei.',
        ),
        specs: [
          { key: 'color', value: l('transparentă, albastru deschis, albă') },
          { key: 'thickness', value: '50 – 80 mic' },
          { key: 'width', value: '100 – 1250 mm' },
          { key: 'length', value: '500 – 1500 m' },
          { key: 'adhesion', value: '5 – 1500 g/50 mm' },
        ],
      },
      {
        slug: 'tabla-inox',
        // Imagine provizorie (în original img-1.jpg [PROVIZORIU])
        image: 'folie-protectie-tabal-inox-img-2.jpg',
        title: l('Tablă din inox'),
        text: l(
          'Folia se aplică pe tabla din inox pentru a o proteja împotriva zgârieturilor care pot apărea în timpul prelucrării, depozitării, transportului și montajului. Nu interacționează chimic cu suprafața și se îndepărtează ușor, fără urme de adeziv. Poate fi personalizată cu logo-ul sau numele companiei.',
        ),
        specs: [
          { key: 'color', value: l('transparentă, albastru deschis') },
          { key: 'thickness', value: '50 – 1000 mic' },
          { key: 'width', value: '100 – 1250 mm' },
          { key: 'length', value: '500 – 1500 m' },
          { key: 'adhesion', value: '5 – 1500 g/50 mm' },
        ],
      },
      {
        slug: 'profile-aluminiu',
        image: 'folie_aluminiu.jpg',
        title: l('Profile din aluminiu'),
        text: l(
          'Folia se aplică pe profilele din aluminiu pentru a le proteja împotriva zgârieturilor care pot apărea în timpul prelucrării, depozitării, transportului și montajului. Nu interacționează chimic cu suprafața și se îndepărtează ușor, fără urme de adeziv. Poate fi personalizată cu logo-ul sau numele companiei.',
        ),
        specs: [
          { key: 'color', value: l('albă sau alb/gri') },
          { key: 'thickness', value: '30 – 80 mic' },
          { key: 'width', value: '20 – 1250 mm' },
          { key: 'length', value: '500 – 1500 m' },
          { key: 'adhesion', value: '500 – 1500 g/50 mm' },
        ],
      },
      {
        slug: 'mocheta',
        image: 'folie_mocheta.jpg',
        title: l('Mochetă'),
        text: l(
          'Folia se aplică pe mochetă pentru a o proteja în timpul renovărilor sau împotriva traficului pietonal. Este folosită frecvent de constructori și de organizatorii de expoziții. Nu interacționează chimic cu suprafața și se îndepărtează ușor, fără urme de adeziv. Poate fi personalizată cu logo-ul sau numele companiei.',
        ),
        specs: [
          { key: 'color', value: l('transparentă') },
          { key: 'thickness', value: '50 – 100 mic' },
          { key: 'width', value: '500 – 1000 mm' },
          { key: 'length', value: '500 – 1000 m' },
          { key: 'adhesion', value: '500 – 1500 g/50 mm' },
        ],
      },
      {
        slug: 'geam',
        image: 'folie_geam.jpg',
        title: l('Geam'),
        text: l(
          'Folia se aplică pe geam pentru a-l proteja în timpul prelucrării, depozitării, transportului și montajului. Nu interacționează chimic cu suprafața și se îndepărtează ușor, fără urme de adeziv. Poate fi personalizată cu logo-ul sau numele companiei.',
        ),
        specs: [
          { key: 'color', value: l('transparentă, albastru deschis') },
          { key: 'thickness', value: '30 – 60 mic' },
          { key: 'width', value: '1000 – 1250 mm' },
          { key: 'length', value: '500 – 1500 m' },
          { key: 'adhesion', value: '200 – 1500 g/50 mm' },
        ],
      },
      {
        slug: 'policarbonat',
        image: 'folie_policarbonat.jpg',
        title: l('Policarbonat'),
        text: l(
          'Folia se aplică pe policarbonat pentru a-l proteja în timpul prelucrării, depozitării, transportului și montajului. Nu interacționează chimic cu suprafața și se îndepărtează ușor, fără urme de adeziv. Poate fi personalizată cu logo-ul sau numele companiei.',
        ),
        specs: [
          { key: 'color', value: l('transparentă, albastru deschis') },
          { key: 'thickness', value: '25 – 35 mic' },
          { key: 'width', value: '1000 – 2100 mm' },
          { key: 'length', value: '1000 – 1500 m' },
          { key: 'adhesion', value: '5 – 500 g/50 mm' },
        ],
      },
    ],
  },
  {
    slug: 'folii-stretch',
    seoKey: 'foliiStretch',
    title: l('Folii stretch'),
    card: {
      image: 'folie-strech-poza-2.jpg',
      text: l(
        'Pentru ambalarea și protecția mărfurilor împotriva prafului și umidității, cu rezistență la rupere și la sarcini de până la 1000 kg pe palet.',
      ),
    },
    // Imagine provizorie (în original img-2.jpg [PROVIZORIU])
    image: 'folie-strech-poza-2.jpg',
    intro: [
      l(
        'Foliile stretch sunt folosite pentru ambalarea și protecția diferitelor tipuri de mărfuri, protejând conținutul de praf și umiditate. Sunt rezistente la rupere și pot susține încărcături de până la 1000 kg pe palet, fără alunecare.',
      ),
      l(
        'Pot fi produse în lățimi de la 125 mm la 500 mm și grosimi de la 17 la 23 de microni, transparente sau negre.',
      ),
      l('Oferim folii stretch pentru uz manual sau automat.'),
    ],
    specsTitle: 'specs',
    specs: [
      { key: 'width', value: '125 – 500 mm' },
      { key: 'thickness', value: '17 – 23 mic' },
      { key: 'color', value: l('transparentă sau neagră') },
      { key: 'maxLoad', value: l('1000 kg pe palet') },
    ],
  },
  {
    slug: 'benzi-adezive',
    seoKey: 'benziAdezive',
    title: l('Benzi adezive'),
    card: {
      image: 'benzi-adezive-poza-3.jpg',
      text: l(
        'Benzi din BOPP cu adeziv acrilic, pe bază de cauciuc natural sau sintetic, pentru plastic, hârtie, carton, metal, sticlă și lemn.',
      ),
    },
    // Imagine provizorie (în original img-3.jpg [PROVIZORIU])
    image: 'benzi-adezive-poza-3.jpg',
    intro: [
      l(
        'Benzile adezive sunt realizate din BOPP (polipropilenă biorientată) și au un strat de adeziv: acrilic, pe bază de cauciuc natural (solvent) sau pe bază de cauciuc sintetic (hot melt). Pot fi folosite pe plastic, hârtie, carton, metal, sticlă, lemn etc.',
      ),
      l('Aplicarea se poate face manual sau cu echipamente automate.'),
    ],
  },
]

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug)
}
