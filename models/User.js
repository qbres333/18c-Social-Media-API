// import model and schema using destructuring assignment
const { Schema, model } = require('mongoose');

// const thoughtSchema = require('./Thought');

// schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
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
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user", //self-reference
      },
    ],
  },
  {
    virtuals: {
        friendCount: {
            get() {
                return this.friends.length;
            }
        }
    }
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

// create User model based on userSchema
const User = model('user', userSchema);
// export the model
module.exports = User;