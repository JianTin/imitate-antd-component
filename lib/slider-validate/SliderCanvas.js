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

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var SliderImg = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(SliderImg, _Component);

  var _super = _createSuper(SliderImg);

  function SliderImg(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, SliderImg);
    _this = _super.call(this, props); // 滑块图片 dom

    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "drowSliderImg", function () {
      var _this$puzzlePostion = _this.puzzlePostion,
          x = _this$puzzlePostion.x,
          y = _this$puzzlePostion.y;
      if (!_this.sliderImg.current) return;

      var imgCtx = _this.sliderImg.current.getContext('2d'); // 绘制图片


      imgCtx.drawImage(_this.imgInstance, 0, 0); // 绘制蒙版

      _this.drowPuzzlePath(imgCtx, x, y);

      imgCtx.fillStyle = 'rgba(0,0,0,0.6)';
      imgCtx.fill(); // 绘制 描边

      imgCtx.lineWidth = 2;
      imgCtx.strokeStyle = 'white';
      imgCtx.stroke();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "drowSliderPuzzle", function () {
      var _this$puzzlePostion2 = _this.puzzlePostion,
          x = _this$puzzlePostion2.x,
          y = _this$puzzlePostion2.y;
      if (!_this.sliderPuzzle.current) return;

      var puzzleCtx = _this.sliderPuzzle.current.getContext('2d');

      _this.drowPuzzlePath(puzzleCtx, 0, y);

      puzzleCtx.fill(); // 切边

      puzzleCtx.clip();
      puzzleCtx.drawImage(_this.imgInstance, -x, 0); // 绘制 描边

      puzzleCtx.strokeStyle = 'white';
      puzzleCtx.lineWidth = 3;
      puzzleCtx.stroke();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "generateRandom", function () {
      var _this$props = _this.props,
          puzzleSize = _this$props.puzzleSize,
          canvasSize = _this$props.canvasSize;
      var initMove = {
        minH: 10,
        maxH: canvasSize.h - puzzleSize.h - 10,
        minW: canvasSize.w / 2,
        maxW: canvasSize.w - puzzleSize.w - 10
      };
      var minH = initMove.minH,
          minW = initMove.minW,
          maxH = initMove.maxH,
          maxW = initMove.maxW;
      var moveX = Math.random() * (maxW - minW) + minW;
      var moveY = Math.random() * (maxH - minH) + minH;
      return {
        x: Number(moveX.toFixed(0)),
        y: Number(moveY.toFixed(0))
      };
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "drowPuzzlePath", function (ctx, x, y) {
      var _this$props$puzzleSiz = _this.props.puzzleSize,
          w = _this$props$puzzleSiz.w,
          h = _this$props$puzzleSiz.h;
      var sectionW = w / 3;
      var sectionH = h / 3;
      var wRadius = (0.19 * w).toFixed(0);
      var hRadius = (0.19 * h).toFixed(0); // 开始绘制 拼图

      ctx.beginPath(); // 定义笔触

      ctx.moveTo(x, y); // top

      ctx.lineTo(x + sectionW, y);
      ctx.arcTo(x + sectionW + sectionW / 2, y + sectionW, x + sectionW * 2, y, wRadius);
      ctx.lineTo(x + w, y); // right

      ctx.lineTo(x + w, y + sectionH);
      ctx.arcTo(x + w + sectionH, y + sectionH + sectionH / 2, x + w, y + sectionH * 2, hRadius);
      ctx.lineTo(x + w, y + h); // bottom

      ctx.lineTo(x + sectionW * 2, y + h);
      ctx.arcTo(x + sectionW + sectionW / 2, y + h - sectionW, x + sectionW, y + h, wRadius);
      ctx.lineTo(x, y + h); // left

      ctx.lineTo(x, y);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "reset", function () {
      // 清除 img
      _this.imgInstance.removeEventListener('load', _this.drowCanvas);

      _this.imgInstance = null; // 清除 canvas

      _this.random += 1;
      _this.sliderImg.current.width = 0;
      _this.sliderImg.current.height = 0;
      _this.sliderPuzzle.current.width = 0;
      _this.sliderPuzzle.current.height = 0; // 重新 绘制

      _this.initCanvas();
    });
    _this.sliderImg = /*#__PURE__*/(0, _react.createRef)(); // 滑块

    _this.sliderPuzzle = /*#__PURE__*/(0, _react.createRef)();
    _this.imgUrl = '';
    _this.imgInstance = ''; // 定义 imgInstance

    _this.puzzlePostion = ''; // 拼图缺口的位置

    _this.random = 1; // 定义随机数，用于 img 更新

    return _this;
  } // 加载 img -> load - canvas


  (0, _createClass2["default"])(SliderImg, [{
    key: "initCanvas",
    value: function initCanvas() {
      var _this2 = this;

      this.props.openSpin();
      var _this$props$canvasSiz = this.props.canvasSize,
          w = _this$props$canvasSiz.w,
          h = _this$props$canvasSiz.h; // 定义尺寸

      this.sliderImg.current.width = w;
      this.sliderImg.current.height = h;
      this.sliderPuzzle.current.width = w;
      this.sliderPuzzle.current.height = h; // 随机位置

      this.puzzlePostion = this.generateRandom();
      this.props.getPuzzleX(this.puzzlePostion.x); // img generate

      var img = new Image();
      img.src = this.imgUrl + "?random=".concat(this.random);
      img.addEventListener('load', function () {
        return [_this2.drowSliderImg, _this2.drowSliderPuzzle, _this2.props.closeSpin].forEach(function (fn) {
          return fn();
        });
      });
      this.imgInstance = img;
    } // 绘制 canvas

  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props$canvasSiz2 = this.props.canvasSize,
          w = _this$props$canvasSiz2.w,
          h = _this$props$canvasSiz2.h;
      this.imgUrl = "https://picsum.photos/".concat(w, "/").concat(h);
      this.initCanvas();
    }
  }, {
    key: "render",
    value: function render() {
      var move = this.props.move;
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("canvas", {
        ref: this.sliderImg
      }), /*#__PURE__*/_react["default"].createElement("canvas", {
        ref: this.sliderPuzzle,
        style: {
          left: "".concat(move, "px")
        }
      }));
    }
  }]);
  return SliderImg;
}(_react.Component);

SliderImg.defaultProps = {
  move: 0,
  openSpin: function openSpin() {},
  closeSpin: function closeSpin() {},
  getPuzzleX: function getPuzzleX() {},
  canvasSize: {
    w: 0,
    h: 0
  },
  puzzleSize: {
    w: 0,
    h: 0
  }
};
var _default = SliderImg;
exports["default"] = _default;