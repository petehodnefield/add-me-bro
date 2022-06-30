const {User, Thought} = require('../models')

const userController = {
     // createUser
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },
  getAllUsers(req, res) {
    User.find({})
    .populate({
      path: 'thoughts',
      select: '-__v'
    })
    .select('-__v')
    .sort({_id: -1})
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  getUserById({params}, res) {
    User.findOne({_id: params.id})
    .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },
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
  }
}


module.exports = userController