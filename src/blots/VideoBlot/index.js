import Quill from "quill";
import { Constants } from "../../utils";
let BlockEmbed = Quill.import("blots/block/embed");

class VideoBlot extends BlockEmbed {
  static create(value) {
    let id;
    let src;

    const arr = `${value}`.split(Constants.ID_SPLIT_FLAG);
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

    node.setAttribute("frameborder", "0");
    node.setAttribute("allowfullscreen", true);

    return node;
  }

  static formats(node) {
    let format = {};
    if (node.hasAttribute("height")) {
      format.height = node.getAttribute("height");
    }
    if (node.hasAttribute("width")) {
      format.width = node.getAttribute("width");
    }
    return format;
  }

  static value(node) {
    return node.getAttribute("src");
  }

  format(name, value) {
    if (name === "height" || name === "width") {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name, value);
      }
    } else {
      super.format(name, value);
    }
  }
}

VideoBlot.tagName = "iframe";
VideoBlot.blotName = Constants.blots.video;
VideoBlot.className = Constants.QUILL_UPLOAD_HOLDER_CLASS_NAME;

export default VideoBlot;
