"use client";
import React, { createContext, useContext, useReducer, ReactNode } from "react";

// Definindo a interface para o estado
interface FiltersState {
  start_date: string;
  end_date: string;
  slider_rent_prices: number[];
  slider_sell_prices: number[];
  checked: boolean[];
}

// Definindo a interface para a ação
interface FiltersAction {
  type: string;
  payload?: string | number[] | boolean[];
}

// Estado inicial tipado
const initialState: FiltersState = {
  start_date: "2021-04-01",
  end_date: "2022-01-01",
  slider_rent_prices: [1000, 5000],
  slider_sell_prices: [0, 2_500_000],
  checked: [false, false, false, false, false],
};

// Constantes para os tipos de ações
const CHANGE_START_DATE = "CHANGE_START_DATE";
const CHANGE_END_DATE = "CHANGE_END_DATE";
const CHANGE_SLIDER_RENT_PRICES = "CHANGE_SLIDER_RENT_PRICES";
const CHANGE_SLIDER_SELL_PRICES = "CHANGE_SLIDER_SELL_PRICES";
const UPDATE_CHECKBOX = "UPDATE_CHECKBOX";

// Reducer tipado
const filtersReducer = (
  state: FiltersState = initialState,
  action: FiltersAction
): FiltersState => {
  switch (action.type) {
    case CHANGE_START_DATE:
      return { ...state, start_date: action.payload as string };
    case CHANGE_END_DATE:
      return { ...state, end_date: action.payload as string };
    case CHANGE_SLIDER_RENT_PRICES:
      return { ...state, slider_rent_prices: action.payload as number[] };
    case CHANGE_SLIDER_SELL_PRICES:
      return { ...state, slider_sell_prices: action.payload as number[] };
    case UPDATE_CHECKBOX:
      return { ...state, checked: action.payload as boolean[] };
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
