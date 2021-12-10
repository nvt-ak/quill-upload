const Quill = require("quill");
Quill.debug("error");
require("quill/dist/quill.snow.css");
const { ImageHandler, VideoHandler } = require("quill-upload");

Quill.register("modules/imageHandler", ImageHandler);
Quill.register("modules/videoHandler", VideoHandler);

var Block = Quill.import("blots/block");
Block.tagName = "DIV";
Quill.register(Block, true);

const _onUpload = function (fd, resolve) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://upload.imagekit.io/api/v1/files/upload");
  xhr.setRequestHeader(
    "Authorization",
    "Basic cHJpdmF0ZV9LKzNFRGJnMXRQOXBsejlvOGhkd1J0bkZ0bjQ9Og=="
  );
  xhr.onload = () => {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);

      resolve(response.url); // Must resolve as a link to the image
    }
  };

  xhr.send(fd);
};

const quill = new Quill("#editor", {
  theme: "snow",
  modules: {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"], // toggled buttons
      [
        { list: "ordered" },
        { list: "bullet" },

        { indent: "-1" },
        { align: [] },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["blockquote", "code-block"],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ color: [] }, { background: [] }], // outdent/indent
    ],
    imageHandler: {
      upload: (file) => {
        // return a Promise that resolves in a link to the uploaded image
        return new Promise((resolve, reject) => {
          const fd = new FormData();
          fd.append("file", file);
          fd.append("fileName", `${new Date().getTime()}.png`);

          _onUpload(fd, resolve);
        });
      },
    },
    videoHandler: {
      upload: (file) => {
        // return a Promise that resolves in a link to the uploaded image
        return new Promise((resolve, reject) => {
          const fd = new FormData();
          fd.append("file", file);
          fd.append("fileName", `${new Date().getTime()}.mp4`);

          _onUpload(fd, resolve);
        });
      },
    },
  },
  placeholder: "please write something...",
});

document.getElementById("output").onclick = function () {
  console.log(quill.root.innerHTML);
};
