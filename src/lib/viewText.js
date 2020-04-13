import CherryBombViewObject from "./viewObject";
import { log } from "./utils";

export default class CherryBombViewText extends CherryBombViewObject {
  constructor(name, text, options) {
    super(name, options);
    this.text = text;
  }
}