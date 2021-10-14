const Quill = require("quill");
Quill.debug("error");
require("quill/dist/quill.snow.css");
const { ImageHandler, VideoHandler } = require("quill-upload");

Quill.register("modules/imageHandler", ImageHandler);
Quill.register("modules/videoHandler", VideoHandler);

var Block = Quill.import("blots/block");
Block.tagName = "DIV";
Quill.register(Block, true);

const DEFAULT_IMAGE_URL =
  "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80";
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
          setTimeout(() => {
            resolve(DEFAULT_IMAGE_URL); // Must resolve as a link to the image
          }, 1000);
          // const fd = new FormData();
          // fd.append("upload_file", file);

          // const xhr = new XMLHttpRequest();
          // xhr.open("POST", `${window.location.pathname}/api/files/add`, true);
          // xhr.onload = () => {
          //   if (xhr.status === 200) {
          //     const response = JSON.parse(xhr.responseText);
          //     resolve(response.file_path); // Must resolve as a link to the image
          //   }
          // };
          // xhr.send(fd);
        });
      },
    },
    videoHandler: {
      upload: (file) => {
        // return a Promise that resolves in a link to the uploaded image
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(DEFAULT_IMAGE_URL); // Must resolve as a link to the image
          }, 1000);
          // const fd = new FormData();
          // fd.append("upload_file", file);

          // const xhr = new XMLHttpRequest();
          // xhr.open("POST", `${window.location.pathname}/api/files/add`, true);
          // xhr.onload = () => {
          //   if (xhr.status === 200) {
          //     const response = JSON.parse(xhr.responseText);
          //     resolve(response.file_path); // Must resolve as a link to the image
          //   }
          // };
          // xhr.send(fd);
        });
      },
    },
  },
  placeholder: "please write something...",
});

document.getElementById("output").onclick = function () {
  console.log(quill.root.innerHTML);
};
