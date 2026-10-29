// Produsele: cele trei categorii și cele 7 tipuri de folie de protecție.
// Textele se modifică aici, fără să umbli în componente.
// Textele sunt în română și engleză: l(ro, en). Dacă lipsește o traducere, rămâne '[PLACEHOLDER]'.

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

const solventOrWater = l('polietilenă cu adeziv pe bază de solvent sau apă', 'polyethylene with solvent- or water-based adhesive')
export const categories: Category[] = [
  {
    slug: 'folii-protectie',
    seoKey: 'foliiProtectie',
    title: l('Folii de protecție', 'Protective films'),
    card: {
      image: 'folie-protectie-general-poza-1.jpg',
      text: l(
        'Film din polietilenă cu adeziv acrilic pe bază de apă sau solvent, pentru protecția suprafețelor pe toată durata producției, depozitării, transportului și montajului.',
        'Polyethylene film with water- or solvent-based acrylic adhesive, protecting surfaces throughout production, storage, transport and installation.',
      ),
    },
    intro: [
      l(
        'Foliile de protecție sunt folosite pentru protejarea suprafețelor împotriva deteriorării în timpul producției, depozitării, transportului și montajului. Sunt realizate din polietilenă, acoperite cu un strat de adeziv acrilic pe bază de apă sau solvent și sunt disponibile într-o gamă largă de grosimi și lățimi, în funcție de suprafața pe care se aplică.',
        'Protective films are used to protect surfaces from damage during production, storage, transport and installation. They are made of polyethylene coated with a layer of water- or solvent-based acrylic adhesive and are available in a wide range of thicknesses and widths, depending on the surface they are applied to.',
      ),
    ],
    surfaces: l(
      'tablă prevopsită, tablă tip țiglă, panouri sandwich, tablă din inox, tablă din aluminiu, plăci Alcobond, mochetă, sticlă etc.',
      'pre-painted sheet metal, tile-profile sheet metal, sandwich panels, stainless steel sheet, aluminium sheet, Alcobond panels, carpet, glass, etc.',
    ),
    note: l('Folia se îndepărtează fără a lăsa urme de adeziv.', 'The film peels off without leaving adhesive residue.'),
    specsTitle: 'commonSpecs',
    specs: [{ key: 'type', value: solventOrWater }],
    items: [
      {
        slug: 'tabla-prevopsita',
        image: 'folie_tabla_prevopsita.jpg',
        title: l('Tablă prevopsită', 'Pre-painted sheet metal'),
        text: l(
          'Folia se aplică pe tabla prevopsită pentru a o proteja în timpul prelucrării, depozitării, transportului și montajului. Poate fi folosită pe panouri sandwich, țiglă metalică, tablă cutată, tablă plană etc. Nu interacționează chimic cu suprafața și se îndepărtează ușor, fără urme de adeziv. Poate fi personalizată cu logo-ul sau numele companiei.',
          'The film is applied to pre-painted sheet metal to protect it during processing, storage, transport and installation. It can be used on sandwich panels, metal roof tiles, corrugated sheet, flat sheet, etc. It does not react chemically with the surface and peels off easily, without adhesive residue. It can be customised with your company logo or name.',
        ),
        specs: [
          { key: 'color', value: l('transparentă, albastru deschis, albă', 'clear, light blue, white') },
          { key: 'thickness', value: '30 – 60 mic' },
          { key: 'width', value: '1000 – 1250 mm' },
          { key: 'length', value: '500 – 1500 m' },
          { key: 'adhesion', value: '200 – 1500 g/50 mm' },
        ],
      },
      {
        slug: 'inox-ambutisat',
        image: 'folie_inox_ambutisat.jpg',
        title: l('Inox ambutisat', 'Deep-drawn stainless steel'),
        text: l(
          'Folia se aplică pe tabla din inox ambutisat pentru a proteja împotriva zgârieturilor care pot apărea în timpul procesului de ambutisare sau presare. Are rezistență mare la rupere și alungire. Nu interacționează chimic cu suprafața și se îndepărtează ușor, fără urme de adeziv. Poate fi personalizată cu logo-ul sau numele companiei.',
          'The film is applied to deep-drawn stainless steel sheet to protect against scratches that may occur during deep drawing or pressing. It has high tear resistance and elongation. It does not react chemically with the surface and peels off easily, without adhesive residue. It can be customised with your company logo or name.',
        ),
        specs: [
          { key: 'color', value: l('transparentă, albastru deschis, albă', 'clear, light blue, white') },
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
        title: l('Tablă din inox', 'Stainless steel sheet'),
        text: l(
          'Folia se aplică pe tabla din inox pentru a o proteja împotriva zgârieturilor care pot apărea în timpul prelucrării, depozitării, transportului și montajului. Nu interacționează chimic cu suprafața și se îndepărtează ușor, fără urme de adeziv. Poate fi personalizată cu logo-ul sau numele companiei.',
          'The film is applied to stainless steel sheet to protect it against scratches that may occur during processing, storage, transport and installation. It does not react chemically with the surface and peels off easily, without adhesive residue. It can be customised with your company logo or name.',
        ),
        specs: [
          { key: 'color', value: l('transparentă, albastru deschis', 'clear, light blue') },
          { key: 'thickness', value: '50 – 1000 mic' },
          { key: 'width', value: '100 – 1250 mm' },
          { key: 'length', value: '500 – 1500 m' },
          { key: 'adhesion', value: '5 – 1500 g/50 mm' },
        ],
      },
      {
        slug: 'profile-aluminiu',
        image: 'folie_aluminiu.jpg',
        title: l('Profile din aluminiu', 'Aluminium profiles'),
        text: l(
          'Folia se aplică pe profilele din aluminiu pentru a le proteja împotriva zgârieturilor care pot apărea în timpul prelucrării, depozitării, transportului și montajului. Nu interacționează chimic cu suprafața și se îndepărtează ușor, fără urme de adeziv. Poate fi personalizată cu logo-ul sau numele companiei.',
          'The film is applied to aluminium profiles to protect them against scratches that may occur during processing, storage, transport and installation. It does not react chemically with the surface and peels off easily, without adhesive residue. It can be customised with your company logo or name.',
        ),
        specs: [
          { key: 'color', value: l('albă sau alb/gri', 'white or white/grey') },
          { key: 'thickness', value: '30 – 80 mic' },
          { key: 'width', value: '20 – 1250 mm' },
          { key: 'length', value: '500 – 1500 m' },
          { key: 'adhesion', value: '500 – 1500 g/50 mm' },
        ],
      },
      {
        slug: 'mocheta',
        image: 'folie_mocheta.jpg',
        title: l('Mochetă', 'Carpet'),
        text: l(
          'Folia se aplică pe mochetă pentru a o proteja în timpul renovărilor sau împotriva traficului pietonal. Este folosită frecvent de constructori și de organizatorii de expoziții. Nu interacționează chimic cu suprafața și se îndepărtează ușor, fără urme de adeziv. Poate fi personalizată cu logo-ul sau numele companiei.',
          'The film is applied to carpet to protect it during renovations or against foot traffic. It is often used by builders and exhibition organisers. It does not react chemically with the surface and peels off easily, without adhesive residue. It can be customised with your company logo or name.',
        ),
        specs: [
          { key: 'color', value: l('transparentă', 'clear') },
          { key: 'thickness', value: '50 – 100 mic' },
          { key: 'width', value: '500 – 1000 mm' },
          { key: 'length', value: '500 – 1000 m' },
          { key: 'adhesion', value: '500 – 1500 g/50 mm' },
        ],
      },
      {
        slug: 'geam',
        image: 'folie_geam.jpg',
        title: l('Geam', 'Glass'),
        text: l(
          'Folia se aplică pe geam pentru a-l proteja în timpul prelucrării, depozitării, transportului și montajului. Nu interacționează chimic cu suprafața și se îndepărtează ușor, fără urme de adeziv. Poate fi personalizată cu logo-ul sau numele companiei.',
          'The film is applied to glass to protect it during processing, storage, transport and installation. It does not react chemically with the surface and peels off easily, without adhesive residue. It can be customised with your company logo or name.',
        ),
        specs: [
          { key: 'color', value: l('transparentă, albastru deschis', 'clear, light blue') },
          { key: 'thickness', value: '30 – 60 mic' },
          { key: 'width', value: '1000 – 1250 mm' },
          { key: 'length', value: '500 – 1500 m' },
          { key: 'adhesion', value: '200 – 1500 g/50 mm' },
        ],
      },
      {
        slug: 'policarbonat',
        image: 'folie_policarbonat.jpg',
        title: l('Policarbonat', 'Polycarbonate'),
        text: l(
          'Folia se aplică pe policarbonat pentru a-l proteja în timpul prelucrării, depozitării, transportului și montajului. Nu interacționează chimic cu suprafața și se îndepărtează ușor, fără urme de adeziv. Poate fi personalizată cu logo-ul sau numele companiei.',
          'The film is applied to polycarbonate to protect it during processing, storage, transport and installation. It does not react chemically with the surface and peels off easily, without adhesive residue. It can be customised with your company logo or name.',
        ),
        specs: [
          { key: 'color', value: l('transparentă, albastru deschis', 'clear, light blue') },
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
    title: l('Folii stretch', 'Stretch films'),
    card: {
      image: 'folie-strech-poza-2.jpg',
      text: l(
        'Pentru ambalarea și protecția mărfurilor împotriva prafului și umidității, cu rezistență la rupere și la sarcini de până la 1000 kg pe palet.',
        'For wrapping and protecting goods against dust and moisture, tear-resistant and suitable for loads of up to 1000 kg per pallet.',
      ),
    },
    // Imagine provizorie (în original img-2.jpg [PROVIZORIU])
    image: 'folie-strech-poza-2.jpg',
    intro: [
      l(
        'Foliile stretch sunt folosite pentru ambalarea și protecția diferitelor tipuri de mărfuri, protejând conținutul de praf și umiditate. Sunt rezistente la rupere și pot susține încărcături de până la 1000 kg pe palet, fără alunecare.',
        'Stretch films are used to wrap and protect various types of goods, shielding the contents from dust and moisture. They are tear-resistant and can hold loads of up to 1000 kg per pallet without slipping.',
      ),
      l(
        'Pot fi produse în lățimi de la 125 mm la 500 mm și grosimi de la 17 la 23 de microni, transparente sau negre.',
        'They can be produced in widths from 125 mm to 500 mm and thicknesses from 17 to 23 microns, clear or black.',
      ),
      l('Oferim folii stretch pentru uz manual sau automat.', 'We offer stretch films for manual or automatic use.'),
    ],
    specsTitle: 'specs',
    specs: [
      { key: 'width', value: '125 – 500 mm' },
      { key: 'thickness', value: '17 – 23 mic' },
      { key: 'color', value: l('transparentă sau neagră', 'clear or black') },
      { key: 'maxLoad', value: l('1000 kg pe palet', '1000 kg per pallet') },
    ],
  },
  {
    slug: 'benzi-adezive',
    seoKey: 'benziAdezive',
    title: l('Benzi adezive', 'Adhesive tapes'),
    card: {
      image: 'benzi-adezive-poza-3.jpg',
      text: l(
        'Benzi din BOPP cu adeziv acrilic, pe bază de cauciuc natural sau sintetic, pentru plastic, hârtie, carton, metal, sticlă și lemn.',
        'BOPP tapes with acrylic, natural rubber or synthetic rubber adhesive, for plastic, paper, cardboard, metal, glass and wood.',
      ),
    },
    // Imagine provizorie (în original img-3.jpg [PROVIZORIU])
    image: 'benzi-adezive-poza-3.jpg',
    intro: [
      l(
        'Benzile adezive sunt realizate din BOPP (polipropilenă biorientată) și au un strat de adeziv: acrilic, pe bază de cauciuc natural (solvent) sau pe bază de cauciuc sintetic (hot melt). Pot fi folosite pe plastic, hârtie, carton, metal, sticlă, lemn etc.',
        'Adhesive tapes are made of BOPP (biaxially oriented polypropylene) and have an adhesive layer: acrylic, natural rubber-based (solvent) or synthetic rubber-based (hot melt). They can be used on plastic, paper, cardboard, metal, glass, wood, etc.',
      ),
      l('Aplicarea se poate face manual sau cu echipamente automate.', 'They can be applied by hand or with automatic equipment.'),
    ],
  },
]

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug)
}
