import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';
import fs from 'fs';

export const prepareImage = (req: Request) => {
  if (!req.file) {
    return;
  }
  
  const url = req.protocol + '://' + req.get('host');
  const filePath = req.file.path;
  const fileName = uuidv4() + '-' + req.file?.filename.replace('.png', '.jpeg');

  sharp(filePath)
    .resize(150, 150)
    .toFormat('jpeg')
    .toFile(req.file.destination + fileName, err => {
      if (err) {
        throw err;
      }

      fs.unlinkSync(filePath);
    });

  return url + '/public/' + fileName;
};
