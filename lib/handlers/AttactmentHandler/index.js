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
_quill["default"].register("blots/attachment", _blots.AttachmentBlot);
var AttachmentHandler = /*#__PURE__*/function (_BaseHandler) {
  function AttachmentHandler(quill, options) {
    var _this;
    (0, _classCallCheck2["default"])(this, AttachmentHandler);
    _this = _callSuper(this, AttachmentHandler, [quill, options]);
    _this.handler = _utils.Constants.blots.attachment;
    _this.applyForToolbar();
    return _this;
  }
  (0, _inherits2["default"])(AttachmentHandler, _BaseHandler);
  return (0, _createClass2["default"])(AttachmentHandler, [{
    key: "insertFileToEditor",
    value: function insertFileToEditor(url) {
      var el = document.getElementById(this.handlerId);
      if (el) {
        el.removeAttribute("id");
        el.classList.remove(_utils.Constants.QUILL_UPLOAD_HOLDER_CLASS_NAME);
        if (url) {
          var _filename = url === null || url === void 0 ? void 0 : url.split("/").pop();
          if (_filename && el.firstElementChild) {
            el.firstElementChild.setAttribute("href", url);
            el.firstElementChild.textContent = _filename;
          }
        }
      }
    }
  }, {
    key: "fileChanged",
    value: function fileChanged() {
      var file = this.loadFile(this);
      if (!file) {
        console.warn("[File not selected] File is missing, please try to select file again!");
        return;
      }
      this.embedFile(file);
    }
  }]);
}(_BaseHandler2["default"]);
var _default = exports["default"] = AttachmentHandler;