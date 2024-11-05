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

    // delete the user/thought collections if they exist
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if(userCheck.length) {
        await connection.dropCollection('users');
    };

    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if(thoughtCheck.length) {
        await connection.dropCollection('thoughts');
    };

    // create an empty array to store user data
    const users = [];

    // loop 5 times to randomly assign data to users
    for (let i = 0; i < 5; i++) {
        const thoughts = getRandomThought(2); //randomly assign 2 thoughts
        const reactions = getRandomReaction(2); //randomly assign 2 reactions
        const username = getRandomUser();
        const email = getRandomEmail();
        // push the values into the array
        users.push({ username, email, thoughts, reactions });
    };

    // add users to the collection
    const userData = await User.create(users);
    // log the data to show the data seeded to the database
    console.table(users);
    console.info('Seeding complete!');
    process.exit(0);

});
