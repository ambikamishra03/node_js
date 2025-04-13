

const express = require('express');
const app = express();
app.use(express.json());  // ✅ This parses JSON body

const db = require('./db');
const Person = require('./models/person');
const MenuItem = require('./models/menu');
const bodyParser = require('body-parser');
 app.use(bodyParser.json());



// get method used to request data from server
app.get('/',(req,res) =>{
res.send("Hello user");
})


app.get('/person',async (req,res) =>{
    try{
      const data = await Person.find();
      console.log('person data fetched successfully');
      res.status(200).json(data);
    }catch{
        console.log('error while fetching person data');
        res.status(500).json({ error: 'Internal server error' });
    }
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
 

app.get('/menu', async (req,res) =>{
  try {
    const menu = await MenuItem.find();
    console.log('menu data fetched');
    res.status(200).json(menu);
  } catch (error) {
    console.log('Error while fetching menu item');
    res.status(500).json({error:'Internal server error'})
  }
})

app.post('/menu', (req,res) =>{
  const data = req.body;
  const menuItem =  new MenuItem(data);
   menuItem.save().then(menu =>{
      console.log('Menu data saved');
      res.status(200).json(menu);
   }).catch(error => {
    console.error('Error saving person', error);
    res.status(500).json({ error: 'Internal server error' });
});
})

app.listen(3000,() =>{
    console.log('server listen to port 3000'); 
});
