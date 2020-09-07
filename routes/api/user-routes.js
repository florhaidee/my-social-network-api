const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/User-controller');

// Set up GET all and POST at /api/Users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// Set up GET one, PUT, and DELETE at /api/Users/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// Set up POST and DELETE at /api/users/:id/friends/friendId
router
  .route('/:userId/friends/:friendId')
  .put(addFriend)
  .delete(removeFriend)

module.exports = router;