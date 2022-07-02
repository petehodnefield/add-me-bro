const {User, Thought} = require('../models')

const thoughtController = {
    // Create thought
    createThought({body}, res) {
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
                {},
                {$push: {thoughts: _id}},
                {new: true}
            )
        })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    },

    // Find all thoughts
    findAllThoughts({body}, res) {
        Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    },

    // Find thought by id
    findThoughtById({params}, res) {
        Thought.findById({_id: params.id})
        .then(thoughtData => {
            if(!thoughtData) {
                res.status(404).json({message: `no thought found with this id!`})
            }
            res.json(thoughtData)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
    },

    // Update a thought by ID
    updateThought({params, body}, res) {
        Thought.findOneAndUpdate(
            {_id: params.id}, body, {new : true}
        )
        .then(thoughtData => {
            if(!thoughtData) {
                res.status(404).json({message: `no thought found with this id!`})
            }
            res.json(thoughtData)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
    },

    // Delete a thought by ID
    deleteThought({params}, res) {
        Thought.findOneAndDelete({_id: params.thoughtId})
        .then(thoughtData => {
            if(!thoughtData) {
                return res.status(404).json({message: `No thought with this id!`})
            }
            return User.findOneAndUpdate(
                {_id: params.userId},
                {$pull: {thoughts: params.thoughtId}},
                {new: true}
            )
        })
        .then(thoughtData => {
            if(!thoughtData) {
                res.status(404).json({message: `no thought found with this id!`})
            }
            res.json(thoughtData)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
    },

    createReaction({params, body}, res) {
        Thought.findOneAndUpdate(
          {_id: params.thoughtId},
          {$push: {reactions: body}},
          {new: true}
          )
      .then(dbUser => {
          res.json(dbUser);
        })
        .catch(err => {
          res.json(err);
        });
      },

      removeReaction({params, body}, res) {  
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$pull: {reactions:{ _id: params.reactionId} }},
            {new: true}
        )
        .then(dbUser => {
            res.json(dbUser);
        })
        .catch(err => {
            res.json(err);
        });
      }
}

module.exports = thoughtController