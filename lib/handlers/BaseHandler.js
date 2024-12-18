"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _utils = require("../utils");
var _Styled = _interopRequireDefault(require("./Styled"));
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var BaseHandler = /*#__PURE__*/function () {
  function BaseHandler(quill) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck2["default"])(this, BaseHandler);
    this.quill = quill;
    this.options = options;
    this.range = null;
    this.fileHolder = null;
    this.placeholders = new Map();
    this.isFirstFile = false;
    this.currentIndex = 0;
    new _Styled["default"]().apply();
    this.loading = document.getElementById("".concat(_utils.Constants.ID_SPLIT_FLAG, ".QUILL-LOADING"));
    if (!this.loading) {
      var node = document.createElement("div");
      node.innerHTML = _utils.Helpers.loadingHTML();
      this.quill.container.appendChild(node);
    }
    if (typeof this.options.upload !== "function") console.warn("[Missing config] upload function that returns a promise is required");
  }
  return (0, _createClass2["default"])(BaseHandler, [{
    key: "appendAttachmentIcon",
    value: function appendAttachmentIcon() {
      var _elements = document.getElementsByClassName("ql-attachment");
      if (_elements.length > 0) {
        var node = document.createElement("svg");
        node.innerHTML = _utils.Helpers.attachmentIconHTML();
        var _element = _elements[0];
        if (!_element) return;
        if ((_element === null || _element === void 0 ? void 0 : _element.children.length) <= 0) _elements[0].appendChild(node);
      }
    }
  }, {
    key: "applyForToolbar",
    value: function applyForToolbar() {
      var toolbar = this.quill.getModule("toolbar");
      this.appendAttachmentIcon();
      this.loading = document.getElementById("".concat(_utils.Constants.ID_SPLIT_FLAG, ".QUILL-LOADING"));
      if (toolbar) toolbar.addHandler(this.handler, this.selectLocalFile.bind(this));
    }
  }, {
    key: "selectLocalFile",
    value: function selectLocalFile() {
      var _accpepted = this.handler === "attachment" ? "*" : "".concat(this.handler, "/*");
      this.range = this.quill.getSelection();
      this.currentIndex = this.range ? this.range.index : 0;
      this.fileHolder = document.createElement("input");
      this.fileHolder.setAttribute("type", "file");
      this.fileHolder.setAttribute("accept", _accpepted);
      this.fileHolder.setAttribute("multiple", "true");
      this.fileHolder.onchange = this.fileChanged.bind(this);
      this.fileHolder.click();
    }
  }, {
    key: "findKeyframesRule",
    value: function findKeyframesRule(rule) {
      var ss = document.styleSheets;
      var _keyframes = [];
      for (var i = 0; i < ss.length; ++i) {
        for (var j = 0; j < ss[i].cssRules.length; ++j) {
          if (ss[i].cssRules[j].type == window.CSSRule.WEBKIT_KEYFRAMES_RULE && ss[i].cssRules[j].name.includes(rule)) {
            _keyframes.push(ss[i].cssRules[j]);
          }
        }
      }
      return _keyframes;
    }
  }, {
    key: "updateProgress",
    value: function updateProgress(action) {
      var _ruleName = "progressBar-".concat(new Date().getTime());
      var _rule = "@keyframes ".concat(_ruleName, " {\n                    0% { width: 0%; }\n                    100% { width: 70%; }\n                  }");
      var _children = this.loading.children;
      if (!_children) return;
      var _progress = _children[0];
      if (!_progress) return;
      var _lastStyleSheet = document.styleSheets[document.styleSheets.length - 1];
      if (action === "start") {
        _lastStyleSheet.insertRule(_rule, _lastStyleSheet.cssRules.length);
        _progress.style = "animation: ".concat(_ruleName, " 5s ease-in-out; animation-fill-mode: both;");
        return;
      }
      var keyframes = this.findKeyframesRule("progressBar");
      var keyframeString = [];
      for (var i = 0; i < keyframes.length; i++) {
        keyframeString.push(keyframes[i].keyText);
      }
      for (var i = 0, j = keyframeString.length; i < j; i++) {
        _lastStyleSheet.deleteRule(keyframeString[i]);
      }
    }
  }, {
    key: "removeLoadingClass",
    value: function removeLoadingClass() {
      if (this.loading) {
        this.loading.removeAttribute("class");
        this.updateProgress("finish");
      }
    }
  }, {
    key: "startLoading",
    value: function startLoading() {
      var eStyle = document.createElement("style");
      eStyle.type = "text/css";
      document.getElementsByTagName("head")[0].appendChild(eStyle);
      eStyle.appendChild(document.createTextNode(_utils.Constants.DEFAULT_STYLES));
    }
  }, {
    key: "loadFile",
    value: function loadFile(context, file) {
      if (!this.isFirstFile) {
        this.startLoading();
        this.isFirstFile = true;
      }
      var placeholderId = "quill-upload-".concat(Date.now(), "-").concat(Math.random().toString(36).substr(2, 9));
      this.insertPlaceholder(placeholderId);
      this.placeholders.set(file, {
        id: placeholderId,
        index: this.currentIndex
      });
      this.currentIndex++;
      return file;
    }
  }, {
    key: "insertToEditor",
    value: function insertToEditor(url, index) {
      this.quill.insertEmbed(index, this.handler, url);
    }
  }, {
    key: "insertPlaceholder",
    value: function insertPlaceholder(id) {
      var _this = this;
      var placeholderUrl = "https://via.placeholder.com/100x100?text=Uploading...";
      this.quill.insertEmbed(this.currentIndex, this.handler, placeholderUrl);
      setTimeout(function () {
        var images = _this.quill.root.querySelectorAll("img");
        var _iterator = _createForOfIteratorHelper(images),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var img = _step.value;
            if (img.src.includes("placeholder.com") && !img.hasAttribute("data-placeholder-id")) {
              img.setAttribute("data-placeholder-id", id);
              break;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }, 0);
    }
  }, {
    key: "embedFile",
    value: function embedFile(file) {
      var _this2 = this;
      if (!file) return;
      var upload = this.options.upload || function () {};
      var placeholderInfo = this.placeholders.get(file);
      if (!placeholderInfo) return;
      upload(file).then(function (url) {
        if (url) {
          _this2.insertFileToEditor(url, placeholderInfo.id);
        }
      })["catch"](function (error) {
        console.error("Upload error:", error);
        _this2.insertFileToEditor("https://via.placeholder.com/300?text=Upload+Failed", placeholderInfo.id);
      })["finally"](function () {
        _this2.placeholders["delete"](file);
      });
    }
  }, {
    key: "insertFileToEditor",
    value: function insertFileToEditor(url, placeholderId) {
      if (!placeholderId) return;
      var placeholder = this.quill.root.querySelector("img[data-placeholder-id=\"".concat(placeholderId, "\"]"));
      if (placeholder) {
        placeholder.src = url;
        placeholder.removeAttribute("data-placeholder-id");
      }
    }
  }, {
    key: "fileChanged",
    value: function fileChanged() {
      var _this3 = this;
      var files = Array.from(this.fileHolder.files);
      this.currentIndex = this.range ? this.range.index : 0;
      files.forEach(function (file) {
        _this3.loadFile(null, file);
        _this3.embedFile(file);
      });
      this.fileHolder.value = "";
    }
  }, {
    key: "isImage",
    value: function isImage(extension) {
      return /(gif|jpg|jpeg|tiff|png|webp|jfif)$/i.test(extension);
    }
  }, {
    key: "isVideo",
    value: function isVideo(extension) {
      return /(mp4|m4a|3gp|f4a|m4b|m4r|f4b|mov|flv|avi|ogg)$/i.test(extension);
    }
  }, {
    key: "isAttachment",
    value: function isAttachment(extension) {
      return extension instanceof String;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.placeholders.clear();
    }
  }]);
}();
var _default = exports["default"] = BaseHandler;