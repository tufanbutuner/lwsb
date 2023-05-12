require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connectionString = process.env.DATABASE_URL;

mongoose.connect(connectionString);
const db = mongoose.connection;

db.on('error', err => console.log(err));
db.once('connected', () => console.log('Connected to database'));

const Model = require('./models/model');

const port = 9000;
const app = express();
app.use(express.json());

app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})

app.get('/api/', (req, res) => {
    res.send("Hello world!");
})

app.get('/api/post/:id', (req, res) => {
    res.send(req.params.id);
})

app.get('/api/getAllUsers/', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data);
    }
    catch(error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/api/user/', (req, res) => {
    const data = new Model({
        name: req.body.name,
        username: req.body.username
    })

    try {
        const dataToSave = data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})