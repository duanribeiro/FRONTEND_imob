"use client";
import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { DistrictsState, DistrictsAction } from "@/types";

const northDistricts: readonly string[] = [
  "barreira do triunfo",
  "represa",
  "benfica",
  "santa cruz",
  "nova era",
  "barbosa lage",
  "remonta",
  "jardim natal",
  "industrial",
  "francisco bernadino",
  "carlos chagas",
  "cerâmica",
  "são dimas",
  "esplanada",
  "monte castelo",
  "jóquei clube",
];

const eastDistricts: readonly string[] = [
  "botanágua",
  "são bernardo",
  "cesário alvim",
  "vitorino braga",
  "são benedito",
  "grajaú",
  "linhares",
  "santa rita",
  "n. s. aparecida",
  "manoel honório",
  "bonfim",
  "bairú",
  "progresso",
];

const westDistricts: readonly string[] = [
  "borboleta",
  // "morro do imperador",
  "martelos",
  "são pedro",
  "cruzeiro de santo antônio",
  "nova califórnia",
  "novo horizonte",
  "aeroporto",
];

const southeastDistricts: readonly string[] = [
  "vila ideal",
  "vila olavo costa",
  "furtado de menezes",
  // "floresta",
  "retiro",
  "santo antônio",
  "lourdes",
  "costa carvalho",
];

const southDistricts: readonly string[] = [
  "salvaterra",
  "sagrado coração",
  "são geraldo",
  "santa efigênia",
  "ipiranga",
  "santa luzia",
  "bomba de fogo",
  "graminha",
  "cascatinha",
];

const centerDistricts: readonly string[] = [
  "fábrica",
  "mariano procópio",
  "morro da glória",
  "santa catarina",
  "vale do ipê",
  "jardim glória",
  "santa helena",
  "paineiras",
  "dom bosco",
  "são mateus",
  "santa cecília",
  "mundo novo",
  "alto dos passos",
  "boa vista",
  "bom pastor",
  "vila ozanan",
  "poço rico",
  "granbery",
  "centro",
];

const initialState: DistrictsState = {
  actives: [],
  west_districts: [...westDistricts],
  east_districts: [...eastDistricts],
  south_districts: [...southDistricts],
  southeast_districts: [...southeastDistricts],
  north_districts: [...northDistricts],
  center_districts: [...centerDistricts],
  all: [
    ...northDistricts,
    ...eastDistricts,
    ...westDistricts,
    ...southDistricts,
    ...centerDistricts,
    ...southeastDistricts,
  ],
};

// Constantes para os tipos de ações
const ACTIVE_DISTRICT = "ACTIVE_DISTRICT";
const RESET_DISTRICT = "RESET_DISTRICT";

// Reducer tipado
const districtsReducer = (
  state: DistrictsState = initialState,
  action: DistrictsAction
): DistrictsState => {
  switch (action.type) {
    case ACTIVE_DISTRICT:
      if (state.actives.includes(action.district!)) {
        const newActives = state.actives.filter(
          (item) => item !== action.district
        );
        return { ...state, actives: newActives };
      } else {
        return { ...state, actives: [...state.actives, action.district!] };
      }
    case RESET_DISTRICT:
      return { ...state, actives: [] };
    default:
      return state;
  }
};

// Criando o contexto
const DistrictsContext = createContext<{
  state: DistrictsState;
  dispatch: React.Dispatch<DistrictsAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Componente provedor
export const DistrictsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(districtsReducer, initialState);

  return (
    <DistrictsContext.Provider value={{ state, dispatch }}>
      {children}
    </DistrictsContext.Provider>
  );
};

export const useDistrictsContext = () => useContext(DistrictsContext);
