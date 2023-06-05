export interface PrediccioUvi {
    ine: string,
    nom: string,
    comarca: number,
    capital: boolean,
    uvi: Uvi[]
}

export interface Uvi {
    date: string,
    hours: UviHoraria[]
}

export interface UviHoraria {
    hour: number,
    uvi: number,
    uvi_clouds: number
}