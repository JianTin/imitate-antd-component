"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _assets = require("../assets.js");

var _index = require("./ui/index.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Select = /*#__PURE__*/function (_React$PureComponent) {
  (0, _inherits2["default"])(Select, _React$PureComponent);

  var _super = _createSuper(Select);

  function Select(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Select);
    _this = _super.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "getChildren", function () {
      var childrenArr = _this.resultChildrenArr();

      var optionArray = _react.Children.map(childrenArr, function (option) {
        return option.props;
      });

      _this.setState({
        optionArray: optionArray,
        searchOptionArray: optionArray
      }, _this.initState);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "initState", function () {
      var _this$props = _this.props,
          defaultValue = _this$props.defaultValue,
          value = _this$props.value;
      var selectValue = value ? value : defaultValue;

      _this.changOptionState(selectValue);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "resultPosition", function (optionPosition) {
      _this.setState({
        optionPosition: optionPosition
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "clickOption", function (event) {
      var optionvalue = event.target.attributes.optionvalue.value;
      var _this$props2 = _this.props,
          value = _this$props2.value,
          onChange = _this$props2.onChange,
          type = _this$props2.type; // 触发更改的 chang事件

      if (onChange) onChange(optionvalue); // 当value为空，那么就由 内部来控制

      if (!value) _this.changOptionState(optionvalue); // 关闭下拉框

      _this.toggelRunAnimation();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "changOptionState", function (selectValue) {
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
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "resultOptionsArray", function (array, searchVal) {
      var onSearch = _this.props.onSearch;

      _this.setState({
        searchOptionArray: array
      });

      if (onSearch) onSearch(array, searchVal);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "recoveryOptionArray", function () {
      _this.setState({
        searchOptionArray: _this.state.optionArray
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "getOptionDomAttribute", function () {
      var _this$refOptions$curr = _this.refOptions.current,
          classList = _this$refOptions$curr.classList,
          style = _this$refOptions$curr.style;
      return {
        classList: classList,
        style: style
      };
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "toggelRunAnimation", function () {
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
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "optionsAnimationEnd", function () {
      var _this$getOptionDomAtt2 = _this.getOptionDomAttribute(),
          style = _this$getOptionDomAtt2.style;

      if (!_this.state.isOpen) style.display = 'none';
    });
    _this.refOptions = /*#__PURE__*/(0, _react.createRef)();
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
    _this.resultChildrenArr = _assets.resultChildrenArr.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  (0, _createClass2["default"])(Select, [{
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
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_index.ExhibitSelect, {
        toggelRunAnimation: toggelRunAnimation,
        selectChildren: selectChildren,
        resultPosition: resultPosition,
        type: type,
        isOpen: isOpen,
        optionArray: optionArray,
        resultOptionsArray: resultOptionsArray,
        recoveryOptionArray: recoveryOptionArray
      }), /*#__PURE__*/_react["default"].createElement(_index.OptionsList, {
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
}(_react["default"].PureComponent);

exports["default"] = Select;
(0, _defineProperty2["default"])(Select, "defaultProps", {
  defaultValue: null,
  value: null,
  onChange: null,
  // (value)=>{}
  type: 'default',
  // search / default
  onSearch: null // (searchArray, searchVal)=>{}

});

Select.Option = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Option, _React$Component);

  var _super2 = _createSuper(Option);

  function Option() {
    (0, _classCallCheck2["default"])(this, Option);
    return _super2.apply(this, arguments);
  }

  (0, _createClass2["default"])(Option, [{
    key: "render",
    value: function render() {
      return null;
    }
  }]);
  return Option;
}(_react["default"].Component);