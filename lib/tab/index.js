"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Tab = /*#__PURE__*/function (_PureComponent) {
  (0, _inheritsLoose2["default"])(Tab, _PureComponent);

  function Tab(_props) {
    var _this;

    _this = _PureComponent.call(this, _props) || this;

    _this.resultListArray = function () {
      var children = _this.props.children;
      return Array.isArray(children) ? children : [children];
    };

    _this.initGetChildrenList = function () {
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
    };

    _this.initSelect = function () {
      var _this$props = _this.props,
          defaultKey = _this$props.defaultKey,
          activeKey = _this$props.activeKey;
      var tabItem = _this.state.tabItem; // 以 activeKey 为准
      // 如果没提供 activeKey 和 defaultKey，默认第一个

      var currentKey = activeKey ? activeKey : defaultKey;
      currentKey = currentKey ? currentKey : tabItem[0].key; // 提供了，activeKey 调用方法

      _this.changSelectTab(currentKey);
    };

    _this.tabClick = function (event) {
      var key = event.target.id; // 有activeKey 就不需要触发 更改select事件
      // key 和 selectKey 一样，那么不需要触发

      var _this$props2 = _this.props,
          activeKey = _this$props2.activeKey,
          onClick = _this$props2.onClick;
      var selectKey = _this.state.selectKey;
      if (!activeKey && key !== selectKey) _this.changSelectTab(key);
      onClick(key, event);
    };

    _this.changSelectTab = function (newKey) {
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
    };

    _this.animationBar = function (index) {
      var tabPosition = _this.props.tabPosition;
      var node = _this.listRef.current.childNodes[index];
      var clientWidth = node.clientWidth,
          offsetLeft = node.offsetLeft,
          clientHeight = node.clientHeight,
          offsetTop = node.offsetTop;
      var barStyle = ''; // 定义不同方向的 bar 如何设置

      switch (tabPosition) {
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
    };

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

  var _proto = Tab.prototype;

  _proto.componentWillMount = function componentWillMount() {
    this.storePosition = this.props.tabPosition;
    this.initGetChildrenList();
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    var props = this.props,
        state = this.state,
        resultListArray = this.resultListArray,
        changSelectTab = this.changSelectTab,
        initGetChildrenList = this.initGetChildrenList,
        storePosition = this.storePosition;
    var activeKey = props.activeKey,
        tabPosition = props.tabPosition;
    var selectKey = state.selectKey,
        tabItem = state.tabItem;
    var listLength = resultListArray().length; // activeKey有，并且 内部和外部的 key 不同，更新

    if (activeKey && activeKey !== selectKey) {
      changSelectTab(activeKey);
    } // position 不一样，使用存储的selectKey更新


    if (storePosition !== tabPosition) {
      this.storePosition = tabPosition;
      changSelectTab(selectKey);
    } // 数量不同 更新


    if (listLength !== tabItem.length) {
      initGetChildrenList();
    }
  } // 返回 list 数组
  ;

  _proto.render = function render() {
    var state = this.state,
        tabClick = this.tabClick,
        listRef = this.listRef,
        props = this.props;
    var tabPosition = props.tabPosition,
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
      className: "imitate-tab imitate-tab-" + tabPosition
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
        className: "imitate-tab-item " + (selectKey === key && 'imitate-tab-item-active'),
        style: barItemStyle,
        key: key,
        id: key
      }, tab);
    })), extraTabRight, /*#__PURE__*/_react["default"].createElement("div", {
      className: "imitate-tab-ink-animated",
      style: (0, _extends2["default"])({
        width: clientWidth,
        left: offsetLeft,
        height: clientHeight,
        top: offsetTop
      }, inkStyle)
    })), /*#__PURE__*/_react["default"].createElement("div", {
      className: "imitate-tab-body"
    }, currentChildren)));
  };

  return Tab;
}(_react.PureComponent);

exports["default"] = Tab;
Tab.defaultProps = {
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
  extraTabLeft: null,
  // 额外元素
  extraTabRight: null,
  // 额外元素
  inkStyle: {},
  // 标识的style
  barItemStyle: {} // itemStyle

};

Tab.TabPane = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(_class, _Component);

  function _class() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto2 = _class.prototype;

  _proto2.render = function render() {
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null);
  };

  return _class;
}(_react.Component);