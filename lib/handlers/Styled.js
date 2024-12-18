"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _utils = require("../utils");
var Styled = /*#__PURE__*/function () {
  function Styled(styles) {
    (0, _classCallCheck2["default"])(this, Styled);
    this.styles = styles;
    this.setUp();
  }
  return (0, _createClass2["default"])(Styled, [{
    key: "setUp",
    value: function setUp() {
      this.eStyle = document.createElement("style");
      this.eStyle.type = "text/css";
      document.getElementsByTagName("head")[0].appendChild(this.eStyle);
    }
  }, {
    key: "setStyle",
    value: function setStyle(styles) {
      this.styles = styles;
    }
  }, {
    key: "apply",
    value: function apply() {
      this.eStyle.appendChild(document.createTextNode(this.styles || _utils.Constants.DEFAULT_STYLES));
    }
  }]);
}();
var _default = exports["default"] = Styled;