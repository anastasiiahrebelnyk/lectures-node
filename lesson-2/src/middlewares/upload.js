import createHttpError from 'http-errors';
import multer from 'multer';

const storage = multer.memoryStorage();

const limits = {
  fileSize: 1024 * 1024 * 5,
};

const fileFilter = (req, file, callback) => {
  if (!file.mimetype) {
    return callback(createHttpError(400, 'File corrupted'));
  }
  if (
    !file.mimetype.startsWith('image/') &&
    !file.mimetype.startsWith('video/')
  ) {
    return callback(createHttpError(400, 'Allow file types: image and video'));
  }
  callback(null, true);
};

const upload = multer({
  storage,
  limits,
  fileFilter,
});

export default upload;
