import { Integer } from "@/lib/utils";

type CookieSize = 'classic' | 'jumbo'

type CookieProductType = 'frozen-dough' | 'baked-cookie'

type DietaryLabel =
  | 'vegan'
  | 'vegetarian'
  | 'gluten-free';

type Image = {
  url: string;
  altText: string;
};

type Product = {
  id: string;
  name: string;
  size: CookieSize;
  productType: CookieProductType;
  allergenInfo: CookieAllergenInfo | 'unknown';
  price: Integer;
  image: Image;
  dietaryLabels?: DietaryLabel[];
  flavor: string;
  tagline?: string;
};



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

export type { CookieSize, CookieProductType, Product }