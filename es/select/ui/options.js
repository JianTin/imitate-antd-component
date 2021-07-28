import React, { forwardRef } from 'react';
import { createPortal } from 'react-dom';
export default /*#__PURE__*/forwardRef(function OptionsList(props, refOptions) {
  var optionPosition = props.optionPosition,
      optionsAnimationEnd = props.optionsAnimationEnd,
      optionArray = props.optionArray,
      clickOption = props.clickOption,
      selectValue = props.selectValue,
      searchOptionArray = props.searchOptionArray,
      type = props.type; // 决定用哪个数组

  var array = type === 'search' ? searchOptionArray : optionArray;
  return /*#__PURE__*/createPortal( /*#__PURE__*/React.createElement("div", {
    className: "imitate-select-list",
    isopen: "noOpen",
    style: optionPosition,
    ref: refOptions,
    onAnimationEnd: optionsAnimationEnd
  }, array.map(function (_ref, index) {
    var children = _ref.children,
        value = _ref.value;
    return /*#__PURE__*/React.createElement("div", {
      className: "imitate-select-item ".concat(value === selectValue && 'imitate-select-active'),
      optionvalue: value,
      key: index,
      onClick: clickOption // 阻止 blur 事件在 click options 之前触发
      ,
      onMouseDown: function onMouseDown(e) {
        return e.preventDefault();
      }
    }, children);
  })), document.body);
});