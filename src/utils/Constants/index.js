export default {
  ID_SPLIT_FLAG: "__ID_SPLIT__",
  IMAGE_LOADING_CLASS_NAME: "image-loading-for-quill-upload",
  VIDEO_LOADING_CLASS_NAME: "video-loading-for-quill-upload",
  QUILL_UPLOAD_HOLDER_CLASS_NAME: "quill-upload-progress",
  DEFAULT_STYLES: `
    .image-loading-for-quill-upload {
      display: inline-block;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 3px solid #ccc;
      border-top-color: #1e986c;
    }
    .video-loading-for-quill-upload {
      display: inline-block;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 3px solid #ccc;
      border-top-color: #1e986c;
    }

    .meter {
      height: 5px;
      position: relative;
      background: #eff5fb;
      overflow: hidden;
      margin-top: -35px;
    }
    
    .meter span {
      display: block;
      height: 100%;
    }
    
    .quill-progress {
      background-color: #051d38;
      animation: progressBar 40s ease-in-out;
      animation-fill-mode: both;
    }

    .none-display {
      display: none;
    }

    .quill-upload-progress {
      opacity: 0.3;
    }
  `,
  blots: {
    video: "videoupload",
    image: "imageupload",
    attachment: "attachmentupload",
  },
  LOADING_CLASS_NAME: "meter",
  NONE_DISPLAY_CLASS_NAME: "none-display",
};
