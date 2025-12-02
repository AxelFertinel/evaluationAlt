// typage du projet
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
  level: "BASIC" | "PREMIUM";
  shipping_zone: "ZONE1" | "ZONE2" | "ZONE3" | "ZONE4";
  currency: "EUR" | "USD" | "GBP";
}

export interface Order {
  id: string;
  customer_id: string;
  product_id: string;
  qty: number;
  unit_price: number;
  date: string;
  promo_code: "PERCENTAGE" | "FIXED" | "";
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
