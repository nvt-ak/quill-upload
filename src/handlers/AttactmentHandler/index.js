import { Constants } from "../../utils";
import BaseHandler from "../BaseHandler";
import Quill from "quill";
import { AttachmentBlot } from "../../blots";

Quill.register("blots/attachment", AttachmentBlot);
class AttachmentHandler extends BaseHandler {
  constructor(quill, options) {
    super(quill, options);

    this.handler = Constants.blots.link;
    this.applyForToolbar();
  }

  insertFileToEditor(url) {
    const el = document.getElementById(this.handlerId);
    if (el) {
      el.setAttribute("src", url);
      el.setAttribute("data-url", url);
      el.removeAttribute("id");
      el.classList.remove(Constants.QUILL_UPLOAD_HOLDER_CLASS_NAME);
    }
  }

  fileChanged() {
    const file = this.loadFile(this);
    const extension = file.name.split(".").pop();

    if (this.isNotAttachment(extension)) {
      console.warn(
        "[Wrong Format] Format was wrong, please try with video format correctly!!"
      );
      return;
    }

    this.embedFile(file);
  }
}

export default AttachmentHandler;
