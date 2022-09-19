import { throws } from "assert";
import Tool from "./Tool";

export default class Rect extends Tool {
  height: number;
  width: number;
  ypos: number;
  xpos: number;
  color?: string;
  dragging?: boolean;

  is_dragging?: boolean;

  current_shape_index: number | null = null;
  startX: any;
  startY: any;

  constructor(
    canvas: any,

    xpos: number,
    ypos: number,
    width: number,
    height: number,
    color: string = "black",
    dragging: boolean = true
  ) {
    super(canvas);

    this.xpos = xpos;
    this.ypos = ypos;
    this.width = width;
    this.height = height;
    this.color = color;
    this.dragging = dragging;

    this.is_dragging = false;
    this.listen();
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.rect(this.xpos, this.ypos, this.width, this.height);
    this.ctx.fill();
    this.ctx.closePath();
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandle.bind(this);
    this.canvas.onmouseup = this.mouseUpHandle.bind(this);
    this.canvas.onmousedown = this.mouseDownHandle.bind(this);
    this.canvas.onmouseout = this.mouseOutHandle.bind(this);
  }

  is_mouse_in_shape(
    startX: number | string,
    startY: number | string,

    x: number,
    y: number,
    width: number,
    height: number
  ) {
    let shape_left = x;
    let shape_right = x + width;

    let shape_top = y;
    let shape_bottom = y + height;

    // console.log(shape_left, shape_right, shape_top, shape_bottom);
    // console.log(startX, startY);
    if (
      startX > shape_left &&
      startX < shape_right &&
      startY > shape_top &&
      startY < shape_bottom
    ) {
      console.log("log");
      return true;
    }

    return false;
  }

  mouseDownHandle(e: any) {
    console.log(e)
    this.startX = +e.offsetX;
    this.startY = +e.offsetY;

    console.log(this.startX)

    if (
      this.is_mouse_in_shape(
        this.startX,
        this.startY,
        this.xpos,
        this.ypos,
        this.width,
        this.height
      )
    ) {
      this.is_dragging = true;

      console.log("log");
      return;
    }
  }

  mouseOutHandle(e: MouseEvent) {
    if (!this.is_dragging) return;

    this.is_dragging = false;
  }

  mouseUpHandle(e: MouseEvent) {
    if (!this.is_dragging) return;

    this.is_dragging = false;
  }

  mouseMoveHandle(e: MouseEvent) {
    if (!this.is_dragging) return;

    if (this.is_dragging) {
      console.log("log");
      let mouseX = +e.clientX;
      let mouseY = +e.clientY;

      let dx = mouseX - this.startX;
      let dy = mouseY - this.startY;

      this.xpos += dx;
      this.ypos += dy;

      this.draw();

      this.startX = mouseX;
      this.startY = mouseY;

      console.log(dx, dy);
    }
  }
}
