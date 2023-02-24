import { Constants, Helpers } from "../utils";
import Styled from "./Styled";

class BaseHandler {
  constructor(quill, options) {
    this.quill = quill;
    this.options = options;
    this.range = null;
    new Styled().apply();

    this.loading = document.getElementById(
      `${Constants.ID_SPLIT_FLAG}.QUILL-LOADING`
    );

    if (!this.loading) {
      let node = document.createElement("div");
      node.innerHTML = Helpers.loadingHTML();

      this.quill.container.appendChild(node);
    }

    if (typeof this.options.upload !== "function")
      console.warn(
        "[Missing config] upload function that returns a promise is required"
      );
  }

  appendAttachmentUploadIcon() {
    const _elements = document.getElementsByClassName("ql-attachmentupload");

    if (_elements.length > 0) {
      let node = document.createElement("svg");
      node.innerHTML = Helpers.attachmentIconHTML();
      const _element = _elements[0];
      if (!_element) return;

      if (_element?.children.length <= 0) _elements[0].appendChild(node);
    }
  }

  appendImageUploadIcon() {
    const _elements = document.getElementsByClassName("ql-imageupload");

    if (_elements.length > 0) {
      let node = document.createElement("svg");
      node.innerHTML = Helpers.imageIconHTML();
      const _element = _elements[0];
      if (!_element) return;

      if (_element?.children.length <= 0) _elements[0].appendChild(node);
    }
  }

  appendVideoUploadIcon() {
    const _elements = document.getElementsByClassName("ql-videoupload");

    if (_elements.length > 0) {
      let node = document.createElement("svg");
      node.innerHTML = Helpers.videoIconHTML();
      const _element = _elements[0];
      if (!_element) return;

      if (_element?.children.length <= 0) _elements[0].appendChild(node);
    }
  }

  changeVideoIcon() {
    const _elements = document.getElementsByClassName("ql-video");

    if (_elements.length > 0) {
      let node = document.createElement("svg");
      node.innerHTML = Helpers.youtubeIconHTML();
      const _element = _elements[0];
      if (!_element) return;

      _element.innerHTML = ""; //Remove existing children
      _element.appendChild(node);
    }
  }

  applyForToolbar() {
    var toolbar = this.quill.getModule("toolbar");
    this.appendAttachmentUploadIcon();
    this.appendImageUploadIcon();
    this.appendVideoUploadIcon();
    this.changeVideoIcon();

    this.loading = document.getElementById(
      `${Constants.ID_SPLIT_FLAG}.QUILL-LOADING`
    );

    if (toolbar)
      toolbar.addHandler(this.handler, this.selectLocalFile.bind(this));
  }

  selectLocalFile() {
    const _accpepted =
      this.handler === "attachment" ? "*" : `${this.handler}/*`;
    this.range = this.quill.getSelection();
    this.fileHolder = document.createElement("input");
    this.fileHolder.setAttribute("type", "file");
    this.fileHolder.setAttribute("accept", _accpepted);
    this.fileHolder.onchange = this.fileChanged.bind(this);
    this.fileHolder.click();
  }

  findKeyframesRule(rule) {
    var ss = document.styleSheets;
    const _keyframes = [];

    for (var i = 0; i < ss.length; ++i) {
      for (var j = 0; j < ss[i].cssRules.length; ++j) {
        if (
          ss[i].cssRules[j].type == window.CSSRule.WEBKIT_KEYFRAMES_RULE &&
          ss[i].cssRules[j].name.includes(rule)
        ) {
          _keyframes.push(ss[i].cssRules[j]);
        }
      }
    }

    return _keyframes;
  }

  updateProgress(action) {
    const _ruleName = `progressBar-${new Date().getTime()}`;

    const _rule = `@keyframes ${_ruleName} {
                    0% { width: 0%; }
                    100% { width: 70%; }
                  }`;
    const _children = this.loading.children;
    if (!_children) return;

    const _progress = _children[0];
    if (!_progress) return;
    const _lastStyleSheet =
      document.styleSheets[document.styleSheets.length - 1];

    if (action === "start") {
      _lastStyleSheet.insertRule(_rule, _lastStyleSheet.cssRules.length);
      _progress.style = `animation: ${_ruleName} 5s ease-in-out; animation-fill-mode: both;`;

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

  removeLoadingClass() {
    if (this.loading) {
      this.loading.removeAttribute("class");
      this.updateProgress("finish");
    }
  }

  startLoading() {
    if (this.loading) {
      this.loading.setAttribute("class", Constants.LOADING_CLASS_NAME);
      this.updateProgress("start");
    }
  }

  loadFile(context) {
    this.startLoading();

    const file = context.fileHolder.files[0];
    this.handlerId = Helpers.generateID();

    const fileReader = new FileReader();
    fileReader.addEventListener(
      "load",
      () => {
        this.insertBase64Data(fileReader.result, this.handlerId);
      },
      false
    );

    if (!file) {
      console.warn("[File not found] Something was wrong, please try again!!");
      return;
    }

    fileReader.readAsDataURL(file);

    return file;
  }

  embedFile(file) {
    this.options.upload(file).then(
      (url) => {
        this.insertFileToEditor(url);
        this.removeLoadingClass();
      },
      (error) => {
        console.warn(error.message);
      }
    );
  }

  insertBase64Data(url) {
    const range = this.range;
    this.quill.insertEmbed(
      range.index,
      this.handler,
      `${this.handlerId}${Constants.ID_SPLIT_FLAG}${url}`
    );
  }

  insertFileToEditor(url) {
    const el = document.getElementById(this.handlerId);
    if (el) {
      el.setAttribute("src", url);
      el.removeAttribute("id");
      el.classList.remove(Constants.QUILL_UPLOAD_HOLDER_CLASS_NAME);
    }
  }

  isImage(extension) {
    return /(gif|jpg|jpeg|tiff|png|webp|jfif)$/i.test(extension);
  }

  isVideo(extension) {
    return /(mp4|m4a|3gp|f4a|m4b|m4r|f4b|mov|flv|avi|ogg)$/i.test(extension);
  }

  isAttachment(extension) {
    return extension instanceof String;
  }
}

export default BaseHandler;
