import BaseHandler from "../BaseHandler";
import { VideoBlot } from "../../blots";
import { Constants } from "../../utils";

class VideoHandler extends BaseHandler {
  constructor(quill, options) {
    super(quill, options);

    this.handler = Constants.blots.video;
    this.applyForToolbar();
  }

  fileChanged() {
    const file = this.loadFile(this);
    const extension = file.name.split(".").pop();

    if (!this.isVideo(extension)) {
      console.warn(
        "[Wrong Format] Format was wrong, please try with video format correctly!!"
      );
      return;
    }

    this.embedFile(file);
  }

  insertFileToEditor(url, id) {
    const el = document.getElementById(id);
    if (el) {
      el.setAttribute("src", url);
      el.removeAttribute("id");
      el.classList.remove(Constants.QUILL_UPLOAD_HOLDER_CLASS_NAME);
    }
  }
}

export default VideoHandler;
