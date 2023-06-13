const { Thought, User } = require('../models');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      console.log(err);
      res.status(500).json('Error getting users: ', err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });
      !user
        ? res.status(404).json({ message: 'No user with that ID' })
        : res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json('Error Finding this user', err);
    }
  },
  // create a new tag
  async createUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      !newUser
        ? res
          .status(404)
          .json({ message: 'User creation unsucessfull. Username and Email Required' })
        : res.status(200).json(newUser);
    } catch (err) {
      console.log(err);
      res.status(500).json('Error creating user: ', err);
    }
  },

  async updateUser(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        req.body,
      );
      !updatedUser
        ? res.status(404).json({ message: 'No user with that ID' })
        : res.status(200).json(updatedUser);
    } catch (err) {
      console.log(err);
      res.status(500).json('Error updating user: ', err);
    }
  },

  async deleteUser(req, res) {
    try {
      const deletedUser = await User.findOneAndDelete({ _id: req.params.userId });
      !deletedUser
        ? res.status(404).json({ message: 'No user with that ID' })
        : res.status(200).json(deletedUser);
    } catch (err) {
      console.log(err);
      res.status(500).json('Error deleting user: ', err);
    }
  },

  async addFriend(req, res) {
    try {
      const newFriend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $push: { friends: req.params.friendId } },
        { new: true }
      );
      !newFriend
        ? res.status(404).json({ message: 'No user with that ID' })
        : res.status(200).json(newFriend);
    } catch (err) {
      console.log(err);
      res.status(500).json('Error adding friend: ', err);
    }
  },

  async removeFriend(req, res) {
    try {
      const removedFriend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      !removedFriend
        ? res.status(404).json({ message: 'No user with that ID' })
        : res.status(200).json(removedFriend);
    } catch (err) {
      console.log(err);
      res.status(500).json('Error removing friend: ', err);
    }
  },
};
