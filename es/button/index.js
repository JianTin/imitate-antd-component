import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import React from 'react';
import { findDOMNode } from 'react-dom';

var Button = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Button, _React$Component);

  function Button() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handelEvent = function () {
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
    };

    _this.animationEnd = function () {
      var node = findDOMNode(_assertThisInitialized(_this));
      node.classList.remove('imitate-btn-animation-click');
    };

    return _this;
  }

  var _proto = Button.prototype;

  _proto.render = function render() {
    var props = this.props,
        handelEvent = this.handelEvent,
        animationEnd = this.animationEnd;
    var children = props.children,
        type = props.type,
        disabled = props.disabled,
        danger = props.danger;
    return /*#__PURE__*/React.createElement("button", {
      className: "imitate-btn imitate-btn-" + type,
      onClick: handelEvent,
      onAnimationEnd: animationEnd,
      disabled: disabled ? 'true' : null,
      danger: danger ? 'true' : null
    }, /*#__PURE__*/React.createElement("span", null, children));
  };

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