const { Schema, model } = require('mongoose');

// Schema to create Post model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            // use regex to validate correct email format
            match: [/.+@.+\..+/, 'Must match an email address!']
        },
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        thoughts: [
            {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});


// Initialize our Post model
const User = model('user', userSchema);

module.exports = User;