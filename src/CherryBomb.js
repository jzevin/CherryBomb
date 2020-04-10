'use strict';

function log(ctx, ...stuff) {
  const prefix = ctx.constructor.toString().split('{')[0].replace('class ','')
  console.log(`${prefix}=>`, ...stuff);
}

class CherryBombScene {
  constructor(name) {
    this.name = name;
    this.children = [];
  }
  update(t) {
    log(this, `${this.name} update`);
  }
  render(t, ctx) {
    log(this, `${this.name} render`, ctx);

  }
}

class CherryBombSceneManager {
  #__ = {};
  constructor() {
    this.scenes = [];
  }
  add(scene, setAsActive=false) {
    log(this, 'scene added');
    this.scenes.push(scene);
    this.activeScene = scene;
  }
  remove(scene) {
    this.scenes = this.scenes.filter(scn => scn !== scene);
    log(this, 'scene removed', this.scenes);
  }
  set activeScene(scene) {
    this.#__.activeScene = scene;
  }
  get activeScene() {
    return this.#__.activeScene;
  }
}

class CherryBombRenderer {
  constructor(canvasEl) {
    this.ctx = canvasEl.getContext('2d');
    this.sceneManager = new CherryBombSceneManager();
  }
  addScene(scene, setAsActive=false) {
    this.sceneManager.add(scene, setAsActive);
  }
  render(t) {
    log(this, 'render');
    if (!this.sceneManager.scenes.length) return;
    this.sceneManager.activeScene.render(t, this.ctx);
  }
}

class CherryBombProduction {
  constructor(canvasEl) {
    this.step = this.step.bind(this);
    this.view = new CherryBombRenderer(canvasEl);
    window.requestAnimationFrame(this.step);
  }
  step(t) {
    // window.requestAnimationFrame(this.step);
    log(this, `- main loop -`, t);
    this.view.render(t);
  }
}
//
export default {
  production: CherryBombProduction,
  scene: CherryBombScene
}