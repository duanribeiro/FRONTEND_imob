"use client";
import React, { createContext, useContext, useReducer, ReactNode } from "react";

// Definindo a interface para a ação
interface LoadingAction {
  type: "SET_LOADING_ON" | "SET_LOADING_OFF";
}

// Estado inicial tipado
const initialState: boolean = false;

// Constantes para os tipos de ações
const SET_LOADING_ON = "SET_LOADING_ON";
const SET_LOADING_OFF = "SET_LOADING_OFF";

// Reducer tipado
const loadingReducer = (
  state: boolean = initialState,
  action: LoadingAction
): boolean => {
  switch (action.type) {
    case SET_LOADING_ON:
      return true;
    case SET_LOADING_OFF:
      return false;
    default:
      return state;
  }
};

// Criando o contexto
const LoadingContext = createContext<{
  state: boolean;
  dispatch: React.Dispatch<LoadingAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Componente provedor
export const LoadingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(loadingReducer, initialState);

  return (
    <LoadingContext.Provider value={{ state, dispatch }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoadingContext = () => useContext(LoadingContext);
