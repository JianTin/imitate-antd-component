"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Tab = /*#__PURE__*/function (_PureComponent) {
  (0, _inherits2["default"])(Tab, _PureComponent);

  var _super = _createSuper(Tab);

  function Tab(_props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Tab);
    _this = _super.call(this, _props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "resultListArray", function () {
      var children = _this.props.children;
      return Array.isArray(children) ? children : [children];
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "initGetChildrenList", function () {
      var _assertThisInitialize = (0, _assertThisInitialized2["default"])(_this),
          initSelect = _assertThisInitialize.initSelect,
          resultListArray = _assertThisInitialize.resultListArray;

      var list = resultListArray();
      var tabItem = [];

      _react.Children.forEach(list, function (_ref) {
        var key = _ref.key,
            props = _ref.props;
        // 拿到 TabPane 的key、tab、children
        var obj = (0, _extends2["default"])({
          key: key
        }, props);
        tabItem.push(obj);
      });

      _this.setState({
        tabItem: tabItem
      }, initSelect);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "initSelect", function () {
      var _this$props = _this.props,
          defaultKey = _this$props.defaultKey,
          activeKey = _this$props.activeKey;
      var tabItem = _this.state.tabItem; // 以 activeKey 为准
      // 如果没提供 activeKey 和 defaultKey，默认第一个

      var currentKey = activeKey ? activeKey : defaultKey;
      currentKey = currentKey ? currentKey : tabItem[0].key; // 提供了，activeKey 调用方法

      _this.changSelectTab(currentKey);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "tabClick", function (event) {
      var key = event.target.id; // 有activeKey 就不需要触发 更改select事件

      var _this$props2 = _this.props,
          activeKey = _this$props2.activeKey,
          onClick = _this$props2.onClick;
      if (!activeKey) _this.changSelectTab(key);
      onClick(key, event);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "changSelectTab", function (newKey) {
      var tabItem = _this.state.tabItem;
      var _this$props3 = _this.props,
          activeKey = _this$props3.activeKey,
          onChange = _this$props3.onChange; // 选中的 selectIndex

      var selectIndex = '';
      var selectKey = ''; // 以 activeKey 为主

      newKey = activeKey ? activeKey : newKey;
      var selectTab = tabItem.find(function (_ref2, index) {
        var key = _ref2.key;
        selectIndex = index;
        selectKey = key;
        return newKey === key;
      }); // ink 移动
      // 以及 children 切换

      if (selectTab) {
        onChange(newKey);

        _this.setState({
          currentChildren: selectTab.children,
          selectKey: selectKey
        });

        _this.animationBar(selectIndex);
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "animationBar", function (index) {
      var position = _this.props.position;
      var node = _this.listRef.current.childNodes[index];
      var clientWidth = node.clientWidth,
          offsetLeft = node.offsetLeft,
          clientHeight = node.clientHeight,
          offsetTop = node.offsetTop;
      var barStyle = ''; // 定义不同方向的 bar 如何设置

      switch (position) {
        case 'left':
        case 'right':
          barStyle = {
            clientHeight: clientHeight,
            offsetTop: offsetTop,
            clientWidth: '2px',
            offsetLeft: ''
          };
          break;

        case 'top':
        case 'bottom':
          barStyle = {
            clientHeight: '2px',
            offsetTop: '',
            clientWidth: clientWidth,
            offsetLeft: offsetLeft
          };
          break;
      }

      _this.setState({
        barStyle: barStyle
      });
    });
    _this.listRef = /*#__PURE__*/(0, _react.createRef)(); // 存储list，用于获取 子元素的 offerLeft 和 width

    _this.storePosition = '';
    _this.state = {
      tabItem: [],
      // 渲染的列表
      currentChildren: '',
      // 当前展示的 children
      selectKey: '',
      // 每次更改 储存 selectKe
      barStyle: {
        // top / bottom
        offsetLeft: '',
        clientWidth: '',
        // 可能是bar的为top、bottom 的长度。也可能只是left、right的2px
        // left / right
        offsetTop: '',
        clientHeight: ''
      }
    };
    return _this;
  }

  (0, _createClass2["default"])(Tab, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.storePosition = this.props.position;
      this.initGetChildrenList();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var props = this.props,
          state = this.state,
          resultListArray = this.resultListArray,
          changSelectTab = this.changSelectTab,
          initGetChildrenList = this.initGetChildrenList,
          storePosition = this.storePosition;
      var activeKey = props.activeKey,
          position = props.position;
      var selectKey = state.selectKey,
          tabItem = state.tabItem;
      var listLength = resultListArray().length; // activeKey有，并且 内部和外部的 key 不同，更新

      if (activeKey && activeKey !== selectKey) {
        changSelectTab(activeKey);
      } // position 不一样，使用存储的selectKey更新


      if (storePosition !== position) {
        this.storePosition = position;
        changSelectTab(selectKey);
      } // 数量不同 更新


      if (listLength !== tabItem.length) {
        initGetChildrenList();
      }
    } // 返回 list 数组

  }, {
    key: "render",
    value: function render() {
      var state = this.state,
          tabClick = this.tabClick,
          listRef = this.listRef,
          props = this.props;
      var position = props.position,
          extraTabLeft = props.extraTabLeft,
          extraTabRight = props.extraTabRight,
          inkStyle = props.inkStyle,
          barItemStyle = props.barItemStyle;
      var currentChildren = state.currentChildren,
          tabItem = state.tabItem,
          barStyle = state.barStyle,
          selectKey = state.selectKey;
      var offsetLeft = barStyle.offsetLeft,
          clientWidth = barStyle.clientWidth,
          offsetTop = barStyle.offsetTop,
          clientHeight = barStyle.clientHeight;
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
        className: "imitate-tab imitate-tab-".concat(position)
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "imitate-tab-header"
      }, extraTabLeft, /*#__PURE__*/_react["default"].createElement("div", {
        className: "imitate-tab-list",
        onClick: tabClick,
        ref: listRef
      }, tabItem.map(function (_ref3) {
        var key = _ref3.key,
            tab = _ref3.tab;
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "imitate-tab-item ".concat(selectKey === key && 'imitate-tab-item-active'),
          style: barItemStyle,
          key: key,
          id: key
        }, tab);
      })), extraTabRight, /*#__PURE__*/_react["default"].createElement("div", {
        className: "imitate-tab-ink-animated",
        style: _objectSpread({
          width: clientWidth,
          left: offsetLeft,
          height: clientHeight,
          top: offsetTop
        }, inkStyle)
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "imitate-tab-body"
      }, currentChildren)));
    }
  }]);
  return Tab;
}(_react.PureComponent);

exports["default"] = Tab;
(0, _defineProperty2["default"])(Tab, "defaultProps", {
  defaultKey: '',
  // 默认 key
  activeKey: '',
  // 当前选择的key > defaultKey
  onChange: function onChange() {},
  // 更改标签时触发
  onClick: function onClick() {},
  // 点击标签时触发
  tabPosition: 'top',
  // 位置
  extraTabLeft: '',
  // 额外元素
  extraTabRight: '',
  // 额外元素
  inkStyle: {},
  // 标识的style
  barItemStyle: {} // itemStyle

});

Tab.TabPane = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(_class, _Component);

  var _super2 = _createSuper(_class);

  function _class() {
    (0, _classCallCheck2["default"])(this, _class);
    return _super2.apply(this, arguments);
  }

  (0, _createClass2["default"])(_class, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null);
    }
  }]);
  return _class;
}(_react.Component);