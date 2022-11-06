const express = require('express');
const { connectToDatabase } = require('./middleware/db');
const signup = require('./controllers/signup')
const login = require('./controllers/login')
const bodyParser = require("body-parser");
const article = require('./routes/article');

require('dotenv').config()

const PORT= process.env.PORT
const app= express();
connectToDatabase()

// app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use('/signup', signup)
app.use('/login', login)
app.use('/article', article)



app.get('/',(req, res) => {
    console.log("Welcome to the Smite Blog")
    return res.json({status:true })
})




app.listen(PORT, () => {
    console.log(`Server started successfully and listening on http://localhost:${PORT}`)
})


