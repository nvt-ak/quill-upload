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
  videoIconHTML: function() {
    return `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_1_2)">
    <rect width="18" height="18" fill="white"/>
    <path d="M3.5 3.5H14.5V14.5H3.5V3.5Z" stroke="black"/>
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
    <rect x="8.2" y="10.6" width="5.6" height="7" fill="white"/>
    <path d="M14.9947 10.43L14.9856 10.6387H15V11.2973V11.4973H15.2C16.593 11.4973 17.7273 12.59 17.7974 13.9621L17.8 14.0965C17.799 15.486 16.7065 16.6218 15.3327 16.6892L15.1961 16.6918L15 16.6957V16.6973H11.9V14.352H13.4254H13.8583L13.5777 14.0223L11.1523 11.1731L10.9997 10.9938L10.8474 11.1734L8.43024 14.0254L8.15113 14.3547H8.58281H10.1V16.7L6.80071 16.7C6.80062 16.7 6.80053 16.7 6.80044 16.7C5.36255 16.6948 4.2 15.5314 4.2 14.0973C4.2 12.8409 5.09354 11.7919 6.27932 11.5507L6.51173 11.5034L6.4259 11.2823C6.3446 11.0729 6.3 10.8432 6.3 10.6027C6.3 9.55382 7.15108 8.70273 8.2 8.70273C8.54908 8.70273 8.87561 8.79671 9.158 8.96019L9.33845 9.06467L9.43531 8.88002C9.92712 7.94251 10.9131 7.3 12.05 7.3C13.6787 7.3 15 8.62151 15 10.2473C15 10.3052 14.9975 10.3666 14.9947 10.43Z" fill="white" stroke="black" stroke-width="0.4"/>
    </g>
    <defs>
    <clipPath id="clip0_1_2">
    <rect width="18" height="18" fill="white"/>
    </clipPath>
    </defs>
    </svg>`
  },
  attachmentHTML: function () {
    return `<a href="#" target="_blank" download>[Speichert ..]</a>`;
  },
};
