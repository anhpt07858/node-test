import express from 'express';
import homeController from '../controller/homeController';
import multer from 'multer';
import path from 'path';
var appRoot = require('app-root-path');
let router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        
        cb(null, appRoot + "/note-test/src/public/images/");
    },
  
    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  

  const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  };
  
  let upload = multer({storage: storage,fileFilter:imageFilter});
  let upload1 = multer({storage: storage,fileFilter:imageFilter}).array('multiple_images', 10);
const initWebRoute = (app) => {

    router.get('/',homeController.getHomepage );
    router.get('/detail/user/:userId',homeController.getDetailPage);

    router.post('/create-new-user',homeController.creatNewUser);
    router.get('/edit/user/:userId',homeController.editUser);
    router.post('/updete-user/',homeController.updateUser);
    router.get('/delete/user/:userId',homeController.deleteUser);
    
    // router.get('/about', (req, res) => {
    //     res.send('Phan Tuan Anh')
    //   })

    router.get('/upload',homeController.getUploadFilePage);
    router.post('/upload-profile-pic',upload.single('profile_pic'),homeController.handleUploadFile);

    router.post('/upload-multiple-images',(req,res,next)=>{
        upload1(req,res,(err)=>{
            if(err instanceof multer.MulterError && err.code === "LIMIT_UNEXPECTED_FILE"){
                res.send('LIMIT_UNEXPECTED_FILE')
    
            }else if(err){
                res.send(err )
            }
            else{
                next();
            }
        })
    },homeController.handleUploadMultipleFiles);
       return app.use('/',router)
}

export default initWebRoute;