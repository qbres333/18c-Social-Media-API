// import mongoose ODM library using destructuring assignment
const { connect, connection } = require('mongoose');

// establish connection to mongo database
connect("mongodb://127.0.0.1:27017/videosAndResponses");

// export the connection object
module.exports = connection;