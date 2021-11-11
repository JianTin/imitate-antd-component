"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIndex = getIndex;
exports.resultChildrenArr = resultChildrenArr;
exports.compatiblePcMobile = compatiblePcMobile;
exports.messageIndex = void 0;
// 管理index
var messageIndex = 10000;
exports.messageIndex = messageIndex;
var index = 1000;

function getIndex() {
  index = index + 1;
  return index;
}

function resultChildrenArr() {
  var children = this.props.children;
  return Array.isArray(children) ? children : [children];
} // 兼容 mouse和touch


function compatiblePcMobile(event) {
  var type = event.type; // 获取特定的属性

  var getKeyArray = ['target', 'clientX', 'clientY', 'pageX', 'pageY', 'screenX', 'screenY'];

  function getAssetsAttribute(event) {
    return getKeyArray.reduce(function (prev, key) {
      var val = event[key];
      var tarsformVal = Number(val);
      if (typeof tarsformVal === 'number' && !isNaN(tarsformVal)) val = tarsformVal.toFixed(0);
      prev[key] = val;
      return prev;
    }, {});
  } // 根据事件类型 获取，touch 可能有多个


  return type.includes('mouse') ? getAssetsAttribute(event) : Array.from(event.targetTouches).map(function (touchEvent) {
    return getAssetsAttribute(touchEvent);
  });
}