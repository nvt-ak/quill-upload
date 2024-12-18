import { Constants } from "../../utils";
import BaseHandler from "../BaseHandler";
import Quill from "quill";
import { ImageBlot } from "../../blots";

Quill.register("blots/image", ImageBlot);

class ImageHandler extends BaseHandler {
  constructor(quill, options) {
    super(quill, options);

    this.handler = Constants.blots.image;
    this.applyForToolbar();
  }

  fileChanged() {
    const files = Array.from(this.fileHolder.files);

    files.forEach((file) => {
      const extension = file.name.split(".").pop();

      if (!this.isImage(extension)) {
        console.warn(
          "[Wrong Format] Format was wrong, please try with image format correctly!!"
        );
        return;
      }

      const loadedFile = this.loadFile(this, file);
      if (loadedFile) {
        this.embedFile(loadedFile);
      }
    });

    this.isFirstFile = false;
  }
}

export default ImageHandler;
