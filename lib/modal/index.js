"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _reactDom = require("react-dom");

var _index = _interopRequireDefault(require("../button/index.js"));

var _index2 = require("../index");

var _assets = require("../assets");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function RenderModal(Modal) {
  var _class, _temp;

  return _temp = _class = /*#__PURE__*/function (_React$PureComponent) {
    (0, _inherits2["default"])(_class, _React$PureComponent);

    var _super = _createSuper(_class);

    function _class(props) {
      var _this;

      (0, _classCallCheck2["default"])(this, _class);
      _this = _super.call(this, props);
      _this.init = false;
      return _this;
    }

    (0, _createClass2["default"])(_class, [{
      key: "setContainerPosition",
      value: // ?????? dom ???????????????
      function setContainerPosition() {
        var getContainer = this.props.getContainer;
        var defaultContainer = document.body; // ?????? position  ??????????????? modal????????????

        if (defaultContainer !== getContainer) {
          var position = getContainer.style.position;
          getContainer.style.position = position ? position : 'relative';
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props = this.props,
            visible = _this$props.visible,
            getContainer = _this$props.getContainer; // ??????visible????????????
        // ???????????? Modal componentDidMount ?????????

        if (typeof visible !== 'boolean' || !getContainer) return null; // visible ??? true???????????????????????????

        if (visible === true) this.init = true;
        if (this.init === false) return null;
        this.setContainerPosition();
        return /*#__PURE__*/_react["default"].createElement(Modal, this.props);
      }
    }]);
    return _class;
  }(_react["default"].PureComponent), (0, _defineProperty2["default"])(_class, "defaultProps", {
    title: '',
    // title
    visible: null,
    // ???????????? ??????
    footer: true,
    // modal footer ????????????
    cancelEvent: function cancelEvent() {},
    // ?????? close / mask / ????????????????????????
    okEvent: function okEvent() {},
    // ????????????
    afterClose: function afterClose() {},
    // Modal????????????????????????
    destroyOnClose: false,
    // ?????????????????????????????????
    centered: false,
    // ????????????
    mask: true,
    // ?????? ????????????
    maskClosable: true,
    // ??????????????????????????? cancel ??????
    modalStyle: {},
    // modal ??????
    maskStyle: {},
    // ????????????
    okText: '??????',
    cancelText: '??????',
    getContainer: document.body // ???????????????body???

  }), _temp;
}

var Modal = /*#__PURE__*/function (_React$PureComponent2) {
  (0, _inherits2["default"])(Modal, _React$PureComponent2);

  var _super2 = _createSuper(Modal);

  function Modal(props) {
    var _this2;

    (0, _classCallCheck2["default"])(this, Modal);
    _this2 = _super2.call(this, props); // ??????????????? index

    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this2), "isDestroyContent", function () {
      var _this2$props = _this2.props,
          destroyOnClose = _this2$props.destroyOnClose,
          visible = _this2$props.visible,
          children = _this2$props.children;
      if (destroyOnClose && !visible) return null;
      return children;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this2), "maskClick", function () {
      var _this2$props2 = _this2.props,
          maskClosable = _this2$props2.maskClosable,
          cancelEvent = _this2$props2.cancelEvent;
      if (maskClosable) cancelEvent();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this2), "resultAnimationCss", function () {
      var visible = _this2.props.visible;
      return {
        maskAnimation: visible ? 'imitate-modal-maskIn' : 'imitate-modal-maskOut',
        modalAnimation: visible ? 'imitate-modal-In' : 'imitate-modal-Out'
      };
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this2), "getModalShowAssets", function () {
      var visible = _this2.props.visible;
      var modalRoot = _this2.rootRef.current;
      return {
        visible: visible,
        modalRoot: modalRoot
      };
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this2), "AnimationEndModal", function () {
      var _this2$getModalShowAs = _this2.getModalShowAssets(),
          modalRoot = _this2$getModalShowAs.modalRoot,
          visible = _this2$getModalShowAs.visible;

      var afterClose = _this2.props.afterClose;

      if (!visible) {
        afterClose();
        modalRoot.style.display = 'none';
      }
    });
    _this2.index = (0, _assets.getIndex)();
    _this2.rootRef = /*#__PURE__*/(0, _react.createRef)();
    return _this2;
  } // ?????? ??????DOm?????????????????????????????????


  (0, _createClass2["default"])(Modal, [{
    key: "componentDidUpdate",
    value: // visible ???true ??????  root.dispaly = block ??????
    // ????????? visible ??? false??????????????? ??????
    // ?????? esc ??????
    function componentDidUpdate() {
      var _this$getModalShowAss = this.getModalShowAssets(),
          modalRoot = _this$getModalShowAss.modalRoot,
          visible = _this$getModalShowAss.visible;

      modalRoot.style.display = visible && 'block';
    }
  }, {
    key: "render",
    value: function render() {
      var resultAnimationCss = this.resultAnimationCss,
          props = this.props,
          AnimationEndModal = this.AnimationEndModal,
          isDestroyContent = this.isDestroyContent,
          maskClick = this.maskClick,
          index = this.index;

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

      var Element = /*#__PURE__*/_react["default"].createElement("div", {
        className: "imitate-modal-root",
        ref: this.rootRef,
        style: {
          zIndex: index
        }
      }, mask && /*#__PURE__*/_react["default"].createElement(_index2.Touch, {
        eventCall: maskClick
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "imitate-modal-mask imitate-moda-animationDuration ".concat(maskAnimation),
        onClick: maskClick,
        style: maskStyle
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "imitate-modal-outer imitate-moda-animationDuration ".concat(modalAnimation),
        onAnimationEnd: AnimationEndModal,
        centered: centered ? 'true' : null,
        style: modalStyle
      }, /*#__PURE__*/_react["default"].createElement(_index2.Touch, {
        eventCall: cancelEvent
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "imitate-modal-cancel",
        onClick: cancelEvent
      }, " ", /*#__PURE__*/_react["default"].createElement("a", null, "x"), " ")), title && /*#__PURE__*/_react["default"].createElement("div", {
        className: "imitate-modal-title"
      }, title), /*#__PURE__*/_react["default"].createElement("div", {
        className: "imitate-modal-content"
      }, " ", isDestroyContent(), " "), footer && /*#__PURE__*/_react["default"].createElement("div", {
        className: "imitate-modal-footer"
      }, /*#__PURE__*/_react["default"].createElement(_index["default"], {
        onClick: cancelEvent
      }, cancelText), /*#__PURE__*/_react["default"].createElement(_index["default"], {
        type: "primary",
        onClick: okEvent
      }, okText))));

      return /*#__PURE__*/(0, _reactDom.createPortal)(Element, getContainer);
    }
  }]);
  return Modal;
}(_react["default"].PureComponent);

var _default = RenderModal(Modal);

exports["default"] = _default;