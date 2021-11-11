import React, { cloneElement, FC, useRef } from "react"; // 超过三秒、不在同个移动点 不触发

var Touch = function Touch(_ref) {
  var children = _ref.children,
      eventCall = _ref.eventCall,
      extraOuterStyle = _ref.extraOuterStyle;
  var startElement = useRef(null);
  var endTime = useRef(0);
  var client = useRef([0, 0]); // 存储start时的元素

  function collectTstart(event) {
    startElement.current = event.target;
    endTime.current = new Date().valueOf() + 1000 * 2;
    var _event$touches$ = event.touches[0],
        clientX = _event$touches$.clientX,
        clientY = _event$touches$.clientY;
    client.current = [clientX, clientY];
  }

  function isCallEvent(event) {
    var _event$changedTouches = event.changedTouches[0],
        clientX = _event$changedTouches.clientX,
        clientY = _event$changedTouches.clientY;
    var endElement = document.elementFromPoint(clientX, clientY); // 防止元素切换 不同
    // 对比超过时间么，超过了 不进去

    if (clientX !== client.current[0] || clientY !== client.current[1] || endElement !== startElement.current || new Date().valueOf() > endTime.current) return;
    eventCall(event);
  }

  function result() {
    if (Array.isArray(children)) children = /*#__PURE__*/React.createElement("div", {
      style: extraOuterStyle
    }, children); // 后续处理
    // const isReactElement = isValidElement(children)
    // 不是react元素 / 是fragment 不做处理
    // if(!isReactElement || (children!.$$typeof ) !== Fragment) return children
    // 添加事件

    return /*#__PURE__*/cloneElement(children, {
      onTouchStart: collectTstart,
      onTouchEnd: isCallEvent
    });
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, result());
};

export default Touch;