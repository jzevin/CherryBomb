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
    this.x += 1;
    this.y += 1;
  }
  render() {
    log(this, 'render');
    this.ctx.save();
    this.ctx.fillStyle = 'hsla(0, 0%, 0%, 0.0125)';
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = 'hsla(0, 20%, 100%, 1)';
    this.ctx.fillRect(0, 0, 10, 20);
    this.ctx.fillStyle = 'darkorange';
    this.ctx.font = '20px sans-serif';
    this.ctx.fillText(this.text, 0, 20, this.width);
    this.ctx.restore();
    return this.ctx.canvas;
  }
}