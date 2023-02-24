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
  videoIconHtml: function() {
    return `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="18" height="18" fill="#1E1E1E"/>
              <g clip-path="url(#clip0_0_1)">
              <rect width="18" height="18" fill="white"/>
              <path d="M15 3H3V15H15V3Z" fill="black"/>
              <path d="M6 3H5V15H6V3Z" fill="black"/>
              <path d="M13 3H12V15H13V3Z" fill="black"/>
              <path d="M13 8H5V10H13V8Z" fill="black"/>
              <path d="M6 5H3V6H6V5Z" fill="black"/>
              <path d="M6 7H3V8H6V7Z" fill="black"/>
              <path d="M6 10H3V11H6V10Z" fill="black"/>
              <path d="M6 12H3V13H6V12Z" fill="black"/>
              <path d="M15 5H12V6H15V5Z" fill="black"/>
              <path d="M15 7H12V8H15V7Z" fill="black"/>
              <path d="M15 10H12V11H15V10Z" fill="black"/>
              <path d="M15 12H12V13H15V12Z" fill="black"/>
              <rect x="10" y="12" width="4" height="5" fill="white"/>
              <path d="M14.7963 11.8761L14.7872 12.0848H14.8V12.498V12.698H15C15.9641 12.698 16.7492 13.4541 16.7981 14.4035L16.8 14.498C16.799 15.4594 16.0432 16.2452 15.0928 16.2923L14.9961 16.2942L14.8 16.298V16.298H12.7V14.7371H13.7324H14.1653L13.8847 14.4075L12.1523 12.3723L11.9997 12.193L11.8474 12.3726L10.1209 14.4097L9.84175 14.7391H10.2734H11.3V16.3H9.00031C8.00467 16.2963 7.2 15.4907 7.2 14.498C7.2 13.6284 7.81854 12.902 8.63948 12.735L8.87189 12.6878L8.78605 12.4667C8.73054 12.3237 8.7 12.1666 8.7 12.002C8.7 11.2843 9.28233 10.702 10 10.702C10.2389 10.702 10.4623 10.7662 10.6557 10.8782L10.8361 10.9826L10.933 10.798C11.2748 10.1464 11.96 9.7 12.75 9.7C13.8818 9.7 14.8 10.6184 14.8 11.748C14.8 11.788 14.7983 11.8307 14.7963 11.8761Z" fill="white" stroke="black" stroke-width="0.4"/>
              </g>
              <defs>
              <clipPath id="clip0_0_1">
              <rect width="18" height="18" fill="white"/>
              </clipPath>
              </defs>
              </svg>`
  },
  attachmentHTML: function () {
    return `<a href="#" target="_blank" download>[Speichert ..]</a>`;
  },
};
