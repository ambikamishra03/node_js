const http = require('http')
const port =8080;
const server = http.createServer((req,res) =>{
   res.write('hello world!!!!!');
   res.end();
})
// http://127.0.0.1:8080/      go to this , it will show hello world

// server communicates to clients (bring data frm db and provide to client)
//  server -computer program that is responsible for preparing and 
// delivering data to other computers(web pages,images,videos etc)
server.listen(port,(err)=>{
    if(err) console.log(err.message);  
    console.log(`listening to port ${port}`);   
})
 