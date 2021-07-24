import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React from 'react';
import { findDOMNode } from 'react-dom';

var Button = /*#__PURE__*/function (_React$Component) {
  _inherits(Button, _React$Component);

  var _super = _createSuper(Button);

  function Button() {
    var _this;

    _classCallCheck(this, Button);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "handelEvent", function () {
      var _this$props = _this.props,
          onClick = _this$props.onClick,
          type = _this$props.type,
          disabled = _this$props.disabled;
      if (disabled) return;

      if (['primary', 'default', 'dashed'].includes(type)) {
        var node = findDOMNode(_assertThisInitialized(_this));
        node.classList.add('imitate-btn-animation-click');
      }

      if (onClick) onClick();
    });

    _defineProperty(_assertThisInitialized(_this), "animationEnd", function () {
      var node = findDOMNode(_assertThisInitialized(_this));
      node.classList.remove('imitate-btn-animation-click');
    });

    return _this;
  }

  _createClass(Button, [{
    key: "render",
    value: function render() {
      var props = this.props,
          handelEvent = this.handelEvent,
          animationEnd = this.animationEnd;
      var children = props.children,
          type = props.type,
          disabled = props.disabled,
          danger = props.danger;
      return /*#__PURE__*/React.createElement("button", {
        className: "imitate-btn imitate-btn-".concat(type),
        onClick: handelEvent,
        onAnimationEnd: animationEnd,
        disabled: disabled ? 'true' : null,
        danger: danger ? 'true' : null
      }, /*#__PURE__*/React.createElement("span", null, children));
    }
  }]);

  return Button;
}(React.Component);

export { Button as default };
Button.defaultProps = {
  type: 'default',
  // primary / default /  dashed / text / link
  onClick: function onClick() {},
  // click 事件
  disabled: false,
  // 禁止
  danger: false // 危险

};