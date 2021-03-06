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

var _xiala = _interopRequireDefault(require("../../image/xiala.png"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var DefaultSelect = /*#__PURE__*/function (_React$PureComponent) {
  (0, _inherits2["default"])(DefaultSelect, _React$PureComponent);

  var _super = _createSuper(DefaultSelect);

  function DefaultSelect(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, DefaultSelect);
    _this = _super.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "getoptionPosition", function () {
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
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "clickOuter", function () {
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
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "blurCloseOption", function () {
      var _this$props2 = _this.props,
          toggelRunAnimation = _this$props2.toggelRunAnimation,
          isOpen = _this$props2.isOpen;
      if (isOpen) toggelRunAnimation();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "search", function (event) {
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
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "preventDefault", function (event) {
      if (_this.props.type === 'search') event.preventDefault();
    });
    _this.refSelect = /*#__PURE__*/(0, _react.createRef)();
    _this.refSearch = /*#__PURE__*/(0, _react.createRef)();
    _this.state = {
      searchVal: '' // input ?????????value

    };
    _this.resizeObserver = null;
    return _this;
  }

  (0, _createClass2["default"])(DefaultSelect, [{
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
      return /*#__PURE__*/_react["default"].createElement("div", {
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
      type === 'search' && /*#__PURE__*/_react["default"].createElement("input", {
        className: "imitate-select-search",
        type: "text",
        ref: refSearch,
        onChange: search,
        placeholder: "search",
        value: searchVal
      }), type === 'default' && /*#__PURE__*/_react["default"].createElement("span", {
        className: "imitate-select-value"
      }, selectChildren), /*#__PURE__*/_react["default"].createElement("img", {
        src: _xiala["default"]
      }));
    }
  }]);
  return DefaultSelect;
}(_react["default"].PureComponent);

exports["default"] = DefaultSelect;