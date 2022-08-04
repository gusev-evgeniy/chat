import multer from 'multer';
import { v4 as uuidv4 } from 'uuid'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/');
  },
  filename: (req, file, cb) => {
    console.log('file', file)
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, uuidv4() + '-' + fileName);
  },
});
// определение фильтра
const fileFilter = (req, { mimetype }, cb) => {
  console.log('req', req)
  console.log('mimetype', mimetype)
  const validTypes = ['image/png', 'image/jpg', 'image/jpeg'];
  console.log('mimetype', mimetype);
  if (validTypes.includes(mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
  }
};

export default multer({ storage, fileFilter });