// SUPER NAIVE TESTS

import CherryBomb from "../src/CherryBomb";
import { expect, assert } from "chai";
import { JSDOM } from "jsdom";
import canvas from "canvas";

const { window: win } = new JSDOM(
  '<!doctype html><html><body><canvas id="cnv"></canvas></body></html>'
);

global.document = win.document;
global.window = win.defaultView;
window = win;

describe("CherryBomb", () => {
  let myProduction, myScenes;
  before(() => {
    myProduction = new CherryBomb.production(document.querySelector("canvas"));
    myScenes = [
      new CherryBomb.scene("scene 1"),
      new CherryBomb.scene("scene 2"),
      new CherryBomb.scene("scene 3"),
    ];
  });
  describe("#production", () => {
    it("should have production", () => {
      expect(CherryBomb).to.have.property("production");
      expect(CherryBomb).itself.to.respondTo('production');
      expect(myProduction).to.be.an.instanceof(CherryBomb.production);
    });
  });
  describe("#scene", () => {
    it("should have scene", () => {
      expect(CherryBomb).to.have.property("scene");
      expect(CherryBomb).itself.to.respondTo('scene');
      expect(myScenes[0]).to.be.an.instanceof(CherryBomb.scene);
    });
  });
});

// CherryBomb
// make sure it's a CherryBomb Object
// create a mew CherryBomb Production
// add three scenes to the production
// make the second one active
// remove the first

// describe("CherryBomb is a CherryBomb", () => {
//   let myProduction, myScenes;
//   beforeAll(() => {
//     myProduction = new CherryBomb.production(canvasELMock);
//     myScenes = [
//       new CherryBomb.scene("scene 1"),
//       new CherryBomb.scene("scene 2"),
//       new CherryBomb.scene("scene 3")
//     ];
//   });

//   test("has what it needs", async () => {
//     expect.assertions(3);
//     await expect(CherryBomb).toBeInstanceOf(Object);
//     await expect(CherryBomb.production).toBeInstanceOf(Function);
//     await expect(CherryBomb.scene).toBeInstanceOf(Function);
//   });

//   test("CherryBomb new production and to have the necessary properties", async () => {
//     expect.assertions(5);
//     await expect(myProduction).toBeInstanceOf(CherryBomb.production);
//     await expect(myProduction).toHaveProperty('view');
//     await expect(myProduction).toHaveProperty('play');
//     await expect(myProduction).toHaveProperty('stop');
//     await expect(myProduction).toHaveProperty('step');
//   });

//   test("CherryBomb new scenes", async () => {
//     expect.assertions(myScenes.length);
//     myScenes.forEach(async (scene) => {
//       await expect(scene).toBeInstanceOf(CherryBomb.scene);
//     });
//   });

// });
