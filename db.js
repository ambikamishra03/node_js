const mongoose = require('mongoose')

// define the mongoDB connection url

const mongoUrl = 'mongodb://localhost:27017/hotels'

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology:true
})

const db = mongoose.connection; // this object is what we will use to handle events and interact with database.
db.on('connected',()=>{
    console.log('connected to mongoDB server');
})

db.on('error',()=>{
    console.log('MongoDB connection error');
})

db.on('disconnected',()=>{
    console.log('Disconnected to mongoDB server');
})

module.exports = db;