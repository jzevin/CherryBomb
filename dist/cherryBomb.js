(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.CherryBomb = factory());
}(this, (function () { 'use strict';

  function log(ctx, ...stuff) {
    return;
  }

  class CherryBombViewObject {
    constructor(name, x=0, y=0, width=10, height=40, rotation=0, scale=1) {
      this.name = name;
      this.ctx = document.createElement('canvas').getContext('2d');
      this.x = x;
      this.y = y;
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

  class CherryBombViewText extends CherryBombViewObject {
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
        ctx.drawImage(child.render(), child.x, child.y, child.width, child.height);
        child.update();
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
    // for now
    viewObject: CherryBombViewObject,
    viewText: CherryBombViewText
  };

  return CherryBomb;

})));
