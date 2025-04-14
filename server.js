const express = require("express");
const app = express();
app.use(express.json()); // ✅ This parses JSON body
const db = require("./db");
const bodyParser = require("body-parser");
const personRoutes = require("./router/personRoutes");
const menuRoutes = require("./router/menuRoutes");
const passport = require('passport')  // authentication middleware
const localStrategy = require('passport-local').Strategy;
const Person = require('./models/person')
app.use(bodyParser.json());


// middleware function 
const logRequest = (req,res,next) =>{
console.log(`${new Date().toLocaleString()} request made to: ${req.originalUrl}`);
next(); // callback that signals to express that the current middleware function has completed its time to move on next middleware function.  
}

app.use(logRequest);

// authentication
passport.use(new localStrategy(async (USERNAME, password,done) =>{
  try{
    console.log('Recieved credentials',USERNAME,password);
    const user = await Person.findOne({username:USERNAME});
    if(!user){
      return done(null, false,{message: 'Incorrect username'});
    }
    const isPswrdMatch = user.password === password ? true: false;
    if(isPswrdMatch){
      return done(null,user);
    }else{
      return done(null,false,{message: 'Incorrect password'});
    }
  }catch(err){
     return done(err);
  }
}))
app.use(passport.initialize());

// get method used to request data from server
const localAuthMiddleware = passport.authenticate('local',{session:false})
app.get("/" ,localAuthMiddleware,(req, res) => {
  res.send("Hello user");
});

app.use("/person", personRoutes);
app.use("/menu",localAuthMiddleware, menuRoutes);

app.listen(3000, () => {
  console.log("server listen to port 3000");
});
