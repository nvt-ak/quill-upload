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
    const files = Array.from(this.fileHolder.files);

    files.forEach((file) => {
      const extension = file.name.split(".").pop();

      if (!this.isVideo(extension)) {
        console.warn(
          "[Wrong Format] Format was wrong, please try with video format correctly!!"
        );
        return;
      }

      const loadedFile = this.loadFile(this, file);
      if (loadedFile) {
        this.embedFile(loadedFile);
      }
    });

    this.fileHolder.value = "";
  }
}

export default VideoHandler;
