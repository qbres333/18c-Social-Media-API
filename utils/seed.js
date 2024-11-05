// database connection
const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomUser,
  getRandomEmail,
  getRandomThought,
  getRandomReaction} = require('./data');

// show the error if there is a connection error
connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('Connected');

    // delete the collections if they exist
    
})