import Quill from "quill";
import { Constants } from "../../utils";

let BlockEmbed = Quill.import("blots/block/embed");

class ImageBlot extends BlockEmbed {
  static create(value) {
    let id;
    let src;

    const arr = value.split(Constants.ID_SPLIT_FLAG);
    if (arr.length > 1) {
      id = arr[0];
      src = arr[1];
    } else {
      src = value;
    }

    let node = super.create(src);
    if (typeof src === "string") {
      node.setAttribute("src", src);
    }

    if (id) {
      node.setAttribute("id", id);
    }

    return node;
  }

  static value(node) {
    return {
      alt: node.getAttribute("alt"),
      url: node.getAttribute("src")
    };
  }
}

ImageBlot.tagName = "img";
ImageBlot.blotName = Constants.blots.image;
ImageBlot.className = Constants.QUILL_UPLOAD_HOLDER_CLASS_NAME;

Quill.register(ImageBlot);

export default ImageBlot;
