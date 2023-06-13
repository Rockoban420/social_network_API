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
      type: String,
      default: Date(),
      // use a getter method to format the timestamp on query
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
      type: String,
      default: Date(),
      // use a getter method to format the timestamp on query
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


// Initialize our Post model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
