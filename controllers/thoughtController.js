const { Thought, User } = require('../models');

module.exports = {

  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.status(200).json(thoughts);
    } catch (err) {
      console.log(err);
      res.status(500).json('Error getting thoughts: ', err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId }).exec();

      if (!thought) {
        return res.status(404).json('No thought with that ID' );
      }
      // !thought
      //   ? res.status(404).json('No thought with that ID' )
      //   : res.status(200).json(post);
      res.status(200).json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json('Error getting this thought: ', err);
    }
  },
  // create a new post
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        {
          _id: req.body.userId,
        },
        {
          $push: { thoughts: thought._id },
        }
      );
      !thought
        ? res.status(404).json('Thought creation unsucessfull. Text and Username Required' )
        : res.status(200).json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json('Error creating thought: ', err);
    }
  },

  async updateThought(req, res) {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        req.body,
        { new: true }
      );
      !updatedThought
        ? res.status(404).json('No thought with that ID' )
        : res.status(200).json(updatedThought);
    } catch (err) {
      console.log(err);
      res.status(500).json('Error updating thought: ', err);
    }
  },

  async deleteThought(req, res) {
    try {
      const deletedThought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
      !deletedThought
        ? res.status(404).json('No thought with that ID' )
        : res.status(200).json(deletedThought);
    } catch (err) {
      console.log(err);
      res.status(500).json('Error deleting thought: ', err);
    }
  },

  async addReaction(req, res) {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { new: true }
      );
      // !updatedThought
      //   ? res.status(404).json('No thought with that ID' )
      //   : res.status(200).json(updatedThought);
      res.status(200).json(updatedThought);
    } catch (err) {
      console.log(err);
      res.status(500).json('Error adding reaction: ', err);
    }
  },

  async deleteReaction(req, res) {
    try {
      const updatedThought2 = await Thought.findOneAndUpdate(
        { 'reactions._id': req.params.reactionId },
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { new: true }
      );
      // !updatedThought
      //   ? res.status(404).json('No thought with that ID' )
      //   : res.status(200).json(updatedThought);
      res.status(200).json(updatedThought2);
    } catch (err) {
      console.log(err);
      res.status(500).json('Error deleting reaction: ', err);
    }
  }
};
