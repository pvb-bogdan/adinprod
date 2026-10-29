// Datele firmei care nu se traduc. Se modifică doar aici.
export const company = {
  name: 'SC ADIN PROD INTERNATIONAL SRL',
  shortName: 'Adin Prod',
  address: {
    ro: 'Comuna Berceni, Bulevardul 1 Mai nr. 214, județul Ilfov, România',
    en: '[PLACEHOLDER]',
  },
  emails: ['office@adinprod.ro', 'export@adinprod.ro'],
  phones: ['0040 21 320 25 12', '0040 21 320 25 13'],
  // [PLACEHOLDER] numărul real de WhatsApp, doar cifre, cu prefixul de țară
  whatsapp: '40700000000',
  facebook: 'https://www.facebook.com/adinprod.ro',
  // Pentru formular: fișierul PHP din public_html
  contactHandler: '/contact-handler.php',
}

export const whatsappUrl = `https://wa.me/${company.whatsapp}`

// '0040 21 320 25 12' -> 'tel:+40213202512'
export function telHref(phone: string) {
  return 'tel:' + phone.replace(/\s/g, '').replace(/^00/, '+')
}
