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
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { ImageHandler, VideoHandler, AttachmentHandler } from "quill-upload";

// register quill-upload
Quill.register("modules/imageHandler", ImageHandler);
Quill.register("modules/videoHandler", VideoHandler);
Quill.register("modules/attachmentHandler", AttachmentHandler);

new Quill("#editor", {
  theme: "snow",
  modules: {
    toolbar: ["image", "video"],
    imageHandler: {
      upload: file => {
        // return a Promise that resolves in a link to the uploaded image
        return new Promise((resolve, reject) => {
          ajax().then(data => resolve(data.imageUrl));
        });
      }
    },
    videoHandler: {
      upload: file => {
        // return a Promise that resolves in a link to the uploaded image
        return new Promise((resolve, reject) => {
          ajax().then(data => resolve(data.videoUrl));
        });
      }
    },
    attachmentHandler: {
      upload: file => {
        // return a Promise that resolves in a link to the uploaded image
        return new Promise((resolve, reject) => {
          ajax().then(data => resolve(data.attachmentUrl));
        });
      }
    }
  }
});
```

## Example

```bash
cd example
npm install
npm start
```
