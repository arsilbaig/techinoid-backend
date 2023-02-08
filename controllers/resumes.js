const util = require("util");
const multer = require("multer");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}-${Date.now()}.pdf`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/docx" || file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF and DOCX files are allowed"), false);
  }
};

let uploadFile = multer({
  storage: storage,
  fileFilter: fileFilter,
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
