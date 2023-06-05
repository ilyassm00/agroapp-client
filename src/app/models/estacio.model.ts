import { Comarca } from "./comarca.model";
import { Municipi } from "./municipi.model";
import { Provincia } from "./provincia.model";

export interface Estacio {
    codi: string;
    nom: string;
    tipus: string;
    coordenades: Coordenades;
    emplacament: string;
    altitud: number;
    municipi: Municipi;
    comarca: Comarca;
    provincia: Provincia;
    xarxa: Xarxa;
    estats: Estat[];
}

export interface Coordenades {
    latitud: number;
    longitud: number;
}

export interface Xarxa {
    codi: number;
    nom: string;
}

export interface Estat{
    codi: number;
    dataInici: string;
    dataFi: string;
}