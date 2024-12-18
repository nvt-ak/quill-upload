"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _quill = _interopRequireDefault(require("quill"));
var _utils = require("../../utils");
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _superPropGet(t, o, e, r) { var p = (0, _get2["default"])((0, _getPrototypeOf2["default"])(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
var BlockEmbed = _quill["default"]["import"]("blots/block/embed");
var ImageBlot = /*#__PURE__*/function (_BlockEmbed) {
  function ImageBlot() {
    (0, _classCallCheck2["default"])(this, ImageBlot);
    return _callSuper(this, ImageBlot, arguments);
  }
  (0, _inherits2["default"])(ImageBlot, _BlockEmbed);
  return (0, _createClass2["default"])(ImageBlot, null, [{
    key: "create",
    value: function create(value) {
      var id;
      var src;
      var arr = "".concat(value).split(_utils.Constants.ID_SPLIT_FLAG);
      if (arr.length > 1) {
        id = arr[0];
        src = arr[1];
      } else {
        src = value;
      }
      var node = _superPropGet(ImageBlot, "create", this, 2)([src]);
      if (typeof src === "string") {
        node.setAttribute("src", src);
      }
      if (id) {
        node.setAttribute("id", id);
      }
      return node;
    }
  }, {
    key: "value",
    value: function value(node) {
      return {
        alt: node.getAttribute("alt"),
        url: node.getAttribute("src")
      };
    }
  }]);
}(BlockEmbed);
ImageBlot.tagName = "img";
ImageBlot.blotName = _utils.Constants.blots.image;
ImageBlot.className = _utils.Constants.QUILL_UPLOAD_HOLDER_CLASS_NAME;
var _default = exports["default"] = ImageBlot;