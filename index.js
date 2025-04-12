// srver provide data in form of json
// json(javascript object notation) - lightweight, structured and organized data.
//   const jsonString  = '{"name": "Ambika","age": 24,"city":"Deoria"}'
// const jsonObject = JSON.parse(jsonString)    // convert json string to object
// console.log(jsonObject);

// const str = JSON.stringify(jsonObject)    // convert object to json string
// console.log(str);

// console.log(typeof str);
// console.log(typeof jsonObject);



// imagine a menu card in restaurant
// customer - client, waiter - server(expressjs) of restaurant(NodeJS), kitchen room - db, chef - server of kitchen
// collection of all lists(menu card) - api
// option in that list - endpoint


// Nodejs server responsible for handling HTTP request from client and returning responses.
// it process these requests, communicate to db server and sends data to client 


// creating server in NodeJS using express package
// localhost - refers to own computer(house of waiter)
// port number - address of server(room of waiter in that house)

const express = require('express');
const app = express();
const db = require('./mongoose/db');

// get method used to request data from server
app.get('/',(req,res) =>{
res.send("Hello user");
})

app.get('/greet',(req,res) =>{
    res.send("Good morning sir");
})

app.listen(3000,() =>{
    console.log('server listen to port 3000'); 
});