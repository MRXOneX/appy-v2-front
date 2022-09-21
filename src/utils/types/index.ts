export type Element = {
    id?: string;
    name: string
    type: string;
    x: number;
    y: number;
    width: number;
    height: number;
    
    fill?: string;
  
    text?: string;
    fontSize?: number;
    fontFamily?: string;
    fontStyle?: string;

    designId?: number
  
    image?: string;

    isReplace?: boolean

    new?: boolean
}