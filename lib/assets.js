"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIndex = getIndex;
exports.resultChildrenArr = resultChildrenArr;
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
}