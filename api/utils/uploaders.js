import multer from 'multer';

export function regUploader(){
  return multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 52428800 },
  }).single('register')
}

export function zipUploader(){
  return multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 52428800 }
  }).single('zip')
}
