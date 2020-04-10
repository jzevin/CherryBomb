(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.CherryBomb = factory());
}(this, (function () { 'use strict';

  class CherryBomb {
    constructor() {
      console.log(this);
      
    }
  }

  return CherryBomb;

})));
