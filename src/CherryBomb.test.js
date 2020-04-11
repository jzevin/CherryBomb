// SUPER NAIVE TESTS
const CherryBomb = require("../dist/cherryBomb.js"),
  canvasELMock = {
    getContext: () => {
      return {
        canvas: { width: 0, height: 0 },
      };
    },
  },
  myProduction = new CherryBomb.production(canvasELMock),
  myScene1 = new CherryBomb.scene("scene 1");

test("CherryBomb has all methods", async () => {
  expect.assertions(2);
  await expect(CherryBomb.production).toBeInstanceOf(Function);
  await expect(CherryBomb.scene).toBeInstanceOf(Function);
});

test("CherryBomb new production", () => {
  expect(myProduction).toBeInstanceOf(CherryBomb.production);
});

test("CherryBomb new scene", () => {
  expect(myScene1).toBeInstanceOf(CherryBomb.scene);
});
