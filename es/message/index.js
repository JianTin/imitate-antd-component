import _extends from "@babel/runtime/helpers/extends";
import React, { useEffect } from 'react';
import { render } from 'react-dom';
import err from '../image/ava_error.png';
import success from '../image/color-success.png';
import info from '../image/info.png';
import warning from '../image/warning.png'; // outer Message

var messageOuter = null; // 动画时间

var messageObj = {
  info: type(info),
  error: type(err),
  warming: type(warning),
  success: type(success),
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

    var newOptions = _extends({}, defaultProps, {
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

  useEffect(function () {
    setTimeout(function () {
      deleteMessage(parentDom);
    }, duration);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "imitate-message-item imitate-message-In",
    style: {
      zIndex: 1000
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "imitate-message-icon"
  }, " ", /*#__PURE__*/React.createElement("img", {
    src: img
  }), " "), /*#__PURE__*/React.createElement("div", {
    className: "imitate-message-content"
  }, content));
} // 生成 message


function createMessage(options) {
  if (!messageOuter) createMessageOuter(); // react 容器

  var reactBox = document.createElement('div'); // 容器 添加进 outer

  messageOuter.appendChild(reactBox); // 往容器 渲染reactDom

  render( /*#__PURE__*/React.createElement(Message, {
    parentDom: reactBox,
    options: options
  }), reactBox); // 返回容器，允许进行删除

  return reactBox;
}

export default messageObj;