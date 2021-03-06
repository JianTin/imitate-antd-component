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
import selectPng from '../../image/xiala.png';

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
        inp.focus(); // ????????????????????????search ????????????

        _this.setState({
          searchVal: ''
        }); // ?????? ????????? ??????


        recoveryOptionArray();
      } // search?????????options?????? ????????????


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
      }); // ??????????????????????????????????????????option

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
      searchVal: '' // input ?????????value

    };
    _this.resizeObserver = null;
    return _this;
  }

  _createClass(DefaultSelect, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      // ??????????????????
      var node = this.refSelect.current;
      var oldHeight = 0;
      var resizeObserver = new ResizeObserver(function (entries) {
        // ?????????????????????????????? ??????
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
          type = _this$props4.type; // ???????????????type??????????????????????????????children

      if (!isOpen && type === 'search') this.setState({
        searchVal: selectChildren
      });
    } // ?????? option ????????????

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
        tabIndex: "-1" // ?????? inp.focus()????????????blur??????
        ,
        onBlur: blurCloseOption,
        onClick: clickOuter,
        onMouseDown: preventDefault,
        style: {
          cursor: type === 'search' ? 'text' : 'pointer'
        }
      }, // ?????? placeholder ?????????
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