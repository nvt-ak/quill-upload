import Quill from "quill";
import { Constants } from "../../utils";

let BlockEmbed = Quill.import("blots/block/embed");

class ImageBlot extends BlockEmbed {
  static create(value) {
    let id;
    let src;
    let customClass;

    value = String(value);
    const idParts = value.split(Constants.ID_SPLIT_FLAG);
    if (idParts.length > 1) {
      id = idParts[0];
      value = String(idParts[1]);
    }

    const classParts = value.split(Constants.CLASS_SPLIT_FLAG);
    if (classParts.length > 1) {
      src = classParts[0];
      customClass = classParts[1];
    } else {
      src = value;
    }

    let node = super.create();

    if (typeof src === "string") {
      node.setAttribute("src", src);
    }

    if (id) {
      node.setAttribute("id", id);
    }

    if (customClass) {
      const classNames = customClass.split(" ").filter(Boolean);
      console.log("Adding classes:", classNames); // Debug log
      classNames.forEach((className) => {
        node.classList.add(className.trim());
      });
    }

    if (this.className) {
      node.classList.add(this.className);
    }

    return node;
  }

  static value(node) {
    return {
      alt: node.getAttribute("alt"),
      url: node.getAttribute("src"),
      class: node.getAttribute("class"),
    };
  }
}

ImageBlot.tagName = "img";
ImageBlot.blotName = Constants.blots.image;
ImageBlot.className = Constants.QUILL_UPLOAD_HOLDER_CLASS_NAME;

export default ImageBlot;
