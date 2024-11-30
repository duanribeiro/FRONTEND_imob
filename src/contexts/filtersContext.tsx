"use client";
import React, { createContext, useContext, useReducer, ReactNode } from "react";

// Definindo a interface para o estado
interface FiltersState {
  slider_rent_prices: number[];
  slider_sell_prices: number[];
  slider_area: number[];
  slider_rooms: number[];
  slider_bathrooms: number[];
  slider_parkings: number[];
  actives: {
    slider_rent_prices: boolean;
    slider_sell_prices: boolean;
    slider_area: boolean;
    slider_rooms: boolean;
    slider_bathrooms: boolean;
    slider_parkings: boolean;
  };
}

// Definindo a interface para a ação
type FiltersAction =
  | { type: typeof CHANGE_SLIDER_RENT_PRICES; payload: number[] }
  | { type: typeof CHANGE_SLIDER_SELL_PRICES; payload: number[] }
  | { type: typeof CHANGE_SLIDER_AREA; payload: number[] }
  | { type: typeof CHANGE_SLIDER_ROOMS; payload: number[] }
  | { type: typeof CHANGE_SLIDER_BATHROOMS; payload: number[] }
  | { type: typeof CHANGE_SLIDER_PARKINGS; payload: number[] }
  | ToggleActiveFilterAction;

interface ToggleActiveFilterAction {
  type: typeof TOGGLE_ACTIVE_FILTER;
  payload: keyof FiltersState["actives"];
}

// Estado inicial tipado
const initialState: FiltersState = {
  slider_rent_prices: [1000, 5000],
  slider_sell_prices: [0, 2_500_000],
  slider_area: [0, 200],
  slider_rooms: [1, 3],
  slider_bathrooms: [1, 2],
  slider_parkings: [1, 1],
  actives: {
    slider_rent_prices: false,
    slider_sell_prices: false,
    slider_area: false,
    slider_rooms: false,
    slider_bathrooms: false,
    slider_parkings: false,
  },
};

// Constantes para os tipos de ações
const TOGGLE_ACTIVE_FILTER = "TOGGLE_ACTIVE_FILTER";
const CHANGE_SLIDER_RENT_PRICES = "CHANGE_SLIDER_RENT_PRICES";
const CHANGE_SLIDER_SELL_PRICES = "CHANGE_SLIDER_SELL_PRICES";
const CHANGE_SLIDER_AREA = "CHANGE_SLIDER_AREA";
const CHANGE_SLIDER_ROOMS = "CHANGE_SLIDER_ROOMS";
const CHANGE_SLIDER_BATHROOMS = "CHANGE_SLIDER_BATHROOMS";
const CHANGE_SLIDER_PARKINGS = "CHANGE_SLIDER_PARKINGS";

// Reducer tipado
const filtersReducer = (
  state: FiltersState = initialState,
  action: FiltersAction
): FiltersState => {
  switch (action.type) {
    case TOGGLE_ACTIVE_FILTER:
      return {
        ...state,
        actives: {
          ...state.actives,
          [action.payload]: !state.actives[action.payload], // Alterna o valor
        },
      };
    case CHANGE_SLIDER_RENT_PRICES:
      return {
        ...state,
        slider_rent_prices: action.payload as number[],
        actives: { ...state.actives, slider_rent_prices: true },
      };
    case CHANGE_SLIDER_SELL_PRICES:
      return {
        ...state,
        slider_sell_prices: action.payload as number[],
        actives: { ...state.actives, slider_sell_prices: true },
      };
    case CHANGE_SLIDER_AREA:
      return {
        ...state,
        slider_area: action.payload as number[],
        actives: { ...state.actives, slider_area: true },
      };
    case CHANGE_SLIDER_ROOMS:
      return {
        ...state,
        slider_rooms: action.payload as number[],
        actives: { ...state.actives, slider_rooms: true },
      };
    case CHANGE_SLIDER_BATHROOMS:
      return {
        ...state,
        slider_bathrooms: action.payload as number[],
        actives: { ...state.actives, slider_bathrooms: true },
      };
    case CHANGE_SLIDER_PARKINGS:
      return {
        ...state,
        slider_parkings: action.payload as number[],
        actives: { ...state.actives, slider_parkings: true },
      };
    default:
      return state;
  }
};

// Criando o contexto
const FiltersContext = createContext<{
  state: FiltersState;
  dispatch: React.Dispatch<FiltersAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Componente provedor
export const FiltersProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(filtersReducer, initialState);

  return (
    <FiltersContext.Provider value={{ state, dispatch }}>
      {children}
    </FiltersContext.Provider>
  );
};

export const useFiltersContext = () => useContext(FiltersContext);
