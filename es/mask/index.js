import React, { useRef, useLayoutEffect } from "react";
import { createPortal } from 'react-dom';
var body = document.body;
var animationArray = ['imitate-maskanimationIn', 'imitate-maskanimationOut'];

function Mask(_ref) {
  var visible = _ref.visible,
      onCancel = _ref.onCancel;
  var maskDom = useRef(null); // 是否是 第一次 visible

  var init = true; // 初始化，防止 运行动画

  useLayoutEffect(function () {
    if (visible === false) {
      maskDom.current.style.display = 'none';
    }

    init = false;
  }, []); // 状态控制 显示

  useLayoutEffect(function () {
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

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/createPortal( /*#__PURE__*/React.createElement("div", {
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
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Mask, {
    visible: visible,
    onCancel: onCancel
  }), children);
};

export default MaskChildren;