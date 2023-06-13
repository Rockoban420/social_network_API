const { Schema, model } = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema(
  {
    reactionId: {
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
    // use Moment.js to format createdAt data
    createdAt: {
      type: Date,
      default: Date.now,
      // use a getter method to format the timestamp on query
      get: (createdAt) => moment(createdAt).format('MMM Do, YYYY [at] hh:mm a'),
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const thoughtSchema = new Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now,
      // use a getter method to format the timestamp on query
      get: (createdAt) => moment(createdAt).format('MMM Do, YYYY [at] hh:mm a'),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [
      reactionSchema,
    ],
    text: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

thoughtSchema.virtual('timeFormat').get(function () {
  return moment(this.createdAt).format('MMM Do, YYYY [at] hh:mm a');
});


// Initialize our Post model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
