const multer = require("multer");
const path = require("path");

// Define storage for the uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // Directory to save uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to the file name
  },
});

// Define file filter for images
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg", // .jpg, .jpeg
    "image/png", 
    "image/svg", 
    "image/webp", 
    "image/gif",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG, JPG, PNG, and SVG, WEBP, GIF are allowed."));
  }
};

// Create multer instance with the storage and file filter
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
  },
  fileFilter: fileFilter,
});

module.exports = upload;
