export type PlacesState = {
  user: any;
  rent_houses: boolean;
  school_filter: boolean;
  police_station_filter: boolean;
  subway_station_filter: boolean;
  shopping_mall_filter: boolean;
  bank_filter: boolean;
  gas_station_filter: boolean;
  gym_filter: boolean;
  // active_districts: string[];
};

export type PlacesAction =
  | { type: "rent_houses" }
  | { type: "school_filter" }
  | { type: "police_station_filter" }
  | { type: "subway_station_filter" }
  | { type: "shopping_mall_filter" }
  | { type: "bank_filter" }
  | { type: "gas_station_filter" }
  | { type: "gym_filter" };
// | { type: 'ACTIVE_DISTRICT'; district: string };
