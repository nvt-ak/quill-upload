import { Constants } from "../utils";

class Styled {
  constructor(styles) {
    this.styles = styles;

    this.setUp();
  }

  setUp() {
    this.eStyle = document.createElement("style");
    this.eStyle.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(this.eStyle);
  }

  setStyle(styles) {
    this.styles = styles;
  }

  apply() {
    this.eStyle.appendChild(
      document.createTextNode(this.styles || Constants.DEFAULT_STYLES)
    );
  }
}

export default Styled;
