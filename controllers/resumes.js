const util = require("util");
const multer = require("multer");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname+"/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}-${Date.now()}.pdf`);
  },
});


let uploadFile = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
      cb(null, true);
  }
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;