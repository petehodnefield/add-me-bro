const {User, Thought} = require('../models')

const userController = {
     // createUser
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },

  // Get all users
  getAllUsers(req, res) {
    User.find({})
    .populate({
      path: 'thoughts',
      select: '-__v',

    })
    .select('-__v')
    .sort({_id: -1})
    .populate({
      path: 'friends',
      select: '-__v',

    })
    .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // Find user by ID
  getUserById({params}, res) {
    User.findOne({_id: params.id})
    .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // Update a user
  updateUser({params, body}, res) {
    User.findOneAndUpdate(
      {_id: params.id}, body, {new: true}
    )
    .then(updatedUserData => {
      if(!updatedUserData) {
        res.status(404).json({message: `no user found with this id!`})
      }
      res.json(updatedUserData)
    })
    .catch(err => res.json(err));
  },

  // remove a user
  deleteUser({params}, res) {
    User.findOneAndDelete(
      {_id: params.id },
      {new: true}
    )
    .then(deletedUserData => {
      if(!deletedUserData) {
        res.status(404).json({message: `no user found with this id!`})
      }
      res.json(deletedUserData)
    })
    .catch(err => res.json(err));
  },

  // Add a friend
  addFriend({params, body}, res) {
    User.findById(
      {_id: params.userId}
    )
    .then((data) => {
      return User.findOneAndUpdate(
          {},
          {$push: {friends: params.friendId}},
          {new: true}
      )
    })
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
  },

  // Remove a friend
  removeFriend({params, body}, res) {
    User.findById({_id: params.userId})
    .then((data) => {
      return User.findOneAndUpdate(
          {},
          {$pull: {friends: params.friendId}},
          {new: true}
      )
    })
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
  }
}

module.exports = userController