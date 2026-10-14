import { toInteger } from "@/lib/utils";
import { BoxContent, BoxSize, CookieSize, Product } from "./types";

export const boxOptions:
  Record<CookieSize, Record<BoxSize, BoxContent>> = {
  classic: {
    small: { flavorCount: 1, price: toInteger(1800), count: 6 },
    medium: { flavorCount: 2, price: toInteger(2500), count: 12 },
    large: { flavorCount: 2, price: toInteger(3000), count: 24 },
  },
  jumbo: {
    small: { flavorCount: 1, price: toInteger(1800), count: 3 },
    medium: { flavorCount: 2, price: toInteger(2500), count: 6 },
    large: { flavorCount: 2, price: toInteger(3000), count: 12 },
  }
}


export const catalog: Product[] = [
  {
    id: '14dba3d6-bba2-42c0-9401-65dddd8fe045',
    size: 'classic',
    allergenInfo: {
      EU: {
        contains: ['gluten', 'eggs', 'milk'],
        mayContain: ['nuts', 'soybeans'],
      },
    },
    price: toInteger(320),
    image: {
      url: '/images/mitte.jpg',
    },
    text: {
      en: {
        name: 'Mitte',
        tagline: 'The classic, where it all began. Soft and gooey.',
        flavor: 'Chocolate chip',
        altText: 'Chocolate chip cookie',
      },
      de: {
        name: 'Mitte',
        tagline: 'Der Klassiker, mit dem alles begann. Weich und saftig.',
        flavor: 'Chocolate Chip',
        altText: 'Chocolate-Chip-Cookie',
      },
    },
    availableFrozen: true,
  },
  {
    id: '745db782-7df2-4fed-ab33-8ed3fa78afd0',
    size: 'classic',
    allergenInfo: 'unknown',
    dietaryLabels: ['vegan'],
    price: toInteger(340),
    image: {
      url: '/images/prenzlauerberg.jpg',
    },
    text: {
      en: {
        name: 'Prenzlauer Berg',
        tagline: 'Einfach vegan. The classic chocolate chip cookie, no animals harmed.',
        flavor: 'Vegan chocolate chip',
        altText: 'Vegan chocolate chip cookie',
      },
      de: {
        name: 'Prenzlauer Berg',
        tagline: 'Einfach vegan. Der klassische Chocolate-Chip-Cookie, kein Tier kam zu Schaden.',
        flavor: 'Veganer Chocolate Chip',
        altText: 'Veganer Chocolate-Chip-Cookie',
      },
    },
    availableFrozen: true,
  },
  {
    id: '00bdbae9-7a13-4685-ba95-d0203fac3f69',
    size: 'classic',
    allergenInfo: 'unknown',
    price: toInteger(350),
    image: {
      url: '/images/zehlendorf.jpg',
    },
    text: {
      en: {
        name: 'Zehlendorf',
        tagline: 'The best from the US. Chocolatey and creamy.',
        flavor: 'Oreo chip',
        altText: 'Oreo chip cookie',
      },
      de: {
        name: 'Zehlendorf',
        tagline: 'Das Beste aus den USA. Schokoladig und cremig.',
        flavor: 'Oreo Chip',
        altText: 'Oreo-Chip-Cookie',
      },
    },
    availableFrozen: true,
  },
  {
    id: '26f31d4a-4782-4d1b-9214-a1ef9d2399a2',
    size: 'classic',
    allergenInfo: 'unknown',
    price: toInteger(380),
    image: {
      url: '/images/charlottenburg.jpg',
    },
    text: {
      en: {
        name: 'Charlottenburg',
        tagline: 'The nobility of cookies.',
        flavor: 'Salted macadamia and white chocolate chip',
        altText: 'Salted macadamia white chocolate chip cookie',
      },
      de: {
        name: 'Charlottenburg',
        tagline: 'Der Adel unter den Cookies.',
        flavor: 'Gesalzene Macadamia und weiße Schokolade',
        altText: 'Cookie mit gesalzener Macadamia und weißer Schokolade',
      },
    },
    availableFrozen: true,
  },
  {
    id: 'f864c3d6-3cd2-4aeb-a650-8954022c9a11',
    size: 'classic',
    allergenInfo: 'unknown',
    price: toInteger(360),
    image: {
      url: '/images/schoeneberg.jpg',
    },
    text: {
      en: {
        name: 'Schöneberg',
        tagline: 'Flashy and luxurious. Slightly chocolatey, tangy, with white chocolate chips.',
        flavor: 'Red velvet',
        altText: 'Red velvet cookie with white chocolate chips',
      },
      de: {
        name: 'Schöneberg',
        tagline: 'Auffällig und luxuriös. Leicht schokoladig, fein säuerlich, mit weißen Schokostückchen.',
        flavor: 'Red Velvet',
        altText: 'Red-Velvet-Cookie mit weißen Schokostückchen',
      },
    },
    availableFrozen: true,
  },
  {
    id: 'df3b5e26-b06f-4e1c-b0f5-02f7c7b487de',
    size: 'classic',
    allergenInfo: 'unknown',
    price: toInteger(350),
    image: {
      url: '/images/wedding.jpg',
    },
    text: {
      en: {
        name: 'Wedding',
        tagline: 'The understated next big thing.',
        flavor: 'Salted brownie',
        altText: 'Salted brownie cookie',
      },
      de: {
        name: 'Wedding',
        tagline: 'Unaufgeregt, aber das nächste große Ding.',
        flavor: 'Gesalzener Brownie',
        altText: 'Gesalzener Brownie-Cookie',
      },
    },
    availableFrozen: true,
  },
  {
    id: 'd2c72006-2498-4224-9e5f-fb1809519f8b',
    size: 'jumbo',
    allergenInfo: 'unknown',
    price: toInteger(550),
    image: {
      url: '/images/kreuzberg.jpg',
    },
    text: {
      en: {
        name: 'Kreuzberg',
        tagline: 'The new classic on steroids.',
        flavor: 'Nutella stuffed chocolate chip',
        altText: 'Jumbo chocolate chip cookie broken open to show the Nutella filling',
      },
      de: {
        name: 'Kreuzberg',
        tagline: 'Der neue Klassiker auf Steroiden.',
        flavor: 'Chocolate Chip mit Nutella-Füllung',
        altText: 'Aufgebrochener Jumbo-Chocolate-Chip-Cookie mit Nutella-Füllung',
      },
    },
    availableFrozen: true,
  },
  {
    id: 'ca0f333b-8bb1-4e21-94a4-322145183dc1',
    size: 'jumbo',
    allergenInfo: 'unknown',
    price: toInteger(590),
    image: {
      url: '/images/friedrichshain.jpg',
    },
    text: {
      en: {
        name: 'Friedrichshain',
        tagline: 'For those who want it all in one place.',
        flavor: 'Triple chocolate salted caramel',
        altText: 'Jumbo triple chocolate cookie broken open to show the salted caramel',
      },
      de: {
        name: 'Friedrichshain',
        tagline: 'Für alle, die alles auf einmal wollen.',
        flavor: 'Dreifach Schokolade mit Salzkaramell',
        altText: 'Aufgebrochener Jumbo-Cookie mit dreifach Schokolade und Salzkaramell',
      },
    },
    availableFrozen: true,
  },
  {
    id: '6005b3ad-2aa8-4853-883d-c51a421d5b64',
    size: 'classic',
    allergenInfo: 'unknown',
    price: toInteger(1800),
    image: {
      url: '/images/tray.jpg',
    },
    text: {
      en: {
        name: 'Frozen cookie dough',
        tagline: 'Comes in a box, ready to live in your freezer. Bake a few whenever you want them warm.',
        flavor: '',  // not in the prototype: ask Michèle which flavor the box has
        altText: 'Freshly baked red velvet cookies on baking paper',
      },
      de: {
        name: 'Gefrorener Cookieteig',
        tagline: 'Kommt in einer Box und zieht direkt in dein Gefrierfach. Back dir ein paar, wann immer du sie warm möchtest.',
        flavor: '',  // not in the prototype: ask Michèle which flavor the box has
        altText: 'Frisch gebackene Red-Velvet-Cookies auf Backpapier',
      },
    },
    availableFrozen: true,
  },
];
