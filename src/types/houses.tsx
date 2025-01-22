export type HousesState = {
  area: number | null;
  bathroom: number | null;
  bedroom: number | null;
  code: string;
  description: string;
  district: string | null;
  garage: number | null;
  id: number;
  last_update: string[] | null;
  latitude: number | null;
  longitude: number | null;
  number: string | null;
  price: number[] | null;
  real_estate: string;
  rent: number[] | null;
  street: string | null;
  url: string;
  zip_code: string | null;
};

export type HousesAction =
  | { type: "add_house"; payload: HousesState }
  | { type: "add_houses"; payload: HousesState[] }
  | { type: "remove_house"; payload: number }
  | { type: "update_house"; payload: HousesState }
  | { type: "set_houses"; payload: HousesState[] };
