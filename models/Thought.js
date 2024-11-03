// import model and schema using destructuring assignment
const { Schema, model } = require("mongoose");

const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
    },
    createdAt: {
      //mod18 act 28
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    virtuals: {
      //virtuals documentation: set the getter within the schema
      formatCreatedAt: {
        get() {
          return this.createdAt.toLocaleDateString();
        },
      },
      reactionCount: {
        get() {
            return this.reactions.length;
        }
      }
    },
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

// create Thought model based on thoughtSchema
const Thought = model('thought', thoughtSchema);
// export the model
module.exports = Thought;