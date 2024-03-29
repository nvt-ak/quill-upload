import Quill from "quill";
import { VideoBlot } from "../../blots";
import { Constants } from "../../utils";
import BaseHandler from "../BaseHandler";

Quill.register("blots/video", VideoBlot);
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
}

export default VideoHandler;
