const router = require('express').Router()

const {
    createUser,
    deleteUser,
    getAllUsers,
    getUserById,
    updateUser,
    addFriend,
    removeFriend
} = require('../../controllers/user-controller')

router
    .route('/')
    .get(getAllUsers)
    .post(createUser)

router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

router
    .route('/:userId/friends/:friendId')
    // add friend
    .post(addFriend)
    .delete(removeFriend)

module.exports = router