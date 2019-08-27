import {PaletteOptions} from "@material-ui/core/styles/createPalette";

export interface Database {
    palette: PaletteOptions,
    email: string,
    github: string,
    address: string,
    postalCode: string,
    works: Array<Array<WorkInfo>>,
}

export interface WorkInfo {
    colSpan: number,
    rowSpan: number,
    id: string,
    title: string,
    subtitle: string,
    img: string,
    url: string,
}

export interface DatabaseIO {
    [propName: string]: Function;
}
