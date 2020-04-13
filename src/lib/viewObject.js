import Vector2d from "./vector2d";

// NOTE: Possibly could use a Proxy Object for use when instantiated to
// proxy between protected internal states and be used more declaratively
// without polluting the original
// i.e. vo.get[:Property]

// NOTE: Want to use webworkers for rendering individual
// offscreen canvas.contexts async and on diff process

// proxy will decide what happens to requests that come in including dynamic ones  :)
class Style {
  constructor(options) {
    this._computed = {
      background: options.background || "transparent",
      border: options.border || {
        num: 0,
        unit: "px",
        style: "solid",
        color: "transparent",
      },
    };
  }
  get background() {
    return this._computed.background;
  }
  set background(value) {
    this._computed.background = value;
  }
  get border() {
    return this._computed.border;
  }
  set border(inp) {
    if (inp instanceof String) console.log(str);
    this._computed.border = { ...inp };
  }
}

class Layout {
  constructor(options = {}) {
    this._computed = {
      display: options.display,
      position: options.position,
      loc: options.loc,
      width: options.width || options.w,
      height: options.height || options.h,
      scale: options.scale,
      rotation: options.rotation,
    };
  }
  get x() {
    return this._computed.loc.x;
  }
  set x(value) {
    this._computed.loc.x = value;
  }
  get y() {
    return this._computed.loc.y;
  }
  set y(value) {
    this._computed.loc.y = value;
  }
  get loc() {
    return this._computed.loc;
  }
  get width() {
    return this._computed.width;
  }
  set width(value) {
    this._computed.width = value;
  }
  get height() {
    return this._computed.height;
  }
  set height(value) {
    this._computed.height = value;
  }
  get scale() {
    return this._computed.scale;
  }
  set scale(value) {
    this._computed.scale = value;
  }
  get rotation() {
    return this._computed.rotation;
  }
  set rotation(value) {
    this._computed.rotation = value;
  }
}

const proxy = {
  gate: (obj, prop) => {
    if (obj.protected[prop]) {
      throw new Error("Can not view a protected property");
    }
    return prop in obj ? obj[prop] : 99;
  },
  get: (obj, prop) => {
    return proxy.gate(obj, prop);
  },
  set: (obj, prop, value) => {
    if (obj.protected[prop]) {
      throw new Error("Can not set a protected property");
    }
    return (obj[prop] = value);
  },
};

export default class CherryBombViewObject {
  constructor(
    name,
    options={
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      rotation: 0,
      scale: 1,
      data: {},
      renderCallback: undefined
    }
  ) {
    this.protected = { protected: true };
    this.state = {
      name,
      renderCallback: options.renderCallback,
      data: options.data,
      layout: new Layout({
        loc: new Vector2d(options.x, options.y),
        width: options.width,
        height: options.height,
        rotation: options.rotation || 0,
        scale: options.scale || 1
      }),
      ctx: (() => {
        const cnv = document.createElement("canvas");
        cnv.width = options.width;
        cnv.height = options.height;
        return cnv.getContext("2d");
      })(),
      style: new Style({
        background: options.background || "transparent",
        border: {
          size: 3,
          unit: "px",
          style: "solid",
          color: "lavender",
        },
      }),
    };
    return new Proxy(this, proxy);
  }
  get x() {
    return this.state.layout.loc.x;
  }
  set x(value) {
    this.state.layout.loc.x = value;
  }
  get y() {
    return this.state.layout.loc.y;
  }
  set y(value) {
    this.state.layout.loc.y = value;
  }
  get ctx() {
    return this.state.ctx;
  }
  get width() {
    return this.state.layout.width;
  }
  set width(value) {
    this.state.layout.width = value;
    this.state.ctx.canvas.width = value;
  }
  get height() {
    return this.state.layout.height;
  }
  set height(value) {
    this.state.layout.height = value;
    this.state.ctx.canvas.height = value;
  }
  // NOTE: can optimize if no changes since last render
  update() {}
  render() {
    // this.ctx.clearRect(this.x, this.y, this.width, this.height);
    this.ctx.fillStyle = this.state.style.background;
    this.ctx.fillRect(0, 0, this.width, this.height);
    if(this.state.renderCallback) {
      this.state.renderCallback(this, this.state.data);
    }
    return this.ctx.canvas;
  }
}
