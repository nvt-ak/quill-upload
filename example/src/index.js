const Quill = require("quill");
require("quill/dist/quill.snow.css");
const {
  ImageHandler,
  VideoHandler,
  AttachmentHandler,
} = require("quill-upload");

// Register modules
Quill.register("modules/imageHandler", ImageHandler);
Quill.register("modules/videoHandler", VideoHandler);
Quill.register("modules/attachmentHandler", AttachmentHandler);

// Configure Block for Quill
var Block = Quill.import("blots/block");
Block.tagName = "DIV";
Quill.register(Block, true);

// Upload handler function
const _onUpload = async function (file, resolve) {
  try {
    const formData = new FormData();
    formData.append("image", file);
    // Thay YOUR_API_KEY bằng API key của bạn từ imgbb.com
    formData.append("key", "357bc59cbf76e5423ce7513e668acc09");

    const response = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    const result = await response.json();
    if (result.data && result.data.url) {
      resolve(result.data.url);
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Upload error:", error);
    resolve("https://via.placeholder.com/300?text=Upload+Failed");
  }
};

// Initialize Quill
document.addEventListener("DOMContentLoaded", () => {
  const quill = new Quill("#editor", {
    theme: "snow",
    modules: {
      toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline"],
        ["image", "video", "attachment"],
      ],
      imageHandler: {
        upload: (file) => {
          return new Promise((resolve) => {
            if (file.size > 10 * 1024 * 1024) {
              console.warn("File too large:", file.name);
              resolve("https://via.placeholder.com/300?text=File+Too+Large");
              return;
            }
            _onUpload(file, resolve);
          });
        },
      },
      videoHandler: {
        upload: (file) => {
          return new Promise((resolve) => {
            if (file.size > 50 * 1024 * 1024) {
              console.warn("File too large:", file.name);
              resolve("https://via.placeholder.com/300?text=File+Too+Large");
              return;
            }
            _onUpload(file, resolve);
          });
        },
      },
      attachmentHandler: {
        upload: (file) => {
          return new Promise((resolve) => {
            if (file.size > 20 * 1024 * 1024) {
              console.warn("File too large:", file.name);
              resolve("https://via.placeholder.com/300?text=File+Too+Large");
              return;
            }
            _onUpload(file, resolve);
          });
        },
      },
    },
  });

  // Add output button handler
  document.getElementById("output")?.addEventListener("click", () => {
    console.log(quill.root.innerHTML);
  });
});
