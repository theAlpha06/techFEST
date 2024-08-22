import mv from "mv";
import fs from "fs";
import path from "path";

export default function saveImg(img, filepath, errFn) {
  if (!img) {
    errFn("Image object was undefined");
    return "Invalid";
  }
  if (img.headers["content-type"].substr(0, 6) === "image/") {
    mv(img.path, filepath + path.basename(img.path), errFn);
    return path.basename(img.path);
  } else {
    errFn("Mimetype does not match image/*");
    return "Invalid";
  }
}
