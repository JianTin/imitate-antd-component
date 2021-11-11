import React, { useRef, useLayoutEffect, useEffect } from "react";
import { createPortal } from 'react-dom';
var body = document.body;
var animationArray = ['imitate-maskanimationIn', 'imitate-maskanimationOut'];

function Mask(_ref) {
  var visible = _ref.visible,
      onCancel = _ref.onCancel,
      spin = _ref.spin,
      isFullScreen = _ref.isFullScreen;
  var maskDom = useRef(null);
  var spinContainer = useRef(null); // 是否是 第一次 visible

  var initRef = useRef(true); // 初始化，防止 运行动画

  useLayoutEffect(function () {
    initRef.current = false;

    if (visible === false) {
      maskDom.current.style.display = 'none';
    }

    if (spin) {
      createSpin();
      spinContainer.current.style.visibility = 'hidden';
    }
  }, []); // 打开可滚动

  useEffect(function () {
    return openScroll;
  }, []);

  function createSpin() {
    var container = spinContainer.current;
    if (!container) return;

    if (container.children.length === 4) {
      return spinContainer.current.style.visibility = 'visible';
    }

    var spin = document.createElement('div');
    spin.classList.add('imitate-spin');
    setTimeout(function () {
      container.appendChild(spin);
      createSpin();
    }, 100);
  } // 状态控制 显示


  useLayoutEffect(function () {
    if (initRef.current) return;

    if (visible === true) {
      maskDom.current.style.display = 'block';
      if (isFullScreen) notScroll();
    }
  }, [visible]); // 动画结束，visible：false -> display: none; 
  // 清除动画类

  function animationEnd() {
    var _maskDom$current, _maskDom$current$clas;

    (_maskDom$current = maskDom.current) === null || _maskDom$current === void 0 ? void 0 : (_maskDom$current$clas = _maskDom$current.classList).remove.apply(_maskDom$current$clas, animationArray);

    if (visible === false) {
      maskDom.current.style.display = 'none';
      if (isFullScreen) openScroll();
    }
  } // 根据 visible 返回动画 类名


  function resultAnimation() {
    return visible ? 'imitate-maskanimationIn' : 'imitate-maskanimationOut';
  } // 关闭滚动


  function notScroll() {
    document.body.style.overflow = 'hidden';
  } // 打开滚动


  function openScroll() {
    document.body.style.overflow = '';
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "imitate-mask ".concat(resultAnimation()),
    ref: maskDom,
    onAnimationEnd: animationEnd,
    onClick: onCancel,
    onTouchEnd: onCancel,
    style: {
      position: isFullScreen ? 'fixed' : 'absolute'
    }
  }, spin && /*#__PURE__*/React.createElement("div", {
    className: "imitate-spin-container",
    ref: spinContainer
  }, /*#__PURE__*/React.createElement("div", {
    className: "imitate-spin"
  })));
}

var MaskChildren = function MaskChildren(_ref2) {
  var _ref2$children = _ref2.children,
      children = _ref2$children === void 0 ? null : _ref2$children,
      visible = _ref2.visible,
      _ref2$onCancel = _ref2.onCancel,
      onCancel = _ref2$onCancel === void 0 ? function () {} : _ref2$onCancel,
      _ref2$spin = _ref2.spin,
      spin = _ref2$spin === void 0 ? false : _ref2$spin;
  var isFullScreen = children ? false : true;

  if (children) {
    return /*#__PURE__*/React.createElement("div", {
      className: "imitate-mask-outer"
    }, /*#__PURE__*/React.createElement(Mask, {
      visible: visible,
      onCancel: onCancel,
      spin: spin,
      isFullScreen: isFullScreen
    }), children);
  }

  return /*#__PURE__*/createPortal( /*#__PURE__*/React.createElement(Mask, {
    visible: visible,
    onCancel: onCancel,
    isFullScreen: isFullScreen
  }), body);
};

export default MaskChildren;