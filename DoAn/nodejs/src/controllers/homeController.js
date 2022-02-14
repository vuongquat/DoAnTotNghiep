import CRUDServices from "../services/CRUDServices";
const getHomePage = (req, res) => {
    return res.render('homePage');
}
const getCRUD = (req, res) => {
    return res.render('crud');
}
const postCRUD = async (req, res) => {
    const message = await CRUDServices.createUser(req.body);
    console.log(message);
    return res.send('post crud test');
}
const displayGetCRUD = async (req, res) => {
    const data = await CRUDServices.getAllUser();
    return res.render('displayCRUD', {
        dataTable: data,
    });
}
const getEditCRUD = async (req, res) => {
    const userId = req.query.id;
    if (userId) {
        const userData = await CRUDServices.getDetailUser(userId);
        return res.render('editCRUD', { userData: userData });
    }
    else {
        return res.send('user not found');
    }
}
const putCRUD = async (req, res) => {
    const data = req.body;
    await CRUDServices.updateUser(data);
    return res.redirect('/get-crud');
}
const deleteCRUD = async (req, res) => {
    const idUser = req.query.id;
    await CRUDServices.deleteCRUD(idUser);
    return res.send('delete user success');
}
module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
};