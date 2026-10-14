import { Integer } from "@/lib/utils";
import { Locale } from "@/features/i18n/dictionaries/dictionaries";

type CookieSize = 'classic' | 'jumbo'

type DietaryLabel =
  | 'vegan'
  | 'vegetarian'
  | 'gluten-free';

type Image = {
  url: string;
};

type ProductText = {
  name: string;
  tagline: string;
  flavor: string;
  altText: string;
};

type Product = {
  id: string;
  size: CookieSize;
  allergenInfo: CookieAllergenInfo | 'unknown';
  price: Integer;
  image: Image;
  dietaryLabels?: DietaryLabel[];
  availableFrozen: boolean;
  text: Record<Locale, ProductText>;
};

 
type BoxContent = { flavorCount: 1 | 2, price: Integer, count: number }


type BoxSize = 'small' | 'medium' | 'large'


type EUAllergen =
  | 'gluten'
  | 'crustaceans'
  | 'eggs'
  | 'fish'
  | 'peanuts'
  | 'soybeans'
  | 'milk'
  | 'nuts'
  | 'celery'
  | 'mustard'
  | 'sesame'
  | 'sulphites'
  | 'lupin'
  | 'molluscs';

type CookieAllergenInfo = {
  EU: {
    contains: EUAllergen[];
    mayContain: EUAllergen[];
  };
};

export type { CookieSize, Product, BoxContent, BoxSize }