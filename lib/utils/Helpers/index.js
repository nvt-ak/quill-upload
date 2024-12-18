"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Constants = _interopRequireDefault(require("../Constants"));
var _default = exports["default"] = {
  id: 0,
  prefix: "QUILL_UPLOAD_HANDLER",
  generateID: function generateID() {
    var id = this.id;
    this.id = id + 1;
    return "".concat(this.prefix, "-").concat(id);
  },
  loadingHTML: function loadingHTML() {
    return "<div id=\"".concat(_Constants["default"].ID_SPLIT_FLAG, ".QUILL-LOADING\">\n              <span class=\"quill-progress\"></span>\n            </div>\n            ");
  },
  attachmentIconHTML: function attachmentIconHTML() {
    return "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"ionicon\" viewBox=\"0 0 512 512\"><title>Attach</title><path d=\"M216.08 192v143.85a40.08 40.08 0 0080.15 0l.13-188.55a67.94 67.94 0 10-135.87 0v189.82a95.51 95.51 0 10191 0V159.74\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-miterlimit=\"10\" stroke-width=\"32\"/></svg>";
  },
  attachmentHTML: function attachmentHTML() {
    return "\n      <a style=\"flex: 1; text-overflow: ellipsis; white-space: nowrap; overflow-x: hidden;\" href=\"#\" target=\"_blank\" download>\u0110ang t\u1EA3i...</a>\n      <button onclick=\"\n        function removeAttachmentNode(element) {\n          if (element && element.parentElement) element.parentElement.remove();\n        }\n\n        removeAttachmentNode(this);\" style=\"border: none; background-color: aliceblue; display: flex; justify-content: center; align-items: center;\">\n        <svg style=\"width: 14px; height: 14px;\" aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"times\" class=\"svg-inline--fa fa-times fa-w-11\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 352 512\"><path fill=\"currentColor\" d=\"M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z\"></path></svg>\n      </button>\n    ";
  }
};