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
var VideoBlot = /*#__PURE__*/function (_BlockEmbed) {
  function VideoBlot() {
    (0, _classCallCheck2["default"])(this, VideoBlot);
    return _callSuper(this, VideoBlot, arguments);
  }
  (0, _inherits2["default"])(VideoBlot, _BlockEmbed);
  return (0, _createClass2["default"])(VideoBlot, [{
    key: "format",
    value: function format(name, value) {
      // Handle unregistered embed formats
      if (name === "height" || name === "width") {
        if (value) {
          this.domNode.setAttribute(name, value);
        } else {
          this.domNode.removeAttribute(name, value);
        }
      } else {
        _superPropGet(VideoBlot, "format", this, 3)([name, value]);
      }
    }
  }], [{
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
      var node = _superPropGet(VideoBlot, "create", this, 2)([src]);
      if (typeof src === "string") {
        node.setAttribute("src", src);
      }
      if (id) {
        node.setAttribute("id", id);
      }

      // Set non-format related attributes with static values
      node.setAttribute("frameborder", "0");
      node.setAttribute("allowfullscreen", true);
      return node;
    }
  }, {
    key: "formats",
    value: function formats(node) {
      // We still need to report unregistered embed formats
      var format = {};
      if (node.hasAttribute("height")) {
        format.height = node.getAttribute("height");
      }
      if (node.hasAttribute("width")) {
        format.width = node.getAttribute("width");
      }
      return format;
    }
  }, {
    key: "value",
    value: function value(node) {
      return node.getAttribute("src");
    }
  }]);
}(BlockEmbed);
VideoBlot.tagName = "iframe";
VideoBlot.blotName = _utils.Constants.blots.video;
VideoBlot.className = _utils.Constants.QUILL_UPLOAD_HOLDER_CLASS_NAME;
var _default = exports["default"] = VideoBlot;