const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

const uploadImage = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "products"
      },
      (error, result) => {
        if (error) { reject(error) }
        resolve(result); 
      }
    );
    streamifier.createReadStream(buffer).pipe(stream)
  });
};

module.exports = uploadImage;