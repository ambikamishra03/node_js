const fs= require('fs');
const fsPromises = require('fs').promises;

// it will create a file if not existed and write the data string in that file
// fs.appendFile("greet.txt","hello ambika",() =>{
//     console.log('file working');
// })


// fs.close() method 
// file_descriptor = fs.openSync("greet.txt");
// console.log(file_descriptor);

// fs.close(file_descriptor,(err) =>{
//    if(err) {
// console.log(err);

//    }else{
//       console.log("file closed successfully!");
      
//    }
// })

// used to create a readable stream

// reader = fs.createReadStream("greet.txt") 
// console.log(reader); // will print large data

// reader.on('data', (chunk) =>{
//   console.log(chunk.toString()); // will print content in that file
// })


// used to create a writable stream for writing data to a file without loading it into memory
// let writter = fs.createWriteStream('hello.txt');
// writter.write('hi user')





// read file using file descriptor
// const buffer = new Buffer.alloc(1024);

// fs.open('hello.txt', 'r+', function (err, fd) {
//     if (err) {
//         return console.error(err);
//     }

//     console.log("Reading the file");

//     fs.read(fd, buffer, 0, buffer.length,
//         0, function (err, bytes) {
//             if (err) {
//                 console.log(err);
//             }

//             if (bytes > 0) {
//                 console.log(buffer.
//                     slice(0, bytes).toString());
//             }
//             console.log(bytes + " bytes read");

//             // Close the opened file.
//             fs.close(fd, function (err) {
//                 if (err) {
//                     console.log(err);
//                 }

//                 console.log("File closed successfully");
//             });
//         });
// });

// readfile function - fundamental tool for reading data from files asynchronously.
// non blocking asynchronous way
// fs.readFile('hello.txt',(err,chunk) =>{
// if(err){
//     console.log(err); 
// }else{
//     console.log(chunk.toString());  
// }
// })

//we can synchronously read files,we are telling node.js to block
// other parallel processes and do the current file reading process.
// const data = fs.readFileSync('./hello.txt', { encoding: 'utf8', flag: 'r' })
//    console.log(data);
    
// change the size of the file 
// fs.truncate('./hello.txt',0,() =>{
//     console.log("file content deleted");
// });

// fs.truncate('./hello.txt',3,() =>{
//     console.log("file length is 3");
// });

// fs.open('hello.txt',"a",(err,fd) =>{
//  if(err){
//     console.log(err);   
//  }else{
//     fs.write(fd,"hello user! how are you",(err,bytes)=>{
//       if(err)  console.log(err);
//        console.log(bytes + " bytes written");
        
//      })
//  }
// })

/*
MODES OF WRITTING/READING DATA INTO FILE
"r" → Read-only mode (file must exist).
"w" → Write mode (creates the file if it doesn’t exist, overwrites if it does).
"a" → Append mode (creates file if it doesn’t exist, appends otherwise).
"r+" → Read and write mode (file must exist).
"w+" → Read and write mode (creates file, truncates if it exists).
"a+" → Read and append mode (creates file if it doesn’t exist).
*/

// remove previous content from file
// fs.writeFile('hello.txt',"HELLO USER",(err)=>{
//  if(err) console.log(err.message); 
//  console.log("data writen successfully");
 
// })

// fsPromises.readFile('greet.txt')
// .then((res) =>{
//    console.log(res.toString()); 
// }).catch((err) =>{
//    console.log(err.message);
   
// })
// console.log("i will be printed first as promise will take some time to resolve");

// by default overwrite
// fs.copyFile('hello.txt','new.txt',(err) =>{
//     if (err) {
//         console.log("Error Found:", err);
//     }
//     else {

//         // Get the current filenames
//         // after the function
//         console.log("\nFile Contents of copied_file:",
//             fs.readFileSync("new.txt", "utf8"));
//     }
   
// });



// rename
// fs.rename('new.txt','copiedfile.txt',(err) =>{
//     if(err) console.log(err.message);
//     console.log("file renamed");
    
// })