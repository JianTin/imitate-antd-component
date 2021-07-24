"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _reactDom = require("react-dom");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* babel-plugin-inline-import './image/ava_error.png' */
var err = "data:image/png;base64,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";

/* babel-plugin-inline-import './image/color-success.png' */
var success = "data:image/png;base64,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";

/* babel-plugin-inline-import './image/info.png' */
var info = "data:image/png;base64,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";

/* babel-plugin-inline-import './image/warning.png' */
var warning = "data:image/png;base64,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"; // outer Message

var messageOuter = null; // 动画时间

var animationDuration = 500;
var messageObj = {
  info: type(info),
  error: type(err),
  warming: type(warning),
  success: type(success),
  config: deleteMessage
}; // 用户可以定义的类型

var defaultProps = {
  content: '',
  duration: 4000,
  img: ''
}; // 确定类型

function type(typeImg) {
  return function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var newOptions = (0, _extends2["default"])({}, defaultProps, {
      img: typeImg
    }, options);
    return createMessage(newOptions);
  };
} // 删除


function deleteMessage(prentDom) {
  // 判断是否存在，存在则删除
  if (messageOuter.contains(prentDom) && !prentDom.e) {
    // 防止重复删除
    prentDom.e = true;
    var messageElement = prentDom.firstChild;
    messageElement.classList.add('imitate-message-Out');
    setTimeout(function () {
      return messageOuter.removeChild(prentDom);
    }, animationDuration);
  }
} // 生成外层 outer


function createMessageOuter() {
  messageOuter = document.createElement('div');
  messageOuter.className = 'imitate-message-root';
  document.body.appendChild(messageOuter);
} // 渲染 message


function Message(_ref) {
  var parentDom = _ref.parentDom,
      options = _ref.options;
  var content = options.content,
      duration = options.duration,
      img = options.img; // 删除

  (0, _react.useEffect)(function () {
    setTimeout(function () {
      deleteMessage(parentDom);
    }, duration);
  }, []);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "imitate-message-item imitate-message-In"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "imitate-message-icon"
  }, " ", /*#__PURE__*/_react["default"].createElement("img", {
    src: img
  }), " "), /*#__PURE__*/_react["default"].createElement("div", {
    className: "imitate-message-content"
  }, content));
} // 生成 message


function createMessage(options) {
  if (!messageOuter) createMessageOuter(); // react 容器

  var reactBox = document.createElement('div'); // 容器 添加进 outer

  messageOuter.appendChild(reactBox); // 往容器 渲染reactDom

  (0, _reactDom.render)( /*#__PURE__*/_react["default"].createElement(Message, {
    parentDom: reactBox,
    options: options
  }), reactBox); // 返回容器，允许进行删除

  return reactBox;
}

var _default = messageObj;
exports["default"] = _default;