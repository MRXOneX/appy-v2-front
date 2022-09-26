type Image = {
    url?: string
    baseUrl?: string

    isURL: boolean
}


export type Element = {
    id?: string;
    name: string
    type: string;
    _type: string;
    x: number;
    y: number;
    width: number;
    height: number;
    
    fill?: string;
  
    text?: string;
    fontSize?: number;
    fontFamily?: string;
    fontStyle?: string;
    stroke?: string


    designId?: number
  
    image?: Image;
    fit?: "cover" | "contain" | "fill" | "inside"
    pos?: "centre" | "top" | "right top" | "right" | "right bottom" | "bottom" | "left bottom" | "left" | "left top"

    isReplace?: boolean

    new?: boolean
}