const multer = require('multer');
const path = require('path');

//loaction where to upload the file
// as the s3 or  cloud store is not provided uplaoding loaclay to uplaod folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

//checking the file is in correct formate
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|pdf|doc|docx/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'));
  }
};

//file size to 5 MB
//uplaod file middleware
const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

module.exports = upload;