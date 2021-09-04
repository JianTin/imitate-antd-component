"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _index = require("../index");

var _reactDom = require("react-dom");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Button = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Button, _React$Component);

  var _super = _createSuper(Button);

  function Button() {
    var _this;

    (0, _classCallCheck2["default"])(this, Button);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handelEvent", function () {
      var _this$props = _this.props,
          onClick = _this$props.onClick,
          type = _this$props.type,
          disabled = _this$props.disabled;
      if (disabled) return;

      if (['primary', 'default', 'dashed'].includes(type)) {
        var node = (0, _reactDom.findDOMNode)((0, _assertThisInitialized2["default"])(_this));
        node.classList.add('imitate-btn-animation-click');
      }

      if (onClick) onClick();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "animationEnd", function () {
      var node = (0, _reactDom.findDOMNode)((0, _assertThisInitialized2["default"])(_this));
      node.classList.remove('imitate-btn-animation-click');
    });
    return _this;
  }

  (0, _createClass2["default"])(Button, [{
    key: "render",
    value: function render() {
      var props = this.props,
          handelEvent = this.handelEvent,
          animationEnd = this.animationEnd;
      var children = props.children,
          type = props.type,
          disabled = props.disabled,
          danger = props.danger,
          className = props.className;
      return /*#__PURE__*/_react["default"].createElement(_index.Touch, {
        eventCall: handelEvent
      }, /*#__PURE__*/_react["default"].createElement("button", {
        className: "imitate-btn imitate-btn-".concat(type, " ").concat(className),
        onClick: handelEvent,
        onAnimationEnd: animationEnd,
        disabled: disabled ? 'true' : null,
        danger: danger ? 'true' : null
      }, /*#__PURE__*/_react["default"].createElement("span", null, children)));
    }
  }]);
  return Button;
}(_react["default"].Component);

exports["default"] = Button;
Button.defaultProps = {
  type: 'default',
  // primary / default /  dashed / text / link
  onClick: function onClick() {},
  // click 事件
  disabled: false,
  // 禁止
  danger: false,
  // 危险
  className: ''
};