Want to show me some ❤️ for the hard work I do on this library? You can use the following PayPal link: [https://paypal.me/nvtit93](https://paypal.me/nvtit93). Any amount is welcome and let me tell you it feels good to be appreciated. Even a dollar makes me super excited about all of this.

# quill-upload

A plugin for uploading image, video, attachment in Quill 🌇

- 🌟 upload a image, video, attachment when it is inserted, and then replace the base64-url with a http-url
- 🌟 preview the image, video, attachment which is uploading with a loading animation
- 🌟 when the image, video, attachment is uploading, we can keep editing the content including changing the image's, video's or attachment's position or even delete the image, video or attachment.

## Install

```bash
npm install quill-upload --save
```

## Start

```js
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
        imageClass: "custom-image-class",
        // Optional: Configure placeholder images
        placeholderImageUploading: "/assets/uploading-placeholder.png", // Default: inline SVG
        placeholderImageError: "/assets/error-placeholder.png", // Default: inline SVG
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

```

## Configuration Options

### Placeholder Images

You can customize the placeholder images shown during upload and on error:

```js
{
  placeholderImageUploading: "/assets/uploading-placeholder.png",  // Image shown while uploading
  placeholderImageError: "/assets/error-placeholder.png",          // Image shown on upload error
  imageClass: "custom-image-class",                                // Custom CSS class for images
  upload: (file) => { /* ... */ }
}
```

**Default values**: If not specified, the module uses inline SVG placeholders that work out of the box:
- `placeholderImageUploading`: Gray box with "Uploading..." text
- `placeholderImageError`: Red box with "Upload Failed" text

**Note**: The old `https://via.placeholder.com/` service no longer works, so custom placeholders or the provided defaults are recommended.

### Image Handler Options
- `imageClass` (string, optional): Custom CSS class to apply to uploaded images
- `placeholderImageUploading` (string, optional): URL or data URI for the uploading placeholder
- `placeholderImageError` (string, optional): URL or data URI for the error placeholder
- `upload` (function, required): Function that returns a Promise resolving to the uploaded file URL

### Video Handler Options
- `placeholderImageUploading` (string, optional): URL or data URI for the uploading placeholder
- `placeholderImageError` (string, optional): URL or data URI for the error placeholder
- `upload` (function, required): Function that returns a Promise resolving to the uploaded file URL

### Attachment Handler Options
- `placeholderImageUploading` (string, optional): URL or data URI for the uploading placeholder
- `placeholderImageError` (string, optional): URL or data URI for the error placeholder
- `upload` (function, required): Function that returns a Promise resolving to the uploaded file URL

## Example

```bash
cd example
npm install
npm start
```
