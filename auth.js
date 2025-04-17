const passport = require('passport')  // authentication middleware
const localStrategy = require('passport-local').Strategy;
const Person = require('./models/person')


// authentication(passport.js is middleware add authentication related functionality)
passport.use(new localStrategy(async (USERNAME, password,done) =>{
    try{ 
      console.log('Recieved credentials',USERNAME,password);
      const user = await Person.findOne({username:USERNAME});
      if(!user){
        return done(null, false,{message: 'Incorrect username'});
        // done(error, user, info) 
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

  module.exports = passport;