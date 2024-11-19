"use client";
import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { PlacesState, PlacesAction } from "@/types/places";

// Estado inicial
const initialState: PlacesState = {
  user: null,
  rent_houses: false,
  school_filter: false,
  police_station_filter: false,
  subway_station_filter: false,
  shopping_mall_filter: false,
  bank_filter: false,
  gas_station_filter: false,
  gym_filter: false,
  // active_districts: [],
};

const placesReducer = (
  state: PlacesState,
  action: PlacesAction
): PlacesState => {
  switch (action.type) {
    case "rent_houses":
      return { ...state, rent_houses: !state.rent_houses };
    case "school_filter":
      return { ...state, school_filter: !state.school_filter };
    case "police_station_filter":
      return { ...state, police_station_filter: !state.police_station_filter };
    case "subway_station_filter":
      return { ...state, subway_station_filter: !state.subway_station_filter };
    case "shopping_mall_filter":
      return { ...state, shopping_mall_filter: !state.shopping_mall_filter };
    case "bank_filter":
      return { ...state, bank_filter: !state.bank_filter };
    case "gas_station_filter":
      return { ...state, gas_station_filter: !state.gas_station_filter };
    case "gym_filter":
      return { ...state, gym_filter: !state.gym_filter };
    // case 'ACTIVE_DISTRICT':
    //   if (state.active_districts.includes(action.district)) {
    //     const new_active_districts = state.active_districts.filter(item => item !== action.district);
    //     return { ...state, active_districts: new_active_districts };
    //   } else {
    //     return { ...state, active_districts: [...state.active_districts, action.district] };
    //   }
    default:
      return state;
  }
};

// Criando o contexto
const PlacesContext = createContext<{
  state: PlacesState;
  dispatch: React.Dispatch<PlacesAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Componente provedor
export const PlacesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(placesReducer, initialState);

  return (
    <PlacesContext.Provider value={{ state, dispatch }}>
      {children}
    </PlacesContext.Provider>
  );
};

// Hook para usar o contexto
export const usePlacesContext = () => useContext(PlacesContext);
