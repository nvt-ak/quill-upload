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
    const file = this.loadFile(this);
    const extension = file.name.split(".").pop();

    if (!this.isImage(extension)) {
      console.warn(
        "[Wrong Format] Format was wrong, please try with image format correctly!!"
      );
      return;
    }

    this.embedFile(file);
  }
}

export default ImageHandler;
