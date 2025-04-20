const express = require("express");
const app = express();
app.use(express.json()); // ✅ This parses JSON body
const db = require("./db");
const bodyParser = require("body-parser");
const personRoutes = require("./router/personRoutes");
const menuRoutes = require("./router/menuRoutes");
const passport = require('./auth') 
app.use(bodyParser.json());


// middleware function 
const logRequest = (req,res,next) =>{
// console.log(`${new Date().toLocaleString()} request made to: ${req.originalUrl}`);
next(); // callback that signals to express that the current middleware function has completed its time to move on next middleware function.  
}

 // this will use middleware for all routes,
 // (middlewares - logging,authentication checks and modifying request data)
app.use(logRequest); 

// initialized passport 
app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local',{session:false})

app.get("/" ,(req, res) => {
  res.send("Hello user");
});

app.use("/person",localAuthMiddleware, personRoutes);
app.use("/menu", menuRoutes);

app.listen(3000, () => {
  console.log("server listen to port 3000");
});
