const { User, Thought } = require('../models');

const userController = {
    //get all users
    getAllUsers(req, res){
        User.find({})
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
              console.log(err);
              res.status(500).json(err);
            });
        
    },

    //get one user by Id
    getUserById({params}, res){
        User.findOne({ _id: params.id})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v'               
        })
        .select('-__v')
        .then(dbUserData => {
            // If no User is found, send 404
            if (!dbUserData) {
              res.status(404).json({ message: 'No User found with this id!' });
              return;
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //create a user
    createUser({ body }, res) {
        User.create(body)
          .then(dbUserData => res.json(dbUserData))
          .catch(err => res.status(400).json(err));
    },

    //update a user by its _id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No User found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.status(400).json(err));
    },

    //delete a user by its _id
    deleteUser({ params }, res) {
        console.log(params)
        User.findOneAndDelete({ _id: params.id })
            .then(deletedUser => {
                if (!deletedUser) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
              res.json(deletedUser);
            })
            .catch(err => res.json(err));
    },

    //add a new friend to a user's friend list
    addFriend({ params }, res) {
        console.log(params)
        User.findOneAndUpdate(
            { _id: params.userId },
            { $addToSet: {friends: params.friendId } },
            { new: true, runValidators: true }
        )
        .then(dbUserdata => {
            if (!dbUserdata) {
                res.status(404).json({ message: 'No User was found with this id!' });
                return;
            }
            res.json(dbUserdata);
        })
        .catch( err => {
            console.log(err);
            res.status(404).json(err)
        })
    },

    //remove a friend from a user's friend list
    removeFriend( { params }, res) {
        User.findOneAndUpdate( 
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
        .then(dbUserdata => {
        if (!dbUserdata) {
            res.status(404).json({ message: 'No User was found with this id!' });
            return;
        }
        res.json(dbUserdata);
        })
        .catch(err => res.json(err))
    }
};

module.exports = userController;