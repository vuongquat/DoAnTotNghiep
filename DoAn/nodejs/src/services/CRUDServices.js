import bcrypt from 'bcryptjs';
import db from '../models/index';
const salt = bcrypt.genSaltSync(10);


const createUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
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
            resolve('ok create new user success!');
        }
        catch (e) {
            reject(e);
        }
    })
}

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

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const users = db.User.findAll({
                raw: true,
            });
            resolve(users);
        }
        catch (e) {
            reject(e);
        }
    })
}

const getDetailUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ where: { id: id }, raw: true });
            if (user) {
                resolve(user);
            }
            else {
                resolve([]);
            }

        }
        catch (e) {
            reject(e);
        }
    })
}
const updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { id: data.id }
            });
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save();
                resolve();
            }
            else {
                resolve();
            }
        }
        catch (e) {
            reject(e);
        }
    })
}
const deleteCRUD = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { id: id },
            });
            if (user) {
                user.destroy();
            }
            resolve();
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    createUser: createUser,
    getAllUser: getAllUser,
    getDetailUser: getDetailUser,
    updateUser: updateUser,
    deleteCRUD: deleteCRUD,
}