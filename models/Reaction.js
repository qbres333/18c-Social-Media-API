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
      get: formatDate
    },
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
}


module.exports = reactionSchema;

 