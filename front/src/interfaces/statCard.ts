import type { ReactElement } from "react";

export interface statCard {
  title: string;
  value: number | string;
  icon: ReactElement;
  badge: string;
  color: string;
}
