//import
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const bodyParser = require('body-parser')
const Student  = require('./models/Students')
const app = express();
//dbconnection
mongoose.Promise = global.Promise
mongoose.connect('mondodb://localhost:27017/students')
mongoose.connection.on('connected',()=>{
    console.log('database is connecte');
})
mongoose.connection.on('error',()=>{
    console.log('error');
})
//middlewares
app.use(cors())
app.use(express.json())

//routes

app.get('/',(req,res)=>{
    Student.find()
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).json({msg:"successfully getdata"})
    })
    .catch(error=>{
        console.log(error);
        res.status(500).json({msg:"error occure in getting data"})
        
    })
})

app.post('/students',(req,res)=>{

    console.log(req.body.firstname);
    console.log(req.body.lastname);
    console.log(req.body.place);
    const student  = new Student({
        _id: new mongoose.Schema.Types.ObjectId,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        place:  req.body.place
    })
    student.save()
    .then(result=>{
        console.log(result);
        res.status(200).json({msg:"successfully submited"})
    })
    .catch(error=>{
        console.log(error);
        res.status(500).json({msg:"error occure"})
        
    })
    res.send('Ok')
})

//server

app.listen(5000,()=>{
    console.log('server run on 5000');
})