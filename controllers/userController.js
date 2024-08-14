const getAllUsers = (req, res) => {

    res.send({'message' : 'User Info'});
};

const createUser = (req, res) => {
    res.send('Create User');
};

module.exports = { getAllUsers, createUser };