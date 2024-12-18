"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _handlers = require("./handlers");
Object.keys(_handlers).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _handlers[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _handlers[key];
    }
  });
});