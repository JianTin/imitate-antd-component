// 管理index
export var messageIndex = 10000;
var index = 1000;
export function getIndex() {
  index = index + 1;
  return index;
}
export function resultChildrenArr() {
  var children = this.props.children;
  return Array.isArray(children) ? children : [children];
}