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

var _ava_error = _interopRequireDefault(require("../image/ava_error.png"));

var _colorSuccess = _interopRequireDefault(require("../image/color-success.png"));

var _info = _interopRequireDefault(require("../image/info.png"));

var _warning = _interopRequireDefault(require("../image/warning.png"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// outer Message
var messageOuter = null; // 动画时间

var messageObj = {
  info: type(_info["default"]),
  error: type(_ava_error["default"]),
  warming: type(_warning["default"]),
  success: type(_colorSuccess["default"]),
  config: deleteMessage
}; // 用户可以定义的类型

var defaultProps = {
  content: '',
  duration: 2000,
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
  if (prentDom.e) return; // 防止重复删除

  prentDom.e = true;
  var messageElement = prentDom.firstChild;
  messageElement.classList.add('imitate-message-Out');
  messageElement.addEventListener('animationend', function () {
    messageOuter.removeChild(prentDom);
  });
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
    className: "imitate-message-item imitate-message-In",
    style: {
      zIndex: 1000
    }
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