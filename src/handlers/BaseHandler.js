import Styled from "./Styled";
import path from "path";
import { Helpers, Constants } from "../utils";

class BaseHandler {
  constructor(quill, options) {
    this.quill = quill;
    this.options = options;
    this.range = null;
    new Styled().apply();

    let node = document.createElement("div");
    node.innerHTML = Helpers.loadingHTML();

    this.quill.container.appendChild(node);

    if (typeof this.options.upload !== "function")
      console.warn(
        "[Missing config] upload function that returns a promise is required"
      );
  }

  applyForToolbar() {
    var toolbar = this.quill.getModule("toolbar");
    this.loading = document.getElementById(
      `${Constants.ID_SPLIT_FLAG}.QUILL-LOADING`
    );
    toolbar.addHandler(this.handler, this.selectLocalFile.bind(this));
  }

  selectLocalFile() {
    this.range = this.quill.getSelection();
    this.fileHolder = document.createElement("input");
    this.fileHolder.setAttribute("type", "file");
    this.fileHolder.setAttribute("accept", `${this.handler}/*`);
    this.fileHolder.onchange = this.fileChanged.bind(this);
    this.fileHolder.click();
  }

  loadFile(context) {
    this.loading.removeAttribute("class");
    this.loading.setAttribute("class", Constants.LOADING_CLASS_NAME);

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
      url => {
        this.insertFileToEditor(url);
        this.loading.removeAttribute("class");
        this.loading.setAttribute("class", Constants.NONE_DISPLAY_CLASS_NAME);
      },
      error => {
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
    return /(gif|jpg|jpeg|tiff|png)$/i.test(extension);
  }

  isVideo(extension) {
    return /(mp4|m4a|3gp|f4a|m4b|m4r|f4b|mov|flv|avi|ogg)$/i;
  }
}

export default BaseHandler;
