export type Element = {
    id: string;
    name: string
    type: string;
    x: number;
    y: number;
    width: number;
    height: number;
    
    fill?: string;
  
    text?: string;
    fontSize?: number;
    fontColor?: string
    fontFamily?: string;
    fontStyle?: string;
  
    image?: string;
}