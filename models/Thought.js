const { Schema, model } = require('mongoose');

// Schema to create Post model
const thoughtSchema = new Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Reaction',
      },
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
const Thought = model('though', thoughtSchema);

module.exports = Thought;
