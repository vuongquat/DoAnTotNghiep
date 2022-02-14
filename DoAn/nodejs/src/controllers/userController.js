import userServices from '../services/userServices';

const handleLogin = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing input parameter'
        })
    }
    const userData = await userServices.handleLogin(email, password);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

const handleGetAllUsers = async (req, res) => {
    const id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            users: []
        })
    }
    const users = await userServices.getAllUsers(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        users
    })
}

const handleCreateUser = async (req, res) => {
    const message = await userServices.handleCreateUser(req.body);
    console.log(message);
    return res.status(200).json(message);
}

const handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!'
        })
    }
    const message = await userServices.handleDeleteUser(req.body.id);
    return res.status(200).json(message);
}

const handleEditUser = async (req, res) => {
    const data = req.body;
    const message = await userServices.handleEditUser(data);
    return res.status(200).json(message);
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateUser: handleCreateUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
};