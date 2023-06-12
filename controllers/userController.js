const { Thought, User } = require('../models');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
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
        : res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json('Error Finding this user', err);
    }
  },
  // create a new tag
  async createUser(req, res) {
    try {
      const newUser = User.create(req.body);

      !newUser
        ? res
          .status(404)
          .json({ message: 'User creation unsucessfull. Username and Email Required' })
        : res.json(newUser, "User Created");
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
        : res.json(updatedUser, "User Updated");
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
        : res.json(deletedUser, "User Deleted");
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
        : res.json(newFriend, "Friend Added");
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
        : res.json(removedFriend, "Friend Removed");
    } catch (err) {
      console.log(err);
      res.status(500).json('Error removing friend: ', err);
    }
  },
};
