export interface Item {
  _id: string;
  real_estate?: boolean;
  url?: string;
  data?: any;
  [key: string]: any;
}

export type IconType =
  | "school"
  | "subway_station"
  | "shopping_mall"
  | "bank"
  | "gas_station"
  | "gym"
  | "rent_house"
  | "police_station";

export interface IconPosition {
  lat: number;
  lng: number;
}

export interface Action {
  type: string;
  payload?: any;
}
