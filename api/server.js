const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config()
const Todo = require('./models/Todo');

const app = express();
app.use(express.json())
app.use(cors());

const port = 4001;

app.listen(port , () => console.log(`Server is running at port ${port}`))

const connectionString = process.env.MONGO_URI;
mongoose.connect(connectionString).then(() => console.log('Connect to the database')).catch((err) => console.error('Connection error', err));

app.get('/todo', async(req,res) => {
    const todos = await Todo.find();
    res.json(todos);
})

app.post('/todo/new', async(req,res) => {
    const newTask = await Todo.create(req.body);
    res.status(200).json({newTask});
})

app.get('/todo/:id', async(req, res) => {
    const task = await Todo.findById(req.params.id);
    res.json(task);
})

app.put('/todo/update/:id', async(req, res) => {
   const taskId = req.params.id;
   const updated = await Todo.updateOne({ _id: taskId }, req.body);
   res.json({status: "success"});
})

app.delete('/todo/delete/:id', async(req,res) => {
    const result = await Todo.findByIdAndDelete(req.params.id)
    res.json({data: result, status: "success"});
})