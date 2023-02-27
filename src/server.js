import express from "express";
import configViewEngine from "./configs/viewEngine";
import connection from './configs/connectDB';
require('dotenv').config()
import initWebRoute from "./route/web";
import initAPIRoute from './route/api'
var morgan = require('morgan')
const app = express();
const port = process.env.PORT || 3000;

// ghi lại lịch sử truy cập người dùng
app.use(morgan('combined'))

app.use((req,res,next)=>{
  console.log(req.method);
  //không sử lý gì thì next cho đi tiếp
  next();
})
// hỗ trợ gửi data không có request sẽ không gửi đc
app.use(express.urlencoded({extended:true}));
app.use(express.json());


configViewEngine(app);

//route
initWebRoute(app);

initAPIRoute(app);

//handle 404 not found
//middewal chạy từ trên xuống dưới lên phải viết đúng trình tự
app.use((req,res)=>{
  return res.render('404.ejs');
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})