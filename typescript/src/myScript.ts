import {
  CustomerLevel,
  ShippingZone,
  Currency,
  Customer,
  Order,
  Product,
  Promotion,
} from "./type";

import {
  TAX,
  SHIPPING_LIMIT,
  SHIP,
  PREMIUM_THRESHOLD,
  LOYALTY_RATIO,
  HANDLING_FEE,
  MAX_DISCOUNT,
} from "./constants";

import { parsingData } from "./function";

const customers: Customer[] = parsingData("customers.csv");
const orders: Order[] = parsingData("orders.csv");
const products: Product[] = parsingData("products.csv");
const shippingZones: ShippingZone[] = parsingData("shipping_zones.csv");
const promotions: Promotion[] = parsingData("promotions.csv");


