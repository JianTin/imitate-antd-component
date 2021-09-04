import _extends from "@babel/runtime/helpers/extends";
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

import React, { PureComponent, Component, Children as ChildrenFN, createRef } from 'react';
import { Touch } from '../index';
import { resultChildrenArr } from '../assets';

var Tab = /*#__PURE__*/function (_PureComponent) {
  _inherits(Tab, _PureComponent);

  var _super = _createSuper(Tab);

  function Tab(_props) {
    var _this;

    _classCallCheck(this, Tab);

    _this = _super.call(this, _props);

    _defineProperty(_assertThisInitialized(_this), "initGetChildrenList", function () {
      var _assertThisInitialize = _assertThisInitialized(_this),
          initSelect = _assertThisInitialize.initSelect,
          resultChildrenArr = _assertThisInitialize.resultChildrenArr;

      var list = resultChildrenArr();
      var tabItem = [];
      ChildrenFN.forEach(list, function (_ref) {
        var key = _ref.key,
            props = _ref.props;

        // 拿到 TabPane 的key、tab、children
        var obj = _extends({
          key: key
        }, props);

        tabItem.push(obj);
      });

      _this.setState({
        tabItem: tabItem
      }, initSelect);
    });

    _defineProperty(_assertThisInitialized(_this), "initSelect", function () {
      var _this$props = _this.props,
          defaultKey = _this$props.defaultKey,
          activeKey = _this$props.activeKey;
      var tabItem = _this.state.tabItem; // 以 activeKey 为准
      // 如果没提供 activeKey 和 defaultKey，默认第一个

      var currentKey = activeKey ? activeKey : defaultKey;
      currentKey = currentKey ? currentKey : tabItem[0].key; // 提供了，activeKey 调用方法

      _this.changSelectTab(currentKey);
    });

    _defineProperty(_assertThisInitialized(_this), "tabClick", function (event) {
      var key = event.target.id; // 有activeKey 就不需要触发 更改select事件
      // key 和 selectKey 一样，那么不需要触发

      var _this$props2 = _this.props,
          activeKey = _this$props2.activeKey,
          onClick = _this$props2.onClick;
      var selectKey = _this.state.selectKey;
      if (!activeKey && key !== selectKey) _this.changSelectTab(key);
      onClick(key, event);
    });

    _defineProperty(_assertThisInitialized(_this), "changSelectTab", function (newKey) {
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

    _defineProperty(_assertThisInitialized(_this), "animationBar", function (index) {
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
    });

    _this.listRef = /*#__PURE__*/createRef(); // 存储list，用于获取 子元素的 offerLeft 和 width

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
    _this.resultChildrenArr = resultChildrenArr.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Tab, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.storePosition = this.props.tabPosition;
      this.initGetChildrenList();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var props = this.props,
          state = this.state,
          resultChildrenArr = this.resultChildrenArr,
          changSelectTab = this.changSelectTab,
          initGetChildrenList = this.initGetChildrenList,
          storePosition = this.storePosition;
      var activeKey = props.activeKey,
          tabPosition = props.tabPosition;
      var selectKey = state.selectKey,
          tabItem = state.tabItem;
      var listLength = resultChildrenArr().length; // activeKey有，并且 内部和外部的 key 不同，更新

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
    } // 获取children，对children做操控

  }, {
    key: "render",
    value: function render() {
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
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        className: "imitate-tab imitate-tab-".concat(tabPosition)
      }, /*#__PURE__*/React.createElement("div", {
        className: "imitate-tab-header"
      }, extraTabLeft, /*#__PURE__*/React.createElement(Touch, {
        eventCall: tabClick
      }, /*#__PURE__*/React.createElement("div", {
        className: "imitate-tab-list",
        onClick: tabClick,
        ref: listRef
      }, tabItem.map(function (_ref3) {
        var key = _ref3.key,
            tab = _ref3.tab;
        return /*#__PURE__*/React.createElement("div", {
          className: "imitate-tab-item ".concat(selectKey === key && 'imitate-tab-item-active'),
          style: barItemStyle,
          key: key,
          id: key
        }, tab);
      }))), extraTabRight, /*#__PURE__*/React.createElement("div", {
        className: "imitate-tab-ink-animated",
        style: _objectSpread({
          width: clientWidth,
          left: offsetLeft,
          height: clientHeight,
          top: offsetTop
        }, inkStyle)
      })), /*#__PURE__*/React.createElement("div", {
        className: "imitate-tab-body"
      }, currentChildren)));
    }
  }]);

  return Tab;
}(PureComponent);

_defineProperty(Tab, "defaultProps", {
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

});

export { Tab as default };

Tab.TabPane = /*#__PURE__*/function (_Component) {
  _inherits(_class, _Component);

  var _super2 = _createSuper(_class);

  function _class() {
    _classCallCheck(this, _class);

    return _super2.apply(this, arguments);
  }

  _createClass(_class, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(React.Fragment, null);
    }
  }]);

  return _class;
}(Component);