import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React, { createRef } from 'react';

/* babel-plugin-inline-import '../image/xiala.png' */
var selectPng = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAhFBMVEUAAADi4uLHx8fHx8fJycnHx8fHx8fIyMjGxsbHx8fHx8fIyMjHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fGxsbIyMjHx8fHx8fHx8fIyMjIyMjHx8fHx8fHx8fIyMjHx8fHx8fHx8fIyMjHx8eGkWRMAAAAK3RSTlMAAf31C/ntJwXh5xHcyHVDNxvVw6aMW9G8sZJiHp6GbEw7LRZII7ZSNJt8hQ2BOgAAAltJREFUeNrt2Qty2jAUQNFnjG1+CQRCIECA8mmTvP3vrx1AE7UxFsUeW5q5ZwGPAYR0ZQQAAAAAAAAAAAAAAAAAAAAAAMAnUZZFIhLM3GuGA9XBMJy514wS/SM5SMUO57kjqctcT+KKX3EU68lc6pLoWZpJhbJUz2KpS08vuk9SmaeuXvSkLgs1xn2pSH+sxkLq0p6p8dCuaOSDGjPnyEqXgTHvSAU6P9XorqRGx54az5GUFr2pkWZSq/e4yiU9VSP+ITUbJmo8SkmPaiQHqd1LSy9aS18m3WejRuuXlLBtWd9tI9bWyi4VJsZamhF9qJHu5E671N7/GhK9qtFblT6RXjvSmPZEjcFe7rAf243QoH65WGk/lKs2X2LFESb1yuxYCSZMqo2Vhb19e8CKlU/5D592mHjhKzF0IzdbqhUmnrBjJZwwKc7wZHjremw8TBz7T/weTJg4YiXNbrlgehEmpWNlP/AkTByxMuu7HsJ4EyaOWJl0CsNk/tXMjYdJnuy2hR89exUmjrveRzhhkmd7w+Gwtg9Pb7ljZeNhmBQ/oWq95L5TL8PEESuHwjBZiN/sWBl9v7p4GiaO62uaXQ2TuWdh4oiV7urvE9PjMHH89zTu2w1j11gQcj/69sTzMMmTpVasfO/8nQRj9O/2FL0FECbXbuR2rEyDCBPXER5OmDhiZRlOmDhiJVFjKuGxft8BhUlhrAQVJgWxEliYXI2V4MLkSqwEGCZ5dmmIYZIfKyGGSZ5tfHofWwnecTqZTI8CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa8Btta62Po3F+iwAAAABJRU5ErkJggg==";

var DefaultSelect = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(DefaultSelect, _React$PureComponent);

  var _super = _createSuper(DefaultSelect);

  function DefaultSelect(props) {
    var _this;

    _classCallCheck(this, DefaultSelect);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "getoptionPosition", function () {
      var node = _this.refSelect.current;
      var offsetTop = node.offsetTop,
          offsetLeft = node.offsetLeft,
          offsetHeight = node.offsetHeight,
          offsetWidth = node.offsetWidth;

      _this.props.resultPosition({
        left: offsetLeft,
        top: offsetTop + offsetHeight + 5,
        width: offsetWidth
      });
    });

    _defineProperty(_assertThisInitialized(_this), "clickOuter", function () {
      var _this$props = _this.props,
          toggelRunAnimation = _this$props.toggelRunAnimation,
          type = _this$props.type,
          isOpen = _this$props.isOpen,
          recoveryOptionArray = _this$props.recoveryOptionArray;
      if (type === 'search' && isOpen) return;

      if (type === 'search') {
        var inp = _this.refSearch.current;
        inp.focus(); // 设置为空值，可以search 输入查找

        _this.setState({
          searchVal: ''
        }); // 恢复 原来的 数组


        recoveryOptionArray();
      } // search点击，options打开 不能关闭


      toggelRunAnimation();
    });

    _defineProperty(_assertThisInitialized(_this), "blurCloseOption", function () {
      var _this$props2 = _this.props,
          toggelRunAnimation = _this$props2.toggelRunAnimation,
          isOpen = _this$props2.isOpen;
      if (isOpen) toggelRunAnimation();
    });

    _defineProperty(_assertThisInitialized(_this), "search", function (event) {
      var value = event.target.value;
      var _this$props3 = _this.props,
          optionArray = _this$props3.optionArray,
          resultOptionsArray = _this$props3.resultOptionsArray,
          isOpen = _this$props3.isOpen,
          toggelRunAnimation = _this$props3.toggelRunAnimation;
      var newArray = optionArray.filter(function (item) {
        return item.children.includes(value);
      }); // 搜索时，如果是关闭，那么打开option

      if (!isOpen) toggelRunAnimation();
      resultOptionsArray(newArray, value);

      _this.setState({
        searchVal: value
      });
    });

    _defineProperty(_assertThisInitialized(_this), "preventDefault", function (event) {
      if (_this.props.type === 'search') event.preventDefault();
    });

    _this.refSelect = /*#__PURE__*/createRef();
    _this.refSearch = /*#__PURE__*/createRef();
    _this.state = {
      searchVal: '' // input 显示的value

    };
    _this.resizeObserver = null;
    return _this;
  }

  _createClass(DefaultSelect, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      // 监听元素变化
      var node = this.refSelect.current;
      var oldHeight = 0;
      var resizeObserver = new ResizeObserver(function (entries) {
        // 对该元素，高度不同时 变化
        var selectTitle = entries.find(function (item) {
          return item.target === node;
        });
        var newHeight = selectTitle.contentRect.height;

        if (newHeight !== oldHeight) {
          oldHeight = newHeight;

          _this2.getoptionPosition();
        }
      });
      resizeObserver.observe(node);
      this.resizeObserver = resizeObserver;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.resizeObserver.disconnect();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this$props4 = this.props,
          selectChildren = _this$props4.selectChildren,
          isOpen = _this$props4.isOpen,
          type = _this$props4.type; // 当为关闭，type为搜索时。赋值选中的children

      if (!isOpen && type === 'search') this.setState({
        searchVal: selectChildren
      });
    } // 获取 option 定位位置

  }, {
    key: "render",
    value: function render() {
      var refSelect = this.refSelect,
          refSearch = this.refSearch,
          props = this.props,
          state = this.state,
          clickOuter = this.clickOuter,
          search = this.search,
          blurCloseOption = this.blurCloseOption,
          preventDefault = this.preventDefault;
      var selectChildren = props.selectChildren,
          type = props.type;
      var searchVal = state.searchVal;
      return /*#__PURE__*/React.createElement("div", {
        className: "imitate-select",
        ref: refSelect,
        tabIndex: "-1" // 防止 inp.focus()时，触发blur事件
        ,
        onBlur: blurCloseOption,
        onClick: clickOuter,
        onMouseDown: preventDefault,
        style: {
          cursor: type === 'search' ? 'text' : 'pointer'
        }
      }, // 通过 placeholder 来展示
      type === 'search' && /*#__PURE__*/React.createElement("input", {
        className: "imitate-select-search",
        type: "text",
        ref: refSearch,
        onChange: search,
        placeholder: "search",
        value: searchVal
      }), type === 'default' && /*#__PURE__*/React.createElement("span", {
        className: "imitate-select-value"
      }, selectChildren), /*#__PURE__*/React.createElement("img", {
        src: selectPng
      }));
    }
  }]);

  return DefaultSelect;
}(React.PureComponent);

export { DefaultSelect as default };