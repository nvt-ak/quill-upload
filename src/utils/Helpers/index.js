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
              <span class="quill-progress"></span>
            </div>
            `;
  },
  attachmentIconHTML: function () {
    return `<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Attach</title><path d="M216.08 192v143.85a40.08 40.08 0 0080.15 0l.13-188.55a67.94 67.94 0 10-135.87 0v189.82a95.51 95.51 0 10191 0V159.74" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32"/></svg>`;
  },
  imageIconHTML: function () {
    return `<svg viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <rect class="ql-stroke" height="10" width="12" x="3" y="4"></rect> <circle class="ql-fill" cx="6" cy="7" r="1"></circle><polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline> </svg>`;
  },
  youtubeIconHTML: function() {
    return `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="18" height="18" fill="#1E1E1E"/><rect width="18" height="18" fill="white"/><g clip-path="url(#clip0_0_1)"><path d="M16.6706 4.72119C16.4861 4.04824 15.9457 3.51765 15.2604 3.33647C14.0083 3 9.00003 3 9.00003 3C9.00003 3 3.99177 3 2.73971 3.32353C2.06755 3.50471 1.51401 4.04824 1.32949 4.72119C1 5.95061 1 8.50004 1 8.50004C1 8.50004 1 11.0624 1.32949 12.2789C1.51401 12.9518 2.05437 13.4824 2.73971 13.6636C4.00495 14.0001 9.00003 14.0001 9.00003 14.0001C9.00003 14.0001 14.0083 14.0001 15.2604 13.6766C15.9457 13.4954 16.4861 12.9648 16.6706 12.2918C17.0001 11.0624 17.0001 8.51299 17.0001 8.51299C17.0001 8.51299 17.0132 5.95061 16.6706 4.72119Z" fill="#282828"/><path d="M11.5701 8.50004L7.4053 6.14473V10.8554L11.5701 8.50004Z" fill="white"/></g><defs><clipPath id="clip0_0_1"><rect width="16" height="11" fill="white" transform="translate(1 3)"/></clipPath></defs></svg>`
  },
  videoIconHTML: function() {
    return `<svg viewBox="0 0 18 18"> <rect class="ql-stroke" height="12" width="12" x="3" y="3"></rect> <rect class="ql-fill" height="12" width="1" x="5" y="3"></rect> <rect class="ql-fill" height="12" width="1" x="12" y="3"></rect> <rect class="ql-fill" height="2" width="8" x="5" y="8"></rect> <rect class="ql-fill" height="1" width="3" x="3" y="5"></rect> <rect class="ql-fill" height="1" width="3" x="3" y="7"></rect> <rect class="ql-fill" height="1" width="3" x="3" y="10"></rect> <rect class="ql-fill" height="1" width="3" x="3" y="12"></rect> <rect class="ql-fill" height="1" width="3" x="12" y="5"></rect> <rect class="ql-fill" height="1" width="3" x="12" y="7"></rect> <rect class="ql-fill" height="1" width="3" x="12" y="10"></rect> <rect class="ql-fill" height="1" width="3" x="12" y="12"></rect> </svg>`
  },
  attachmentHTML: function () {
    return `<a href="#" target="_blank" download>[Speichert ..]</a>`;
  },
};
