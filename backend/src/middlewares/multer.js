const multer = require('multer');
const path = require("path");

// Cấu hình nơi lưu trữ file
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.join(__dirname, '../uploads'));  // Đường dẫn thư mục lưu ảnh
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);  // Đặt tên file
//     }
// });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  });

exports.upload = multer({ storage: storage });

