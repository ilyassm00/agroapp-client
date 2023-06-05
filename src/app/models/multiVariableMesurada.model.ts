import { VariableMeteo } from "./variableMeteo.model";

export interface MultiVariableMesurada {
    codi: number;
    variable: VariableMeteo;
    lectures: LecturaMultiVariableMesurada[];
}

export interface LecturaMultiVariableMesurada {
    data: string;
    valor: number;
    estat: string;
    baseHoraria: string;
}