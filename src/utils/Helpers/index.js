import Constants from "../Constants";

export default {
  id: 0,
  prefix: "QUILL_UPLOAD_HANDLER",
  generateID: function () {
    const id = this.id;

    this.id = id + 1;
    return `${this.prefix}-${id}`;
  },
  loadingHTML: function () {
    return `<div id="${Constants.ID_SPLIT_FLAG}.QUILL-LOADING">
                        <span style="width:80%;"><span class="quill-progress">
                        </span></span>
                      </div>`;
  },
};
