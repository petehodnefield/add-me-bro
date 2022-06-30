const router = require('express').Router()

const {
    createThought,
    updateThought,
    createReaction,
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
    // .put(createReaction)
    .delete(deleteThought)

router
    .route('/thoughts/:thoughtId/reactions')
    .post(createReaction)
    // .delete(removeReaction)

module.exports = router