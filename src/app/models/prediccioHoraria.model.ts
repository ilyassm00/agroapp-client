export interface PrediccioHoraria {
    codiMunicipi: string;
    dies: DiesHoraria[];
}

export interface DiesHoraria {
    data: string;
    variables: VarPrediccioHoraria
}

export interface VarPrediccioHoraria {
    temp: VariableHoraria;
    precipitacio: VariableHoraria;
}

export interface VariableHoraria {
    unitat: string;
    valors: ValorsHoraria[];
}

export interface ValorsHoraria {
    valor: string;
    data: string;
}