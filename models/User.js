// import model and schema using destructuring assignment
const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

// schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      max_length: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        //Mongoose validation docs
        validator: () => Promise.resolve(false),
        message: "Invalid email address",
      },
    },
    thoughts: [thoughtSchema],
    friends: [userSchema], //self-reference
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

// create User model based on userSchema
const User = model('user', userSchema);
// export the model
module.exports = User;