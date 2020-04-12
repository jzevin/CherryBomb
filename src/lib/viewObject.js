import Vector2d from './vector2d';

export default class CherryBombViewObject {
  constructor(name, x=0, y=0, width=10, height=40, rotation=0, scale=1) {
    this.name = name;
    this.ctx = document.createElement('canvas').getContext('2d');
    this.pos = new Vector2d(x, y);
    this.width = width;
    this.height = height;
    this.scale = scale;
    this.rotation = rotation;
    // log(this, this)
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
  // NOTE: can optimize if no changes since last render
  render() {
    // this.ctx.fillText('tototototootot', this.x, this.y);
    return this.ctx.canvas;
  }
}