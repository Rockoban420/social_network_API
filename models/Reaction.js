const { Schema, model } = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      // default value is set to a new ObjectId
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
    // use Moment.js to format createdAt data
    createdAt: {
      type: Date,
      default: Date.now,
      // use a getter method to format the timestamp on query
      get: (createdAtVal) => moment(createdAtVal).format('MMM Do, YYYY [at] hh:mm a'),
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;
