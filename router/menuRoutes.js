const express = require('express');
const router = express.Router();
const MenuItem = require('../models/menu')

router.get('/', async (req,res) =>{
  try {
    const menu = await MenuItem.find();
    console.log('menu data fetched');
    res.status(200).json(menu);
  } catch (error) {
    console.log('Error while fetching menu item',error);
    res.status(500).json({error:'Internal server error'})
  }
})

router.post('/', async (req,res) =>{
    try {
    const data = req.body;
    const menuItem =  new MenuItem(data);
    const response = await menuItem.save();
      console.log('Menu data saved');
      res.status(200).json(response);
    } catch (error) {
    console.error('Error saving person', error);
    res.status(500).json({ error: 'Internal server error' });
    } 
})

router.get('/:tasteItem',async (req,res)=>{
try {
    const tasteItem = req.params.tasteItem;
    if(tasteItem == 'sweet' || tasteItem == 'spicy' || tasteItem == 'sour'){
     const response = await MenuItem.find({taste:tasteItem});
     console.log('fetched menuitem according to taste',tasteItem);
     res.status(200).json(response);
    }else{
        console.log('not a valid taste of items');   
    }
} catch (error) {
    console.log('error while fetching menu items',error);
    res.status(500).json({error:'internal server error'})
}
})

module.exports = router;