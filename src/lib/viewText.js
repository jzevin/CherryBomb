import CherryBombViewObject from "./viewObject";

export default class CherryBombViewText extends CherryBombViewObject {
  constructor(options) {
    super(options);
    this.text = options.text;
  }
  get text () {
    return this.state.text;
  }
  set text (str) {
    this.state = {text: str};
  }
}