(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.CherryBomb = factory());
}(this, (function () { 'use strict';

  function log(ctx, ...stuff) {
    const prefix = ctx.constructor.name;
    console.log(`${prefix}=>`);
    console.log('\t', ...stuff);
  }

  class CherryBombScene {
    constructor(name) {
      this.sceneIndex = 0;
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
      this.sceneManager = new CherryBombSceneManager();
    }
    addScene(scene, setAsActive=false) {
      this.sceneManager.add(scene, setAsActive);
    }
    removeScene(scene) {
      this.sceneManager.remove(scene);
    }
    changeScene(scene) {
      this.sceneManager.activeScene = scene;
    }
    render(t) {
      log(this, 'render');
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
      log(this, 'play');
    }
    stop() {
      this.shouldStep = false;
      log(this, 'stop');
    }
    changeScenes() {

    }
    setActiveScene() {

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
    scene: CherryBombScene
  };

  return CherryBomb;

})));
