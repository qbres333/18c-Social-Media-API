// import schema and types using destructuring assignment
const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      //mod18 act 28
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      //mod18 act 28
      type: Date,
      default: Date.now,
    },
  },
  {
    virtuals: {
      //virtuals documentation: set the getter within the schema
      formatCreatedAt: {
        get() {
          return this.createdAt.toLocaleDateString();
        },
      },
    },
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

module.exports = reactionSchema;