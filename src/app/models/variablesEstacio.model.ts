import { VariableMeteo } from "./variableMeteo.model";

export interface VariablesEstacio {
    codi: string;
    variables: VariableMesurada[]
}

export interface VariableMesurada {
    codi: number;
    variable: VariableMeteo;
    lectures: LecturaVariableMesurada[]
}

export interface LecturaVariableMesurada {
    data: string;
    dataExtrem: string;
    valor: number;
    estat: string;
    baseHoraria: string;
}