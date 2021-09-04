import React, { cloneElement, isValidElement, Fragment } from "react";

var Touch = function Touch(_ref) {
  var children = _ref.children,
      eventCall = _ref.eventCall;
  var startElement = null; // 存储start时的元素

  function collectTstart(event) {
    startElement = event.target;
  }

  function isCallEvent(event) {
    var _event$changedTouches = event.changedTouches[0],
        clientX = _event$changedTouches.clientX,
        clientY = _event$changedTouches.clientY;
    var endElement = document.elementFromPoint(clientX, clientY); // 如果start 和 end 元素不一样时，不做触发

    if (endElement === startElement) {
      eventCall(event);
    }
  }

  function result() {
    // 后续处理
    var isReactElement = /*#__PURE__*/isValidElement(children); // 不是react元素 / 是fragment 不做处理
    // if(!isReactElement || (children.$$typeof) !== Fragment) return children

    console.dir(children); // 添加事件

    return /*#__PURE__*/cloneElement(children, {
      onTouchStart: collectTstart,
      onTouchEnd: isCallEvent
    });
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, result());
};

export default Touch;