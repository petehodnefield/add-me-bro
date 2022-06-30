const router = require('express').Router()

const {
    createThought,
    updateThought,
    addReaction,
    deleteThought,
    removeReaction,
    findAllThoughts,
    findThoughtById
} = require('../../controllers/thought-controller')

router.route('/')
    .get(findAllThoughts)

router.route('/:id')
    .get(findThoughtById)
    .put(updateThought)

router.route('/:userId').post(createThought)

router
    .route('/:userId/:thoughtId')
    // .put(addReaction)
    .delete(deleteThought)

router
    .route('/:userId/:thoughtId/:reactionId')
    // .delete(removeReaction)

module.exports = router