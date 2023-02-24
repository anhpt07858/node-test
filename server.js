const http = require('http');

const server = http.createServer((req,res)=>{
    console.log('run request...')
    res.setHeader('content-Type','text/html');
    res.write('<h3>Hello world</h3>');
    res.write('<h2>from to Phan Tuan Anh</h2>');
})

server.listen(3000,'localhost',()=>{
    console.log('Note.JS server is runing on port:3000');
})