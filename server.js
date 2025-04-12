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

// body parser = middleware library for express.js
// client sends data to server in form of JSON, form data or url-encoded data.
// used to parse and extract the body of incoming http request 
// it gives us data in form which we needed.
// eg: bodyParser.json() automatically parses json data from request body and convert it 
// into javascript object, which is then stored in req.body 


const express = require('express');
const app = express();
app.use(express.json());  // ✅ This parses JSON body

const db = require('./db');
const Person = require('./models/person');
const bodyParser = require('body-parser');
 app.use(bodyParser.json());



// get method used to request data from server
app.get('/',(req,res) =>{
res.send("Hello user");
})

app.post('/person', (req, res) => {
    const data = req.body;
    const newPerson = new Person(data);

    newPerson.save()
        .then(person => {
            console.log('Data saved');
            res.status(200).json(person);
        })
        .catch(error => {
            console.error('Error saving person', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});


app.listen(3000,() =>{
    console.log('server listen to port 3000'); 
});
