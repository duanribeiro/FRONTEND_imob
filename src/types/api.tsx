interface Geometry {
  location: {
    lat: number;
    lng: number;
  };
}

interface DistrictElement {
  geometry: Geometry;
  [key: string]: any;
}

export type DistrictResponse = {
  [key: string]: DistrictElement[];
};

export type House = {
  latitude: number;
  longitude: number;
  area: number | null;
  bathroom: number | null;
  bedroom: number | null;
  code: string;
  description: string;
  district: string | null;
  garage: number | null;
  id: number;
  last_update: string[];
  number: string | null;
  price: number[];
  real_estate: string;
  rent: number[];
  street: string | null;
  url: string;
  zip_code: string | null;
};
