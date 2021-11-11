import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React, { Component, createRef } from 'react';
import SliderCanvas from "./SliderCanvas.js";
import { compatiblePcMobile } from '../assets';
import Mask from "../mask/index.js";

var SliderValidate = /*#__PURE__*/function (_Component) {
  _inherits(SliderValidate, _Component);

  var _super = _createSuper(SliderValidate);

  function SliderValidate(props) {
    var _this;

    _classCallCheck(this, SliderValidate);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "sliderDownEvent", function (e) {
      if (_this.isSpin === true || _this.sliderType === 'success') return;

      var _compatiblePcMobile = compatiblePcMobile(e),
          clientX = _compatiblePcMobile.clientX;

      _this.startSlider = {
        clientX: clientX,
        offsetX: e.target.offsetLeft
      };
      _this.sliderType = 'info';
      _this.isMove = true;
      _this.isInit = false;
    });

    _defineProperty(_assertThisInitialized(_this), "sliderMoveEvent", function (e) {
      var _assertThisInitialize = _assertThisInitialized(_this),
          isMove = _assertThisInitialize.isMove,
          startSlider = _assertThisInitialize.startSlider,
          sliderMaxMove = _assertThisInitialize.sliderMaxMove;

      var clientX = startSlider.clientX,
          offsetX = startSlider.offsetX;
      if (!isMove) return;

      var _compatiblePcMobile2 = compatiblePcMobile(e),
          moveX = _compatiblePcMobile2.clientX; // 阻止浏览器翻页


      e.preventDefault(); // 计算移动距离

      var move = moveX - clientX + offsetX;
      if (move > sliderMaxMove) move = sliderMaxMove;
      if (move < 0) move = 0;
      _this.sliderMove = move;

      _this.forceUpdate();
    });

    _defineProperty(_assertThisInitialized(_this), "sliderUpEvent", function (e) {
      // 是否触发过 move，没有则不能进入
      if (!_this.isMove) return;
      _this.isMove = false;

      var isSuccess = _this.validateSliderMove();

      if (isSuccess) {
        _this.sliderType = 'success';

        _this.forceUpdate();

        _this.props.onSuccess('success');
      } else {
        _this.sliderType = 'error';

        _this.forceUpdate();

        setTimeout(function () {
          _this.reset();
        }, 1000);

        _this.props.onError('error');
      }
    });

    _defineProperty(_assertThisInitialized(_this), "validateSliderMove", function () {
      var _assertThisInitialize2 = _assertThisInitialized(_this),
          puzzleX = _assertThisInitialize2.puzzleX,
          sliderMove = _assertThisInitialize2.sliderMove;

      var min = puzzleX - 5;
      var max = puzzleX + 5;
      if (sliderMove >= min && sliderMove <= max) return true;
      return false;
    });

    _defineProperty(_assertThisInitialized(_this), "reset", function () {
      // 重置 图像
      _this.sliderCanvasInstance.current.reset(); // 重置正常属性


      _this.sliderMove = 0;
      _this.sliderType = '';
      _this.isInit = true; // 更新

      _this.forceUpdate();
    });

    _defineProperty(_assertThisInitialized(_this), "openSpin", function () {
      _this.isSpin = true;

      _this.forceUpdate();
    });

    _defineProperty(_assertThisInitialized(_this), "closeSpin", function () {
      _this.isSpin = false;

      _this.forceUpdate();
    });

    _defineProperty(_assertThisInitialized(_this), "getPuzzleX", function (x) {
      _this.puzzleX = x;
    });

    _this.isMove = false; // 由 isMove 决定事件move 是否要触发

    _this.sliderMove = 0; // 需要移动的sliderMove

    _this.startSlider = {
      clientX: 0,
      offsetX: 0 // 点击时 slider 的信息
      // clientX 界面的触发位置
      // offsetX 距离outer的位置

    };
    _this.sliderCanvasInstance = /*#__PURE__*/createRef();
    _this.sliderMaxMove = 0; // 最长移动距离

    _this.sliderType = ''; // 显示的状态 info | success | error

    _this.isInit = true; // 是否是初始化，用于定义文字 显示

    _this.isSpin = false; // 是否是加载中

    _this.puzzleX = ''; // 缺口拼合的 x 位置

    return _this;
  } // 绑定事件


  _createClass(SliderValidate, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener('touchmove', this.sliderMoveEvent, {
        passive: false
      });
      document.addEventListener('touchend', this.sliderUpEvent);
      document.addEventListener('mousemove', this.sliderMoveEvent);
      document.addEventListener('mouseup', this.sliderUpEvent);
      var _this$props = this.props,
          canvasSize = _this$props.canvasSize,
          puzzleSize = _this$props.puzzleSize;
      this.sliderMaxMove = canvasSize.w - puzzleSize.w - 3;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('touchmove', this.sliderMoveEvent);
      document.removeEventListener('touchend', this.sliderUpEvent);
      document.removeEventListener('mousemove', this.sliderUpEvent);
      document.removeEventListener('mouseup', this.sliderUpEvent);
    } // 点击滑块时

  }, {
    key: "render",
    value: function render() {
      var sliderMove = this.sliderMove,
          sliderCanvasInstance = this.sliderCanvasInstance,
          sliderType = this.sliderType,
          isInit = this.isInit,
          isSpin = this.isSpin;
      var sliderDownEvent = this.sliderDownEvent,
          openSpin = this.openSpin,
          closeSpin = this.closeSpin,
          getPuzzleX = this.getPuzzleX;
      var _this$props2 = this.props,
          canvasSize = _this$props2.canvasSize,
          puzzleSize = _this$props2.puzzleSize,
          sliderText = _this$props2.sliderText,
          outerStyle = _this$props2.outerStyle;
      return /*#__PURE__*/React.createElement("div", {
        className: "sliderValidate-outer",
        style: _objectSpread({
          width: canvasSize.w + 'px'
        }, outerStyle)
      }, /*#__PURE__*/React.createElement("div", {
        className: "sliderValidate-img"
      }, /*#__PURE__*/React.createElement(Mask, {
        spin: true,
        visible: isSpin
      }, /*#__PURE__*/React.createElement(SliderCanvas, {
        move: sliderMove,
        ref: sliderCanvasInstance,
        openSpin: openSpin,
        closeSpin: closeSpin,
        getPuzzleX: getPuzzleX,
        canvasSize: canvasSize,
        puzzleSize: puzzleSize
      }))), /*#__PURE__*/React.createElement("div", {
        className: "sliderValidate-slider-outer",
        "data-type": sliderType
      }, isInit && /*#__PURE__*/React.createElement("div", {
        className: "sliderValidate-slider-text"
      }, sliderText), /*#__PURE__*/React.createElement("div", {
        className: "sliderValidate-slider-bck",
        style: {
          width: "".concat(sliderMove + 2, "px")
        },
        "data-type": sliderType
      }), /*#__PURE__*/React.createElement("div", {
        className: "sliderValidate-slider",
        style: {
          left: "".concat(sliderMove, "px"),
          width: "".concat(puzzleSize.w, "px")
        },
        onTouchStart: sliderDownEvent,
        onMouseDown: sliderDownEvent,
        "data-type": sliderType
      })));
    }
  }]);

  return SliderValidate;
}(Component);

SliderValidate.defaultProps = {
  onSuccess: function onSuccess() {},
  onError: function onError() {},
  canvasSize: {
    w: 300,
    h: 150
  },
  puzzleSize: {
    w: 40,
    h: 40
  },
  sliderText: '向右滑动拼图',
  outerStyle: {}
};
export default SliderValidate;