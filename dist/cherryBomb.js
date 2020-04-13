(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.CherryBomb = factory());
}(this, (function () { 'use strict';

  function log(ctx, ...stuff) {
    return;
  }

  class Vector2d {
    constructor(x = 0, y = 0) {
      this.x = x;
      this.y = y;
    }
    add(v2d) {
      this.x += v2d.x;
      this.y += v2d.y;
      return this;
    }
    sub(v2d) {
      this.x -= v2d.x;
      this.y -= v2d.y;
      return this;
    }
    mult(n) {
      this.x *= n;
      this.y *= n;
      return this;
    }
    div(n) {
      this.x /= n;
      this.y /= n;
      return this;
    }
    mag() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    normalize() {
      const m = this.mag();
      if (m !== 0) {
        this.div(m);
      }
      return this;
    }
    limit(h, l) {
      const high = h || null,
        low = l || null;
      if (high && this.mag() > high) {
        this.normalize();
        this.mult(high);
      }
      if (low && this.mag() < low) {
        this.normalize();
        this.mult(low);
      }
      return this;
    }
    zero() {
      this.x = 0;
      this.y = 0;
      return this;
    }
    copy() {
      return new Vector2d(this.x, this.y);
    }
    rotate(angle) {
      const nx = this.x * Math.cos(angle) - this.y * Math.sin(angle);
      const ny = this.x * Math.sin(angle) + this.y * Math.cos(angle);
      this.x = nx;
      this.y = ny;
      return this;
    }
    rotateDeg(deg) {
      return this.rotate(Vector2d.deg2rad(deg));
    }
    heading() {
      return Math.atan2(this.y, this.x);
    }
    angleBetween(v2d) {
      return Math.atan2(v2d.y - this.y, v2d.x - this.x);
    }
    angleTo(v2d, angleOffset = 0) {
      return Math.atan2(v2d.y - this.y, v2d.x - this.x) + angleOffset;
    }
    dot(v2d) {
      return this.x * (v2d.x || 0) + this.y * (v2d.y || 0);
    }
    lerpTo(v2d, t) {
      const lx = Vector2d.lerp(this.x, v2d.x, t);
      const ly = Vector2d.lerp(this.y, v2d.y, t);
      return new Vector2d(lx, ly);
    }
    static lerp(a, b, t) {
      return a + (b - a) * t;
    }
    static rad2deg(rad) {
      return rad * (180 / Math.PI);
    }
    static deg2rad(deg) {
      return deg / (180 / Math.PI);
    }
  }

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

  class CherryBombViewObject {
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

  class CherryBombViewText extends CherryBombViewObject {
    constructor(name, text, options) {
      super(name, options);
      this.text = text;
    }
  }

  class CherryBombScene {
    constructor(name) {
      this.sceneIndex = 0;
      this.name = name;
      this.children = [];
    }
    addChild(viewObject) {
      this.children.push(viewObject);
    }
    removeChild(viewObject) {
      this.children = this.children.filter( child => child !== viewObject);
    }
    update(t) {
      log(this, `${this.name} update`);
    }
    render(t, ctx) {
      ctx.clearRect(0 ,0, ctx.canvas.width, ctx.canvas.height);
      log(this, `${this.name} render`, this.children[0]);
      this.children.forEach( child => {
        child.render();
        ctx.drawImage(child.ctx.canvas, child.x, child.y, child.width, child.height);
        // child.update();
      });
    }
  }

  class CherryBombSceneManager {
    #__ = {};
    constructor() {
      this.scenes = [];
    }
    add(scene, setAsActive=false) {
      this.scenes.push(scene);
      if (setAsActive) {
        this.activeScene = scene;
      }
      this.reIndexScenes();
      
      log(this, 'scene added', this.scenes);
      return this.scenes;
    }
    remove(scene) {
      this.scenes = this.scenes.filter((scn) => scn !== scene);
      this.reIndexScenes();
      log(this, 'scene removed', this.scenes);
    }
    reIndexScenes() {
      // NOTE: can be made more efficient by only looking 
      // at the removals index
      this.scenes.forEach((scene,i) => scene.sceneIndex = i);
    }
    set activeScene(scene) {
      this.#__.activeSceneIndex = scene.sceneIndex;
    }
    get activeScene() {
      return this.scenes[ this.#__.activeSceneIndex ];
    }
  }

  class CherryBombRenderer {
    constructor(canvasEl) {
      this.ctx = canvasEl.getContext('2d');
      this.ctx.canvas.width = window.innerWidth;
      this.ctx.canvas.height = window.innerHeight;
      this.sceneManager = new CherryBombSceneManager();
    }
    addScene(scene, setAsActive=false) {
      this.sceneManager.add(scene, setAsActive);
    }
    removeScene(scene) {
      // NOTE: need checking if the user is removing an active scene
      this.sceneManager.remove(scene);
    }
    changeScene(scene) {
      this.sceneManager.activeScene = scene;
    }
    render(t) {
      if (!this.sceneManager.activeScene) return;
      this.sceneManager.activeScene.render(t, this.ctx);
    }
  }

  class CherryBombProduction {
    constructor(canvasEl) {
      this.shouldStep = false;
      this.prevRafTimestamp = 0;
      this.step = this.step.bind(this);
      this.view = new CherryBombRenderer(canvasEl);
    }
    play() {
      this.shouldStep = true;
      window.requestAnimationFrame(this.step);
    }
    stop() {
      this.shouldStep = false;
    }
    step(t) {
      if(this.shouldStep) window.requestAnimationFrame(this.step);
      log(this, `- main loop -`, t - this.prevRafTimestamp);
      this.prevRafTimestamp = t;
      this.view.render(t);
    }
  }
  //
  var CherryBomb = {
    production: CherryBombProduction,
    scene: CherryBombScene,
    v2d: Vector2d,
    // for now
    viewObject: CherryBombViewObject,
    viewText: CherryBombViewText
  };

  return CherryBomb;

})));
