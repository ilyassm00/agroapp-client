import { EstatCel } from "./estatCel.model"

export interface PrediccioDiaria {
    codiMunicipi: string,
    dies: DiesDiaria[]
}

export interface DiesDiaria {
    data: string,
    variables: VarPrediccioDiaria,
    estatCel: EstatCel
}

export interface VarPrediccioDiaria {
    tmax: VariableDiaria,
    tmin: VariableDiaria,
    precipitacio: VariableDiaria,
    estatCel: EstatCelDiaria
}

export interface VariableDiaria {
    unitat: string,
    valor: number
}

export interface EstatCelDiaria {
    valor: number
}