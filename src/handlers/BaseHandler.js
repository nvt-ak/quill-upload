import { Constants, Helpers } from "../utils";
import Styled from "./Styled";

class BaseHandler {
  constructor(quill, options = {}) {
    this.quill = quill;
    this.options = options;
    this.range = null;
    this.fileHolder = null;
    this.placeholders = new Map();
    this.isFirstFile = false;
    this.currentIndex = 0;
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

  appendAttachmentIcon() {
    const _elements = document.getElementsByClassName("ql-attachment");

    if (_elements.length > 0) {
      let node = document.createElement("svg");
      node.innerHTML = Helpers.attachmentIconHTML();
      const _element = _elements[0];
      if (!_element) return;

      if (_element?.children.length <= 0) _elements[0].appendChild(node);
    }
  }

  applyForToolbar() {
    var toolbar = this.quill.getModule("toolbar");
    this.appendAttachmentIcon();

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
    this.currentIndex = this.range ? this.range.index : 0;
    this.fileHolder = document.createElement("input");
    this.fileHolder.setAttribute("type", "file");
    this.fileHolder.setAttribute("accept", _accpepted);
    this.fileHolder.setAttribute("multiple", "true");
    this.fileHolder.onchange = this.fileChanged.bind(this);
    this.fileHolder.click();
  }

  findKeyframesRule(rule) {
    const _keyframes = [];
    try {
      const ss = document.styleSheets;
      for (let i = 0; i < ss.length; ++i) {
        if (!ss[i].href || ss[i].href.startsWith(window.location.origin)) {
          try {
            const rules = ss[i].cssRules || ss[i].rules;
            for (let j = 0; j < rules.length; ++j) {
              if (
                rules[j].type === CSSRule.KEYFRAMES_RULE ||
                rules[j].type === CSSRule.WEBKIT_KEYFRAMES_RULE
              ) {
                if (rules[j].name.includes(rule)) {
                  _keyframes.push(rules[j]);
                }
              }
            }
          } catch (e) {
            continue;
          }
        }
      }
    } catch (e) {
      console.warn("Cannot access stylesheet rules:", e);
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
    const eStyle = document.createElement("style");
    eStyle.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(eStyle);
    eStyle.appendChild(document.createTextNode(Constants.DEFAULT_STYLES));
  }

  loadFile(context, file) {
    if (!this.isFirstFile) {
      this.startLoading();
      this.isFirstFile = true;
    }

    const placeholderId = `quill-upload-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    this.insertPlaceholder(placeholderId);

    this.placeholders.set(file, {
      id: placeholderId,
      index: this.currentIndex,
    });

    this.currentIndex++;

    return file;
  }

  insertToEditor(url, index) {
    let defaultClass = "";
    switch (this.handler) {
      case Constants.blots.image:
        defaultClass = Constants.DEFAULT_IMAGE_CLASS;
        break;
      case Constants.blots.video:
        defaultClass = Constants.DEFAULT_VIDEO_CLASS;
        break;
      case Constants.blots.attachment:
        defaultClass = Constants.DEFAULT_ATTACHMENT_CLASS;
        break;
    }

    const existingNode = this.quill.root.querySelector(
      `[data-placeholder-id="${this.handlerId}"]`
    );
    const existingClasses = existingNode
      ? existingNode.getAttribute("class")
      : defaultClass;

    if (existingNode) {
      existingNode.remove();
    }

    this.quill.insertEmbed(index, this.handler, url);

    setTimeout(() => {
      const selector =
        this.handler === Constants.blots.image
          ? `img[src="${url}"]`
          : this.handler === Constants.blots.video
          ? `iframe[src="${url}"]`
          : `div[href="${url}"]`;

      const newNode = this.quill.root.querySelector(selector);
      if (newNode) {
        if (existingClasses) {
          newNode.setAttribute("class", existingClasses);
        } else {
          newNode.classList.add(defaultClass);
        }

        const parentDiv = newNode.closest(".ql-editor > *");
        if (parentDiv) {
          parentDiv.classList.add(`${defaultClass}-wrapper`);
        }
      }
    }, 0);
  }

  insertPlaceholder(id) {
    const placeholderUrl =
      "https://via.placeholder.com/100x100?text=Uploading...";

    this.quill.insertEmbed(this.currentIndex, this.handler, placeholderUrl);

    setTimeout(() => {
      const images = this.quill.root.querySelectorAll("img");
      for (let img of images) {
        if (
          img.src.includes("placeholder.com") &&
          !img.hasAttribute("data-placeholder-id")
        ) {
          img.setAttribute("data-placeholder-id", id);
          img.classList.add(Constants.DEFAULT_IMAGE_CLASS);
          const parentDiv = img.closest(".ql-editor > *");
          if (parentDiv) {
            parentDiv.classList.add(`${Constants.DEFAULT_IMAGE_CLASS}-wrapper`);
          }
          break;
        }
      }
    }, 0);
  }

  embedFile(file) {
    if (!file) return;

    const upload = this.options.upload || (() => {});
    const placeholderInfo = this.placeholders.get(file);

    if (!placeholderInfo) return;

    upload(file)
      .then((url) => {
        if (url) {
          this.insertFileToEditor(url, placeholderInfo.id);
        }
      })
      .catch((error) => {
        console.error("Upload error:", error);
        this.insertFileToEditor(
          "https://via.placeholder.com/300?text=Upload+Failed",
          placeholderInfo.id
        );
      })
      .finally(() => {
        this.placeholders.delete(file);
      });
  }

  insertFileToEditor(url, placeholderId) {
    if (!placeholderId) return;

    const placeholder = this.quill.root.querySelector(
      `img[data-placeholder-id="${placeholderId}"]`
    );
    if (placeholder) {
      placeholder.src = url;
      placeholder.removeAttribute("data-placeholder-id");
    }
  }

  fileChanged() {
    const files = Array.from(this.fileHolder.files);

    this.currentIndex = this.range ? this.range.index : 0;

    files.forEach((file) => {
      this.loadFile(null, file);
      this.embedFile(file);
    });

    this.fileHolder.value = "";
  }

  isImage(extension) {
    return /(gif|jpg|jpeg|tiff|png|webp|jfif)$/i.test(extension);
  }

  isVideo(extension) {
    return /(mp4|m4a|3gp|f4a|m4b|m4r|f4b|mov|flv|avi|ogg|webm)$/i.test(
      extension
    );
  }

  isAttachment(extension) {
    return extension instanceof String;
  }

  destroy() {
    this.placeholders.clear();
  }
}

export default BaseHandler;
