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
      get: formatDate
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

//function to formate date (MDN docs: Intl.DateTimeFormat)
function formatDate(date) {
    const options = {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZoneName: 'short'
    };

    const newDate = new Intl.DateTimeFormat('en-US', options).format(date);
    const dateString = newDate.substring(0, newDate.lastIndexOf(','));
    const timeString = newDate.substring(newDate.lastIndexOf(",") + 2);
    return `${dateString} at ${timeString}`;
};

// reactionCount virtual
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});


// create Thought model based on thoughtSchema
const Thought = model("thought", thoughtSchema);

// export the model
module.exports = Thought;