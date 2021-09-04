"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
    var isReactElement = /*#__PURE__*/(0, _react.isValidElement)(children); // 不是react元素 / 是fragment 不做处理
    // if(!isReactElement || (children.$$typeof) !== Fragment) return children

    console.dir(children); // 添加事件

    return /*#__PURE__*/(0, _react.cloneElement)(children, {
      onTouchStart: collectTstart,
      onTouchEnd: isCallEvent
    });
  }

  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, result());
};

var _default = Touch;
exports["default"] = _default;