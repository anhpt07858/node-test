import pool from '../configs/connectDB';
import multer from 'multer';
import path from 'path';
let getHomepage = async(rep,res) =>{

   
        const [rows, fields] = await pool.execute('SELECT * FROM `user`');
        
        return res.render('index.ejs',{dataUser: rows  });
        
}

let getDetailPage = async(req,res) => {
   //console.log('hwwll', req.params)

  let userId = req.params.userId;
  let [user] = await pool.execute('select * from `user` where `id` = ?',[userId]);
  //console.log(userId)
  return res.send(JSON.stringify(user))
}

let creatNewUser = async(req,res) => {
    console.log('check req:',req.body);

  let { firsName, lastName, email , address} = req.body;
    await pool.execute('insert into user(firsName,lastName,email,address) values (?,?,?,?)',
    [firsName,lastName,email,address]);
    return res.redirect('/');
}

let editUser = async(req,res) => {

  let id = req.params.userId;
  let [user] = await pool.execute('select * from user where id = ?',[id]);
  return res.render(`updateUser.ejs`,{dataUser: user[0]});
}

let updateUser = async(req,res) => {
  let { firsName, lastName, email , address,id} = req.body;
  await pool.execute('update user set firsName =?, lastName=?,email=?,address=? where  id =?',
  [firsName, lastName, email , address,id]);

  return res.redirect('/');
}


let deleteUser = async(req,res) =>{

  let userId = req.params.userId;
  await pool.execute('DELETE FROM user where id = ?',[userId]);

  return res.redirect('/');
}

let getUploadFilePage = async (req,res) => {
  return res.render('uploadFile.ejs')
}


const upload = multer().single('profile_pic');


let handleUploadFile = async (req,res) =>
{
  
console.log(req.file)
  upload(req, res, function(err) {
      // req.file contains information of uploaded file
      // req.body contains information of text fields, if there were any

      if (req.fileValidationError) {
          return res.send(req.fileValidationError);
      }
      else if (!req.file) {
          return res.send('Please select an image to upload');
      }
      else if (err instanceof multer.MulterError) {
          return res.send(err);
      }
      else if (err) {
        console.log(err)
      }

      // Display uploaded image for user validation
      res.send(`You have uploaded this image: <hr/><img src="/images/${req.file.filename}" width="500"><hr /><a href="./upload">Upload another image</a>`);
  });
}

let handleUploadMultipleFiles = async (req,res) =>
{
  console.log(req.files)
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.files) {
        return res.send('Please select an image to upload');
    }
    

    let result = "You have uploaded these images: <hr />";
    const files = req.files;
    let index, len;

    // Loop through all the uploaded images and display them on frontend
    for (index = 0, len = files.length; index < len; ++index) {
        result += `<img src="/images/${files[index].filename}" width="300" style="margin-right: 20px;">`;
    }
    result += '<hr/><a href="./upload">Upload more images</a>';
    res.send(result);

}



module.exports = {
    getHomepage,
    getDetailPage,
    creatNewUser,
    deleteUser,
    editUser,
    updateUser,
    getUploadFilePage,
    handleUploadFile,
    handleUploadMultipleFiles
}