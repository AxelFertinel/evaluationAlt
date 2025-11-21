export type CustomerLevel = "BASIC" | "PREMIUM";

export interface ShippingZone {
  zone: "ZONE1" | "ZONE2" | "ZONE3" | "ZONE4";
  base: number;
  per_kg: number;
}

export type Currency = "EUR" | "USD" | "GBP";

export interface Customer {
  id: string;
  name: string;
  level: CustomerLevel;
  shipping_zone: ShippingZone;
  currency: Currency;
}

export interface Order {
  id: string;
  customer_id: Customer;
  product_id: Product;
  qty: number;
  unit_price: number;
  date: string;
  promo_code: Promotion | null;
  time: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  weight: number;
  taxable: boolean;
}

export interface Promotion {
  code: string;
  type: "PERCENTAGE" | "FIXED";
  value: number;
  active: boolean;
}
