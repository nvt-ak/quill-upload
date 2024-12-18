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
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _utils = require("../../utils");
var _BaseHandler2 = _interopRequireDefault(require("../BaseHandler"));
var _quill = _interopRequireDefault(require("quill"));
var _blots = require("../../blots");
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
_quill["default"].register("blots/image", _blots.ImageBlot);
var ImageHandler = /*#__PURE__*/function (_BaseHandler) {
  function ImageHandler(quill, options) {
    var _this;
    (0, _classCallCheck2["default"])(this, ImageHandler);
    _this = _callSuper(this, ImageHandler, [quill, options]);
    _this.handler = _utils.Constants.blots.image;
    _this.applyForToolbar();
    return _this;
  }
  (0, _inherits2["default"])(ImageHandler, _BaseHandler);
  return (0, _createClass2["default"])(ImageHandler, [{
    key: "fileChanged",
    value: function fileChanged() {
      var _this2 = this;
      var files = Array.from(this.fileHolder.files);
      files.forEach(function (file) {
        var extension = file.name.split(".").pop();
        if (!_this2.isImage(extension)) {
          console.warn("[Wrong Format] Format was wrong, please try with image format correctly!!");
          return;
        }
        var loadedFile = _this2.loadFile(_this2, file);
        if (loadedFile) {
          _this2.embedFile(loadedFile);
        }
      });
      this.isFirstFile = false;
    }
  }]);
}(_BaseHandler2["default"]);
var _default = exports["default"] = ImageHandler;