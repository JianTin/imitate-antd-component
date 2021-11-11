import React, { useRef, useLayoutEffect } from "react";
import { createPortal } from 'react-dom';
import { getIndex } from '../assets';
import close from '../image/close.png';
import { Button, Touch, Mask } from '../index';
var body = document.querySelector('body');
var animationArray = ['initate-mobileModalcontent-animationIn', 'initate-mobileModalcontent-animationOut'];
var index = getIndex();

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
  var ModalDom = useRef(null); // 是否是 第一次 visible

  var init = true; // 初始化，防止 运行动画

  useLayoutEffect(function () {
    if (visible === false) {
      ModalDom.current.style.display = 'none';
    }

    init = false;
  }, []); // 状态控制 显示

  useLayoutEffect(function () {
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
      content: 'initate-mobileModalcontent-animationIn'
    } : {
      content: 'initate-mobileModalcontent-animationOut'
    };
  }

  var _resultAnimation = resultAnimation(),
      content = _resultAnimation.content;

  var ModalElemet = /*#__PURE__*/React.createElement("div", {
    className: "initate-mobileModalouter ".concat(className),
    ref: ModalDom,
    style: {
      zIndex: index
    }
  }, /*#__PURE__*/React.createElement(Mask, {
    eventCall: onCancel,
    visible: visible
  }), /*#__PURE__*/React.createElement("div", {
    className: "initate-mobileModalcontent ".concat(content),
    onAnimationEnd: animationEnd
  }, header && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "initate-mobileModalclose"
  }, /*#__PURE__*/React.createElement(Touch, {
    eventCall: onCancel
  }, /*#__PURE__*/React.createElement("img", {
    src: close,
    alt: "close",
    onClick: onCancel
  }))), /*#__PURE__*/React.createElement("div", {
    className: "initate-mobileModaltitle"
  }, /*#__PURE__*/React.createElement("span", null, title))), /*#__PURE__*/React.createElement("div", {
    className: "initate-mobileModalchildren-content"
  }, children), footer && /*#__PURE__*/React.createElement(Touch, {
    eventCall: onCancel
  }, /*#__PURE__*/React.createElement(Button, {
    className: "initate-mobileModalfooter",
    type: "primary"
  }, footerText))));
  return /*#__PURE__*/createPortal(ModalElemet, body);
};

export default Modal;