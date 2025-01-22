"use client";
import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { HousesState, HousesAction } from "@/types/houses";

// Estado inicial
const initialState: HousesState[] = [];

const housesReducer = (
  state: HousesState[],
  action: HousesAction
): HousesState[] => {
  switch (action.type) {
    case "add_house":
      return [...state, action.payload];
    case "add_houses":
      return [...state, ...action.payload];
    case "remove_house":
      return state.filter((house) => house.id !== action.payload);
    case "update_house":
      return state.map((house) =>
        house.id === action.payload.id ? { ...house, ...action.payload } : house
      );
    case "set_houses":
      return action.payload;
    default:
      return state;
  }
};

// Criando o contexto
const HousesContext = createContext<{
  state: HousesState[];
  dispatch: React.Dispatch<HousesAction>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

// Componente provedor
export const HousesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(housesReducer, initialState);

  return (
    <HousesContext.Provider value={{ state, dispatch }}>
      {children}
    </HousesContext.Provider>
  );
};

// Hook para usar o contexto
export const useHousesContext = () => {
  const context = useContext(HousesContext);
  if (!context) {
    throw new Error(
      "useHousesContext deve ser usado dentro de um HousesProvider"
    );
  }
  return context;
};
