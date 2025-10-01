const Quill = require("quill");
const ImageKit = require("imagekit");
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

var imagekit = new ImageKit({
  privateKey: "private_JGEF7P/FLHhcDwAgcHkk6gwN4ls=",
  publicKey: "public_J+oJUIpERZKorlTJdJs/8uhugl4=",
  urlEndpoint: "https://ik.imagekit.io/jq3pmfklv",
  authenticationEndpoint: "http://localhost:3000/auth",
});

// Upload handler function
const _onUpload = async function (file, resolve) {
  try {
    imagekit.upload(
      {
        file: file,
        fileName: "abc1.jpg",
        tags: ["tag1"],
      },
      function (err, result) {
        console.log("upload success", result.url);

        resolve(result.url);
      }
    );
  } catch (error) {
    console.error("Upload error:", error);
    resolve("https://placehold.co/300x200/FEE/C33?text=Upload+Failed");
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
        imageClass: "custom-image-class",
        // Optional: Configure placeholder images (using placehold.co as an example)
        placeholderImageUploading:
          "https://placehold.co/100x100/EEE/999?text=Uploading...",
        placeholderImageError:
          "https://placehold.co/300x200/FEE/C33?text=Upload+Failed",
        upload: (file) => {
          return new Promise((resolve) => {
            if (file.size > 10 * 1024 * 1024) {
              console.warn("File too large:", file.name);
              resolve(
                "https://placehold.co/300x200/FEE/C33?text=File+Too+Large"
              );
              return;
            }
            _onUpload(file, resolve);
          });
        },
      },
      videoHandler: {
        // Optional: Configure placeholder images
        placeholderImageUploading:
          "https://placehold.co/100x100/EEE/999?text=Uploading...",
        placeholderImageError:
          "https://placehold.co/300x200/FEE/C33?text=Upload+Failed",
        upload: (file) => {
          return new Promise((resolve) => {
            if (file.size > 50 * 1024 * 1024) {
              console.warn("File too large:", file.name);
              resolve(
                "https://placehold.co/300x200/FEE/C33?text=File+Too+Large"
              );
              return;
            }
            _onUpload(file, resolve);
          });
        },
      },
      attachmentHandler: {
        // Optional: Configure placeholder images
        placeholderImageUploading:
          "https://placehold.co/100x100/EEE/999?text=Uploading...",
        placeholderImageError:
          "https://placehold.co/300x200/FEE/C33?text=Upload+Failed",
        upload: (file) => {
          return new Promise((resolve) => {
            if (file.size > 20 * 1024 * 1024) {
              console.warn("File too large:", file.name);
              resolve(
                "https://placehold.co/300x200/FEE/C33?text=File+Too+Large"
              );
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
