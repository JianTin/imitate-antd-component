import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React, { Children, createRef } from 'react';
import { resultChildrenArr } from '../assets.js';
import { ExhibitSelect, OptionsList } from './ui/index.js';

var Select = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(Select, _React$PureComponent);

  var _super = _createSuper(Select);

  function Select(props) {
    var _this;

    _classCallCheck(this, Select);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "getChildren", function () {
      var childrenArr = _this.resultChildrenArr();

      var optionArray = Children.map(childrenArr, function (option) {
        return option.props;
      });

      _this.setState({
        optionArray: optionArray,
        searchOptionArray: optionArray
      }, _this.initState);
    });

    _defineProperty(_assertThisInitialized(_this), "initState", function () {
      var _this$props = _this.props,
          defaultValue = _this$props.defaultValue,
          value = _this$props.value;
      var selectValue = value ? value : defaultValue;

      _this.changOptionState(selectValue);
    });

    _defineProperty(_assertThisInitialized(_this), "resultPosition", function (optionPosition) {
      _this.setState({
        optionPosition: optionPosition
      });
    });

    _defineProperty(_assertThisInitialized(_this), "clickOption", function (event) {
      var optionvalue = event.target.attributes.optionvalue.value;
      var _this$props2 = _this.props,
          value = _this$props2.value,
          onChange = _this$props2.onChange,
          type = _this$props2.type; // 触发更改的 chang事件

      if (onChange) onChange(optionvalue); // 当value为空，那么就由 内部来控制

      if (!value) _this.changOptionState(optionvalue); // 关闭下拉框

      _this.toggelRunAnimation();
    });

    _defineProperty(_assertThisInitialized(_this), "changOptionState", function (selectValue) {
      var optionArray = _this.state.optionArray; // 得到option对象

      var selectProps = optionArray.find(function (item) {
        return item.value === selectValue;
      });
      if (!selectProps) return;
      var value = selectProps.value,
          children = selectProps.children;

      _this.setState({
        selectValue: value,
        selectChildren: children
      });
    });

    _defineProperty(_assertThisInitialized(_this), "resultOptionsArray", function (array, searchVal) {
      var onSearch = _this.props.onSearch;

      _this.setState({
        searchOptionArray: array
      });

      if (onSearch) onSearch(array, searchVal);
    });

    _defineProperty(_assertThisInitialized(_this), "recoveryOptionArray", function () {
      _this.setState({
        searchOptionArray: _this.state.optionArray
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getOptionDomAttribute", function () {
      var _this$refOptions$curr = _this.refOptions.current,
          classList = _this$refOptions$curr.classList,
          style = _this$refOptions$curr.style;
      return {
        classList: classList,
        style: style
      };
    });

    _defineProperty(_assertThisInitialized(_this), "toggelRunAnimation", function () {
      var _this$getOptionDomAtt = _this.getOptionDomAttribute(),
          classList = _this$getOptionDomAtt.classList,
          style = _this$getOptionDomAtt.style;

      var isOpen = _this.state.isOpen;
      isOpen = !isOpen; // 每次去除

      classList.remove('imitate-select-out', 'imitate-select-in');

      if (isOpen) {
        classList.add('imitate-select-in');
        style.display = 'block';
      } else {
        classList.add('imitate-select-out');
      }

      _this.setState({
        isOpen: isOpen
      });
    });

    _defineProperty(_assertThisInitialized(_this), "optionsAnimationEnd", function () {
      var _this$getOptionDomAtt2 = _this.getOptionDomAttribute(),
          style = _this$getOptionDomAtt2.style;

      if (!_this.state.isOpen) style.display = 'none';
    });

    _this.refOptions = /*#__PURE__*/createRef();
    _this.state = {
      selectValue: null,
      // 选择的 value
      optionArray: null,
      // option数据数组
      searchOptionArray: null,
      selectChildren: '',
      // 选择的 children
      // 后续会拿到 {left, height, width}
      optionPosition: {},
      isOpen: false
    };
    _this.resultChildrenArr = resultChildrenArr.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Select, [{
    key: "componentWillMount",
    value: // 展示的selectValue
    function componentWillMount() {
      this.getChildren();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var props = this.props,
          state = this.state,
          changOptionState = this.changOptionState,
          resultChildrenArr = this.resultChildrenArr,
          getChildren = this.getChildren;
      var value = props.value;
      var selectValue = state.selectValue,
          optionArray = state.optionArray; // 由 props.value 来控制，当不一样时。更新

      if (value && selectValue !== value) changOptionState(value); // 当option 数量变换时。重新渲染

      if (resultChildrenArr().length !== optionArray.length) getChildren();
    } // 获取 childrenProps

  }, {
    key: "render",
    value: function render() {
      var state = this.state,
          props = this.props,
          refOptions = this.refOptions,
          clickOption = this.clickOption,
          toggelRunAnimation = this.toggelRunAnimation,
          optionsAnimationEnd = this.optionsAnimationEnd,
          resultPosition = this.resultPosition,
          resultOptionsArray = this.resultOptionsArray,
          recoveryOptionArray = this.recoveryOptionArray;
      var selectValue = state.selectValue,
          optionPosition = state.optionPosition,
          optionArray = state.optionArray,
          searchOptionArray = state.searchOptionArray,
          selectChildren = state.selectChildren,
          isOpen = state.isOpen;
      var type = props.type;
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ExhibitSelect, {
        toggelRunAnimation: toggelRunAnimation,
        selectChildren: selectChildren,
        resultPosition: resultPosition,
        type: type,
        isOpen: isOpen,
        optionArray: optionArray,
        resultOptionsArray: resultOptionsArray,
        recoveryOptionArray: recoveryOptionArray
      }), /*#__PURE__*/React.createElement(OptionsList, {
        optionArray: optionArray,
        searchOptionArray: searchOptionArray,
        clickOption: clickOption,
        ref: refOptions,
        optionsAnimationEnd: optionsAnimationEnd,
        selectValue: selectValue,
        optionPosition: optionPosition,
        type: type
      }));
    }
  }]);

  return Select;
}(React.PureComponent);

_defineProperty(Select, "defaultProps", {
  defaultValue: null,
  value: null,
  onChange: null,
  // (value)=>{}
  type: 'default',
  // search / default
  onSearch: null // (searchArray, searchVal)=>{}

});

export { Select as default };

Select.Option = /*#__PURE__*/function (_React$Component) {
  _inherits(Option, _React$Component);

  var _super2 = _createSuper(Option);

  function Option() {
    _classCallCheck(this, Option);

    return _super2.apply(this, arguments);
  }

  _createClass(Option, [{
    key: "render",
    value: function render() {
      return null;
    }
  }]);

  return Option;
}(React.Component);