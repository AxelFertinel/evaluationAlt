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

import { parsingData, getDataFile } from "./function";

const customers: Customer[] = parsingData(getDataFile("customers.csv"));
const orders: Order[] = parsingData(getDataFile("orders.csv"));
const products: Product[] = parsingData(getDataFile("products.csv"));
const shippingZones: ShippingZone[] = parsingData(
  getDataFile("shipping_zones.csv")
);
const promotions: Promotion[] = parsingData(getDataFile("promotions.csv"));
