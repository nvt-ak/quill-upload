import { Constants } from "../../utils";
import BaseHandler from "../BaseHandler";
import Quill from "quill";
import { AttachmentBlot } from "../../blots";

Quill.register("blots/attachment", AttachmentBlot);
class AttachmentHandler extends BaseHandler {
  constructor(quill, options) {
    super(quill, options);

    this.handler = Constants.blots.attachment;
    this.applyForToolbar();
  }

  insertFileToEditor(url) {
    const el = document.getElementById(this.handlerId);
    if (el) {
      el.removeAttribute("id");
      el.classList.remove(Constants.QUILL_UPLOAD_HOLDER_CLASS_NAME);

      if (url) {
        const _filename = url?.split("/").pop();

        if (_filename && el.firstElementChild) {
          el.firstElementChild.setAttribute("href", url);
          el.firstElementChild.textContent = _filename;
        }
      }
    }
  }

  fileChanged() {
    const file = this.loadFile(this);

    if (!file) {
      console.warn(
        "[File not selected] File is missing, please try to select file again!"
      );
      return;
    }

    this.embedFile(file);
  }
}

export default AttachmentHandler;
