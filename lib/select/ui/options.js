"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = require("react-dom");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = /*#__PURE__*/(0, _react.forwardRef)(function OptionsList(props, refOptions) {
  var optionPosition = props.optionPosition,
      optionsAnimationEnd = props.optionsAnimationEnd,
      optionArray = props.optionArray,
      clickOption = props.clickOption,
      selectValue = props.selectValue,
      searchOptionArray = props.searchOptionArray,
      type = props.type; // 决定用哪个数组

  var array = type === 'search' ? searchOptionArray : optionArray;
  return /*#__PURE__*/(0, _reactDom.createPortal)( /*#__PURE__*/_react["default"].createElement("div", {
    className: "imitate-select-list",
    isopen: "noOpen",
    style: optionPosition,
    ref: refOptions,
    onAnimationEnd: optionsAnimationEnd
  }, array.map(function (_ref, index) {
    var children = _ref.children,
        value = _ref.value;
    return /*#__PURE__*/_react["default"].createElement("div", {
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

exports["default"] = _default;