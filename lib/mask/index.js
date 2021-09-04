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

var body = document.body;
var animationArray = ['imitate-maskanimationIn', 'imitate-maskanimationOut'];

function Mask(_ref) {
  var visible = _ref.visible,
      onCancel = _ref.onCancel;
  var maskDom = (0, _react.useRef)(null); // 是否是 第一次 visible

  var init = true; // 初始化，防止 运行动画

  (0, _react.useLayoutEffect)(function () {
    if (visible === false) {
      maskDom.current.style.display = 'none';
    }

    init = false;
  }, []); // 状态控制 显示

  (0, _react.useLayoutEffect)(function () {
    if (!init) return;

    if (visible === true) {
      maskDom.current.style.display = 'block';
    }
  }, [visible]); // 动画结束，false none
  // 清除动画类

  function animationEnd() {
    var _maskDom$current, _maskDom$current$clas;

    (_maskDom$current = maskDom.current) === null || _maskDom$current === void 0 ? void 0 : (_maskDom$current$clas = _maskDom$current.classList).remove.apply(_maskDom$current$clas, animationArray);

    if (visible === false) {
      maskDom.current.style.display = 'none';
    }
  } // 根据 visible 返回动画 类名


  function resultAnimation() {
    return visible ? 'imitate-maskanimationIn' : 'imitate-maskanimationOut';
  }

  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/(0, _reactDom.createPortal)( /*#__PURE__*/_react["default"].createElement("div", {
    className: "imitate-mask ".concat(resultAnimation()),
    ref: maskDom,
    onAnimationEnd: animationEnd,
    onTouchEnd: onCancel
  }), body));
}

var MaskChildren = function MaskChildren(_ref2) {
  var children = _ref2.children,
      visible = _ref2.visible,
      _ref2$onCancel = _ref2.onCancel,
      onCancel = _ref2$onCancel === void 0 ? function () {} : _ref2$onCancel;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(Mask, {
    visible: visible,
    onCancel: onCancel
  }), children);
};

var _default = MaskChildren;
exports["default"] = _default;