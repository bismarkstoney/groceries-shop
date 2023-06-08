import multer from 'multer';
import AWS from 'aws-sdk';
import multerS3 from 'multer-s3';
import path from 'path'

// Initialize AWS S3 configuration
const s3=new AWS.S3({
  accessKeyId: process.env.awsaccessKeyId,
  secretAccessKey:process.env.awssecretAccessKey,
  region: process.env.awsregion
});

const upload = multer({
    storage: multerS3({
      s3:s3,
      bucket: 'saveimages',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        const extension = path.extname(file.originalname);
               cb(null, Date.now().toString() + extension);
      }
    })
  });
  
export default upload
