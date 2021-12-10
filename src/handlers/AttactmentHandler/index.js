import { Constants } from "../../utils";
import BaseHandler from "../BaseHandler";

class AttachmentHandler extends BaseHandler {
  constructor(quill, options) {
    super(quill, options);

    this.handler = Constants.blots.video;
    this.applyForToolbar();
  }

  fileChanged() {
    const file = this.loadFile(this);
    const extension = file.name.split(".").pop();

    if (!this.isAttachment(extension)) {
      console.warn(
        "[Wrong Format] Format was wrong, please try with video format correctly!!"
      );
      return;
    }

    this.embedFile(file);
  }
}

export default AttachmentHandler;
