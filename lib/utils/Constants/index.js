"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = exports["default"] = {
  ID_SPLIT_FLAG: "__ID_SPLIT__",
  CLASS_SPLIT_FLAG: "__CLASS_SPLIT__",
  IMAGE_LOADING_CLASS_NAME: "image-loading-for-quill-upload",
  VIDEO_LOADING_CLASS_NAME: "video-loading-for-quill-upload",
  QUILL_UPLOAD_HOLDER_CLASS_NAME: "quill-upload-progress",
  DEFAULT_IMAGE_CLASS: "quill-image",
  DEFAULT_VIDEO_CLASS: "quill-video",
  DEFAULT_ATTACHMENT_CLASS: "quill-attachment",
  DEFAULT_STYLES: "\n    .image-loading-for-quill-upload {\n      display: inline-block;\n      width: 30px;\n      height: 30px;\n      border-radius: 50%;\n      border: 3px solid #ccc;\n      border-top-color: #1e986c;\n    }\n    .video-loading-for-quill-upload {\n      display: inline-block;\n      width: 30px;\n      height: 30px;\n      border-radius: 50%;\n      border: 3px solid #ccc;\n      border-top-color: #1e986c;\n    }\n\n    .meter {\n      height: 5px;\n      position: relative;\n      background: #f3efe6;\n      overflow: hidden;\n      margin-top: -35px;\n    }\n    \n    .meter span {\n      display: block;\n      height: 100%;\n    }\n    \n    .quill-progress {\n      background-color: #e4c465;\n      animation: progressBar 40s ease-in-out;\n      animation-fill-mode: both;\n    }\n\n    .none-display {\n      display: none;\n    }\n\n    .quill-upload-progress {\n      opacity: 0.3;\n    }\n  ",
  blots: {
    video: "video",
    image: "image",
    attachment: "attachment"
  },
  LOADING_CLASS_NAME: "meter",
  NONE_DISPLAY_CLASS_NAME: "none-display",
  ATTACHMENT_WRAPPER_STYLE: "\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    padding: 10px;\n    background-color: aliceblue;\n    border-radius: 4px;\n    max-width: 200px;\n    cursor: pointer;\n  "
};