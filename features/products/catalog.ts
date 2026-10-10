import { toInteger } from "@/lib/utils";
import { Product } from "./types";

const catalog: Product[] = [
  {
    id: '14dba3d6-bba2-42c0-9401-65dddd8fe045',
    name: 'Mitte',
    size: 'classic',
    productType: 'baked-cookie',
    allergenInfo: {
      EU: {
        contains: ['gluten', 'eggs', 'milk'],
        mayContain: ['nuts', 'soybeans'],
      },
    },
    price: toInteger(320),
    image: {
      url: '/images/mitte.jpg',
      altText: 'Classic Chocolate Chip Cookie',
    },
    flavor: 'chocolate chip',
    tagline: 'The classic, where it all began. Soft and gooey.',
  },
    {
    id: 'd3f5e6a7-8c9b-4e2f-9c1a-2b3d4e5f6g7h',
    name: 'Prenzlauer Berg',
    size: 'jumbo',
    productType: 'baked-cookie',
    allergenInfo: {
      EU: {
        contains: ['gluten', 'eggs', 'milk', 'nuts'],
        mayContain: ['soybeans'],
      },
    },
    price: toInteger(450),
    image: {
      url: '/images/prenzlauerberg.jpg',
      altText: 'Jumbo Prenzlauer Berg Cookie',
    },
    flavor: 'chocolate chip',
    tagline: 'The big, the bold, the unforgettable.',
  },
  {
    id: '00bdbae9-7a13-4685-ba95-d0203fac3f69',
    name: 'Zehlendorf',
    size: 'classic',
    productType: 'baked-cookie',
    allergenInfo: 'unknown',
    price: toInteger(350),
    image: {
      url: '/images/zehlendorf.jpg',
      altText: 'Oreo chip cookie',
    },
    flavor: 'oreo chip',
    tagline: 'The best from the US. Chocolatey and creamy.',
  },
  {
    id: '26f31d4a-4782-4d1b-9214-a1ef9d2399a2',
    name: 'Charlottenburg',
    size: 'classic',
    productType: 'baked-cookie',
    allergenInfo: 'unknown',
    price: toInteger(380),
    image: {
      url: '/images/charlottenburg.jpg',
      altText: 'Salted macadamia white chocolate chip cookie',
    },
    flavor: 'salted macadamia and white chocolate chip',
    tagline: 'The nobility of cookies.',
  },
  {
    id: 'f864c3d6-3cd2-4aeb-a650-8954022c9a11',
    name: 'Schöneberg',
    size: 'classic',
    productType: 'baked-cookie',
    allergenInfo: 'unknown',
    price: toInteger(360),
    image: {
      url: '/images/schoeneberg.jpg',
      altText: 'Red velvet cookie with white chocolate chips',
    },
    flavor: 'red velvet',
    tagline: 'Flashy and luxurious. Slightly chocolatey, tangy, with white chocolate chips.',
  },
  {
    id: 'df3b5e26-b06f-4e1c-b0f5-02f7c7b487de',
    name: 'Wedding',
    size: 'classic',
    productType: 'baked-cookie',
    allergenInfo: 'unknown',
    price: toInteger(350),
    image: {
      url: '/images/wedding.jpg',
      altText: 'Salted brownie cookie',
    },
    flavor: 'salted brownie',
    tagline: 'The understated next big thing.',
  },
  {
    id: 'd2c72006-2498-4224-9e5f-fb1809519f8b',
    name: 'Kreuzberg',
    size: 'jumbo',
    productType: 'baked-cookie',
    allergenInfo: 'unknown',
    price: toInteger(550),
    image: {
      url: '/images/kreuzberg.jpg',
      altText: 'Jumbo chocolate chip cookie broken open to show the Nutella filling',
    },
    flavor: 'nutella stuffed chocolate chip',
    tagline: 'The new classic on steroids.',
  },
  {
    id: 'ca0f333b-8bb1-4e21-94a4-322145183dc1',
    name: 'Friedrichshain',
    size: 'jumbo',
    productType: 'baked-cookie',
    allergenInfo: 'unknown',
    price: toInteger(590),
    image: {
      url: '/images/friedrichshain.jpg',
      altText: 'Jumbo triple chocolate cookie broken open to show the salted caramel',
    },
    flavor: 'triple chocolate salted caramel',
    tagline: 'For those who want it all in one place.',
  },
  {
    id: '6005b3ad-2aa8-4853-883d-c51a421d5b64',
    name: 'Frozen cookie dough',
    size: 'classic',
    productType: 'frozen-dough',
    allergenInfo: 'unknown',
    price: toInteger(1800),
    image: {
      url: '/images/tray.jpg',
      altText: 'Freshly baked red velvet cookies on baking paper',
    },
    flavor: '', // not in the prototype: ask Michèle which flavor the box has
    tagline: 'Comes in a box, ready to live in your freezer. Bake a few whenever you want them warm.',
  },
];