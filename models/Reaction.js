const { Schema, model } = require('mongoose');

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
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;
