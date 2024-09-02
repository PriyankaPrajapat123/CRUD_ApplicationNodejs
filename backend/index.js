const express = require('express');
const cors = require("cors");
require('./db/config');
const Item = require('./db/Item')
const mongoose= require('mongoose')

const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.post('/add-data', async (req, res) => {
    const { fullName, rollNo, items } = req.body;

    // Check if roll number already exists
    const existingUser = await Item.findOne({ rollNo });
    if (existingUser) {
        return res.status(400).json({ message: 'User with this roll number already exists.' });
    }

    // Create new user
    const newUser = new Item({ fullName, rollNo, items });
    await newUser.save();
    res.status(201).json(newUser);
});

//show list
app.get('/show-list',async(req,resp)=>{
    let items = await Item.find();
    if(items.length>0)
        {
            resp.send(items);
        }
        else{
            resp.send({result:"No items found"})
        }
})
app.delete('/data-delete/:id',async (req,resp)=>{
    const result = await Item.deleteOne({_id:req.params.id})
    resp.send(result)
})

//update data
app.get('/update/:id',async(req,resp)=>{
    let result = await Item.findOne({_id:req.params.id});
    if(result){
        resp.send(result);
    }
    else
    {
        resp.send({result:"No record for update"})
    }

})

app.put("/update/:id",async(req,resp)=>{
    let result = await Item.updateOne(
        {_id:req.params.id},{
            $set:req.body
        }
    )
    resp.send(result)
})
app.listen(5000);