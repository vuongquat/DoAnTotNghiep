import db from '../models/index';
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        }
        catch (e) {
            reject(e)
        }
    })
}

const handleLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            const isExist = await checkUserEmail(email);
            if (isExist) {
                const user = await db.User.findOne({
                    where: { email: email },
                    attributes: ['email', 'roleId', 'password'],
                    raw: true
                });
                if (user) {
                    //compare password
                    const check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'OK';
                        delete user.password;
                        userData.user = user;
                    }
                    else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password, please try again!';
                    }

                }
                else {
                    userData.errCode = 2;
                    userData.errMessage = `user not found`;
                }
            }
            else {
                userData.errCode = 1;
                userData.errMessage = `Your's email isn't exist!`;
            }
            resolve(userData);
        }
        catch (e) {
            reject(e);
        }
    })
}

const checkUserEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userEmail = await db.User.findOne({
                where: { email: email }
            });
            if (userEmail) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        } catch (e) {
            reject(e)
        }
    })
}

const getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }

            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users);
        }
        catch (e) {
            reject(e)
        }
    })
}

const handleCreateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //check email is exist
            const checkEmail = await checkUserEmail(data.email);
            if (checkEmail === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'This email already exists. Please try another email!'
                })
            }
            else {
                const hashPasswordFromBcrypt = await hashPassword(data.password);
                await db.User.create({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender === '1' ? true : false,
                    roleId: data.roleId,
                })
                resolve({
                    errCode: 0,
                    message: 'OK'
                });
            }
        }
        catch (e) {
            reject(e);
        }
    })
}

const handleDeleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { id: id }
            })
            if (!user) {
                resolve({
                    errCode: 2,
                    errMessage: 'User does not exist'
                })
            }
            await db.User.destroy({
                where: { id: id }
            });
            resolve({
                errCode: 0,
                message: 'Delete user success'
            })
        } catch (e) {
            reject(e);
        }
    })
}

const handleEditUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing parameters required'
                })
            }
            const user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            });
            if (user) {
                await user.update({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                });
                resolve({
                    errCode: 0,
                    message: 'Update user success'
                });
            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: 'User not found'
                });
            }
        }
        catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleLogin: handleLogin,
    checkUserEmail: checkUserEmail,
    getAllUsers: getAllUsers,
    handleCreateUser: handleCreateUser,
    handleDeleteUser: handleDeleteUser,
    handleEditUser: handleEditUser
}