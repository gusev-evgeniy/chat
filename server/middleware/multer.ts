import multer from 'multer';
import { v4 as uuidv4 } from 'uuid'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './static/');
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName);
  },
});

// определение фильтра
const fileFilter = (req, { mimetype }, cb) => {
  const validTypes = ['image/png', 'image/jpg', 'image/jpeg'];
  if (validTypes.includes(mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
  }
};

export default multer({ storage, fileFilter });