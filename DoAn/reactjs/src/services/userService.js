import axios from '../axios';

const hanldeLoginApi = (email, password) => {
    return axios.post('/api/login', { email, password });
}

const handleGetAllUsers = (id) => {
    return axios.get(`/api/get-all-users?id=${id}`)
}

const createUserService = (data) => {
    console.log('check data from service: ', data);
    return axios.post('/api/create-user', data);
}

const deleteUserService = (id) => {
    console.log('id delete', id);
    return axios.delete('/api/delete-user', {
        data: {
            id: id
        }
    })
}

const editUserService = (data) => {
    console.log(data);
    return axios.put('/api/edit-user', data)
}
export { hanldeLoginApi, handleGetAllUsers, createUserService, deleteUserService, editUserService }