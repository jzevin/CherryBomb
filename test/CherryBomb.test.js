// SUPER NAIVE TESTS

import CherryBomb from "../src/CherryBomb";
import {expect} from "chai";

// describe('Array', function() {
//   describe('#indexOf()', function() {
//     it('should return -1 when the value is not present', function() {
//       assert.equal([1, 2, 3].indexOf(4), -1);
//     });
//   });
// });

describe('CherryBomb', () => {
  describe('#production', () => {
    it('should have production', () => {
      expect(CherryBomb).to.have.property('production');
    });
  });
  describe('#scene', () => {
    it('should have scene', () => {
      expect(CherryBomb).to.have.property('scene');
    });
  });
});

// CherryBomb
// make sure it's a CherryBomb Object
// create a mew CherryBomb Production
// add three scenes to the production
// make the second one active
// remove the first

// const
//   canvasELMock = {
//     getContext: () => {
//       return {
//         canvas: { width: 0, height: 0 },
//       };
//     },
//   };

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
