const mongoose = require('mongoose');
require('dotenv').config();


const DATABASE = process.env.DATABASE;

function connectToDatabase() {
    mongoose.connect(DATABASE);
    mongoose.connection.on('connected', () => {
        console.log('Connected to the database successfully');
    });
    
    mongoose.connection.on('error', (err) => {
        console.log('Error connecting to the database', err);
    })
}

module.exports ={ connectToDatabase }