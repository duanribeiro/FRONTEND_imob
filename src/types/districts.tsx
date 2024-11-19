export type DistrictsState = {
  west_districts: string[];
  east_districts: string[];
  south_districts: string[];
  southeast_districts: string[];
  north_districts: string[];
  center_districts: string[];
  actives: string[];
  all: string[];
};

export type DistrictsAction = {
  type: string;
  district?: string;
};

export type DistrictName =
  // NORTH
  | "barreira do triunfo"
  | "represa"
  | "benfica"
  | "santa cruz"
  | "nova era"
  | "barbosa lage"
  | "remonta"
  | "jardim natal"
  | "industrial"
  | "francisco bernadino"
  | "carlos chagas"
  | "cerâmica"
  | "são dimas"
  | "esplanada"
  | "monte castelo"
  | "jóquei clube"
  // EAST
  | "botanágua"
  | "são bernardo"
  | "cesário alvim"
  | "vitorino braga"
  | "são benedito"
  | "grajaú"
  | "linhares"
  | "santa rita"
  | "n. s. aparecida"
  | "manoel honório"
  | "bonfim"
  | "bairú"
  | "progresso"
  // WEST
  | "borboleta"
  | "morro do imperador"
  | "martelos"
  | "são pedro"
  | "cruzeiro de santo antônio"
  | "nova califórnia"
  | "novo horizonte"
  | "aeroporto"
  // SOUTHEAST
  | "vila ideal"
  | "vila olavo costa"
  | "furtado de menezes"
  | "retiro"
  | "santo antônio"
  | "lourdes"
  | "costa carvalho"
  // SOUTH
  | "salvaterra"
  | "sagrado coração"
  | "são geraldo"
  | "santa efigênia"
  | "ipiranga"
  | "santa luzia"
  | "bomba de fogo"
  | "graminha"
  | "cascatinha"
  // CENTER
  | "fábrica"
  | "mariano procópio"
  | "morro da glória"
  | "santa catarina"
  | "vale do ipê"
  | "jardim glória"
  | "santa helena"
  | "paineiras"
  | "dom bosco"
  | "são mateus"
  | "santa cecília"
  | "mundo novo"
  | "alto dos passos"
  | "boa vista"
  | "bom pastor"
  | "vila ozanan"
  | "poço rico"
  | "granbery"
  | "centro";
