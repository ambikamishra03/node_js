const express = require("express");
const Person = require("../models/person");
const router = express.Router();
const { jwtAuthMiddleware, generateToken } = require('./../jwt');

router.get("/",jwtAuthMiddleware, async (req, res) => {
  try {
    const data = await Person.find();
    console.log("person data fetched successfully");
    res.status(200).json(data);
  } catch (error) {
    console.log("error while fetching person data", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// signup router
router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);

    const response = await newPerson.save();
    // console.log("Data saved");
    const payload = {
      id:response.id,
      username:response.username
    }
    console.log(payload);
    // token has 3 parts - headers, payload and signature
    const token = generateToken(payload);
    // console.log("token: ",token);
    
    res.status(200).json({response: response,token:token});
  } catch (error) {
    console.error("Error saving person", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// login router

router.post('/login',async (req,res) =>{
  try {
    // extract username and password from request body
     const {username, password} = req.body;
     const user = await Person.findOne({username:username});
     if(!user || !(await user.comparePassword(password))){
      return res.status(401).json({error:"invalid username or password"})
     }
     const payload = {
      id : user.id,
      username: user.username
     }
     const token = generateToken(payload);
      res.json({token});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
})


// profile routes 
router.get('/profile',async (req,res) =>{
   try {
    const userData = req.user;
    console.log(userData);
    const userId = userData.id;
    const user = await Person.findById(userId);
    res.status(200).json({user});
   } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
   }
})
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "invalid work type" });
    }
  } catch (error) {
    console.log("Error while fetching person data", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;
    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true, // Return the updated document
        runValidators: true, // Run mongoose validation
      }
    );
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("data updated with id - ", personId);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("data deleted with id - ", personId);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

module.exports = router;
