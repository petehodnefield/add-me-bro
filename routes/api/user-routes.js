const router = require('express').Router()

const {
    createUser,
    deleteUser,
    getAllUsers,
    getUserById,
    updateUser
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


module.exports = router