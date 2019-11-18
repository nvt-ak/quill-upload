# quill-upload

A plugin for uploading image, video in Quill 🌇

- 🌟 upload a image, video when it is inserted, and then replace the base64-url with a http-url
- 🌟 preview the image, video which is uploading with a loading animation
- 🌟 when the image, video is uploading, we can keep editing the content including changing the image's or video's position or even delete the image or video.

## Install

```bash
npm install quill-upload --save
```

## Start

```js
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { ImageHandler, VideoHandler } from "quill-upload";

// register quill-upload
Quill.register("modules/imageHandler", ImageHandler);
Quill.register("modules/videoHandler", VideoHandler);

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
