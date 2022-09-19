export default class Tool {
    canvas: any;
    ctx: any;
    constructor(canvas: any) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')

        this.destroyEvents()
    }


    set fillColor(fillColor: any) {
        this.ctx.fillStyle = fillColor;
    }

    set strokeColor(strokeColor: any) {
        this.ctx.strokeStyle = strokeColor
    }

    set lineWidth(lineWidth: any) {
        this.ctx.lineWidth = lineWidth
    }


    destroyEvents() {
        this.canvas.onmousemove = null
        this.canvas.onmouseup = null
        this.canvas.onmousedown = null
        this.canvas.onmouseout = null
    }
}