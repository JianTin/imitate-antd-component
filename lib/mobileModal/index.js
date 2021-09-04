"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = require("react-dom");

var _assets = require("../assets");

var _close = _interopRequireDefault(require("../image/close.png"));

var _index = require("../index");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var body = document.querySelector('body');
var animationArray = ['initate-mobileModalmask-animationIn', 'initate-mobileModalmask-animationOut', 'initate-mobileModalcontent-animationIn', 'initate-mobileModalcontent-animationOut'];
var index = (0, _assets.getIndex)();

var Modal = function Modal(_ref) {
  var children = _ref.children,
      _ref$visible = _ref.visible,
      visible = _ref$visible === void 0 ? false : _ref$visible,
      _ref$onCancel = _ref.onCancel,
      onCancel = _ref$onCancel === void 0 ? function () {} : _ref$onCancel,
      title = _ref.title,
      _ref$footer = _ref.footer,
      footer = _ref$footer === void 0 ? true : _ref$footer,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className,
      _ref$footerText = _ref.footerText,
      footerText = _ref$footerText === void 0 ? '确认' : _ref$footerText,
      _ref$header = _ref.header,
      header = _ref$header === void 0 ? true : _ref$header;
  var ModalDom = (0, _react.useRef)(null); // 是否是 第一次 visible

  var init = true; // 初始化，防止 运行动画

  (0, _react.useLayoutEffect)(function () {
    if (visible === false) {
      ModalDom.current.style.display = 'none';
    }

    init = false;
  }, []); // 状态控制 显示

  (0, _react.useLayoutEffect)(function () {
    if (!init) return;

    if (visible === true) {
      ModalDom.current.style.display = 'block';
    }
  }, [visible]); // 动画结束，false none
  // 清除动画类

  function animationEnd() {
    if (visible === false) {
      ModalDom.current.style.display = 'none';
    }

    Object.values(ModalDom.current.children).forEach(function (item) {
      var _item$classList;

      return (_item$classList = item.classList).remove.apply(_item$classList, animationArray);
    });
  } // 根据 visible 返回动画 类名


  function resultAnimation() {
    return visible ? {
      mask: 'initate-mobileModalmask-animationIn',
      content: 'initate-mobileModalcontent-animationIn'
    } : {
      mask: 'initate-mobileModalmask-animationOut',
      content: 'initate-mobileModalcontent-animationOut'
    };
  }

  var _resultAnimation = resultAnimation(),
      mask = _resultAnimation.mask,
      content = _resultAnimation.content;

  var ModalElemet = /*#__PURE__*/_react["default"].createElement("div", {
    className: "initate-mobileModalouter ".concat(className),
    ref: ModalDom,
    style: {
      zIndex: index
    }
  }, /*#__PURE__*/_react["default"].createElement(_index.Touch, {
    eventCall: onCancel
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "initate-mobileModalmask ".concat(mask)
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "initate-mobileModalcontent ".concat(content),
    onAnimationEnd: animationEnd
  }, header && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "initate-mobileModalclose"
  }, /*#__PURE__*/_react["default"].createElement(_index.Touch, {
    eventCall: onCancel
  }, /*#__PURE__*/_react["default"].createElement("img", {
    src: _close["default"],
    alt: "close",
    onClick: onCancel
  }))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "initate-mobileModaltitle"
  }, /*#__PURE__*/_react["default"].createElement("span", null, title))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "initate-mobileModalchildren-content"
  }, children), footer && /*#__PURE__*/_react["default"].createElement(_index.Touch, {
    eventCall: onCancel
  }, /*#__PURE__*/_react["default"].createElement(_index.Button, {
    className: "initate-mobileModalfooter",
    type: "primary"
  }, footerText))));

  return /*#__PURE__*/(0, _reactDom.createPortal)(ModalElemet, body);
};

var _default = Modal;
exports["default"] = _default;