import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import React, { createRef } from 'react';
import { createPortal } from 'react-dom';
import Button from "../button/index.js";

function RenderModal(Modal) {
  var _class, _temp;

  return _temp = _class = /*#__PURE__*/function (_React$Component) {
    _inheritsLoose(_class, _React$Component);

    function _class() {
      return _React$Component.apply(this, arguments) || this;
    }

    var _proto = _class.prototype;

    _proto.render = function render() {
      var _this$props = this.props,
          visible = _this$props.visible,
          getContainer = _this$props.getContainer; // 当传visible才会渲染
      // 防止触发 Modal componentDidMount 等渲染

      if (typeof visible !== 'boolean' || !getContainer) return null; // 添加 position  迫使可以将 modal渲染进去

      if (document.body !== getContainer) {
        var position = getContainer.style.position;
        getContainer.style.position = position ? position : 'relative';
      }

      return /*#__PURE__*/React.createElement(Modal, this.props);
    };

    return _class;
  }(React.Component), _class.defaultProps = {
    title: '',
    // title
    visible: null,
    // 组件隐藏 显示
    footer: true,
    // modal footer 是否显示
    cancelEvent: function cancelEvent() {},
    // 点击 close / mask / 取消会触发的事件
    okEvent: function okEvent() {},
    // 点击确认
    afterClose: function afterClose() {},
    // Modal完全关闭后的回调
    destroyOnClose: false,
    // 关闭时销毁，默认不销毁
    centered: false,
    // 是否居中
    mask: true,
    // 蒙版 是否显示
    maskClosable: true,
    // 蒙版点击，是否触发 cancel 事件
    modalStyle: {},
    // modal 样式
    maskStyle: {},
    // 遮罩样式
    okText: '确定',
    cancelText: '取消',
    getContainer: document.body // 默认渲染到body下

  }, _temp;
}

var Modal = /*#__PURE__*/function (_React$PureComponent) {
  _inheritsLoose(Modal, _React$PureComponent);

  function Modal(props) {
    var _this;

    _this = _React$PureComponent.call(this, props) || this;

    _this.isDestroyContent = function () {
      var _this$props2 = _this.props,
          destroyOnClose = _this$props2.destroyOnClose,
          visible = _this$props2.visible,
          children = _this$props2.children;
      if (destroyOnClose && !visible) return null;
      return children;
    };

    _this.maskClick = function () {
      var _this$props3 = _this.props,
          maskClosable = _this$props3.maskClosable,
          cancelEvent = _this$props3.cancelEvent;
      if (maskClosable) cancelEvent();
    };

    _this.resultAnimationCss = function () {
      var visible = _this.props.visible;
      return {
        maskAnimation: visible ? 'imitate-modal-maskIn' : 'imitate-modal-maskOut',
        modalAnimation: visible ? 'imitate-modal-In' : 'imitate-modal-Out'
      };
    };

    _this.getModalShowAssets = function () {
      var visible = _this.props.visible;
      var modalRoot = _this.rootRef.current;
      return {
        visible: visible,
        modalRoot: modalRoot
      };
    };

    _this.AnimationEndModal = function () {
      var _this$getModalShowAss = _this.getModalShowAssets(),
          modalRoot = _this$getModalShowAss.modalRoot,
          visible = _this$getModalShowAss.visible;

      var afterClose = _this.props.afterClose;

      if (!visible) {
        afterClose();
        modalRoot.style.display = 'none';
      }
    };

    _this.rootRef = /*#__PURE__*/createRef();
    return _this;
  } // 通过 虚拟DOm对比。来要求渲染新元素


  var _proto2 = Modal.prototype;

  // 处理初始化的 modal，决定是显示 还是 隐藏
  // 绑定 esc 事件
  _proto2.componentDidMount = function componentDidMount() {
    var _this$getModalShowAss2 = this.getModalShowAssets(),
        modalRoot = _this$getModalShowAss2.modalRoot,
        visible = _this$getModalShowAss2.visible;

    modalRoot.style.display = visible ? 'block' : 'none';
  } // visible 为true 显示  root.dispaly = block 开启
  // 不处理 visible 为 false，会影响到 动画
  // 绑定 esc 事件
  ;

  _proto2.componentDidUpdate = function componentDidUpdate() {
    var _this$getModalShowAss3 = this.getModalShowAssets(),
        modalRoot = _this$getModalShowAss3.modalRoot,
        visible = _this$getModalShowAss3.visible;

    modalRoot.style.display = visible && 'block';
  };

  _proto2.render = function render() {
    var resultAnimationCss = this.resultAnimationCss,
        props = this.props,
        AnimationEndModal = this.AnimationEndModal,
        isDestroyContent = this.isDestroyContent,
        maskClick = this.maskClick;

    var _resultAnimationCss = resultAnimationCss(),
        maskAnimation = _resultAnimationCss.maskAnimation,
        modalAnimation = _resultAnimationCss.modalAnimation;

    var cancelEvent = props.cancelEvent,
        title = props.title,
        footer = props.footer,
        okEvent = props.okEvent,
        mask = props.mask,
        centered = props.centered,
        modalStyle = props.modalStyle,
        maskStyle = props.maskStyle,
        okText = props.okText,
        cancelText = props.cancelText,
        getContainer = props.getContainer;
    var Element = /*#__PURE__*/React.createElement("div", {
      className: "imitate-modal-root",
      ref: this.rootRef
    }, mask && /*#__PURE__*/React.createElement("div", {
      className: "imitate-modal-mask imitate-moda-animationDuration " + maskAnimation,
      onClick: maskClick,
      style: maskStyle
    }), /*#__PURE__*/React.createElement("div", {
      className: "imitate-modal-outer imitate-moda-animationDuration " + modalAnimation,
      onAnimationEnd: AnimationEndModal,
      centered: centered ? 'true' : null,
      style: modalStyle
    }, /*#__PURE__*/React.createElement("div", {
      className: "imitate-modal-cancel",
      onClick: cancelEvent
    }, " ", /*#__PURE__*/React.createElement("a", null, "x"), " "), title && /*#__PURE__*/React.createElement("div", {
      className: "imitate-modal-title"
    }, title), /*#__PURE__*/React.createElement("div", {
      className: "imitate-modal-content"
    }, " ", isDestroyContent(), " "), footer && /*#__PURE__*/React.createElement("div", {
      className: "imitate-modal-footer"
    }, /*#__PURE__*/React.createElement(Button, {
      onClick: cancelEvent
    }, cancelText), /*#__PURE__*/React.createElement(Button, {
      type: "primary",
      onClick: okEvent
    }, okText))));
    return /*#__PURE__*/createPortal(Element, getContainer);
  };

  return Modal;
}(React.PureComponent);

export default RenderModal(Modal);