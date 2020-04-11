import CherryBombViewObject from "./viewObject";
import { log } from "./utils";

export default class CherryBombViewText extends CherryBombViewObject {
  constructor(text='', name, x, y, width, height, rotation, scale) {
    super(name, x, y, width, height, rotation, scale);
    this.text = text;
  }
  get width() {
    return this.ctx.canvas.width;
  }
  set width(value) {
    this.ctx.canvas.width = value;
  }
  get height() {
    return this.ctx.canvas.height;
  }
  set height(value) {
    this.ctx.canvas.height = value;
  }
  update() {
    // this.x += 1;
    // this.y += 1;
    // this.foo += 2;
  }
  render() {
    return this.ctx.canvas;
  }
}