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
        //use regex to validate email: , characters between the @ and . , then at least 2 characters after the .
        /** user part of email: [w-\.]+  //at least 1 word character (incl. hyphen, period) before the @
         * email domain (grouped in () to match domains & subdomains (@jo.msn.org) between the @ and period): ([\w-]+\.)+
         * top-level domain: [\w-]{2,}  //at least 2 characters (incl. hyphen) after the domain/subdomain
         */
        validator: function (v) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/;
        },
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
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

// friendCount virtual
userSchema.virtual("friendCount").get(function() {
    return this.friends.length;
})

// create User model based on userSchema
const User = model('user', userSchema);
// export the model
module.exports = User;