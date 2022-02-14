import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { handleGetAllUsers, createUserService, deleteUserService, editUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter';


class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModal: false,
            isOpenModalEdit: false,
            userEdit: {},
        }
    }


    async componentDidMount() {
        await this.getAllUserFromReact();
    }

    getAllUserFromReact = async () => {
        let response = await handleGetAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModal: true
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }

    toggleUserModalEdit = () => {
        this.setState({
            isOpenModalEdit: !this.state.isOpenModalEdit
        })
    }

    createUser = async (data) => {
        try {
            const response = await createUserService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            }
            else {
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModal: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA');
            }
        } catch (e) {
            console.log(e);
        }
    }

    handleEditUser = (user) => {
        this.setState({
            isOpenModalEdit: true,
            userEdit: user
        })
    }

    handleDeleteUser = async (user) => {
        console.log(user.id);
        try {
            const response = await deleteUserService(user.id);
            if (response && response.errCode === 0) {
                await this.getAllUserFromReact();
            }
            else {
                alert(response.errMessage);
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    editUser = async (user) => {
        try {
            const response = await editUserService(user);
            await this.getAllUserFromReact();
            this.setState({
                isOpenModalEdit: false
            })
        }
        catch (e) {
            console.log(e);
        }
    }


    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <ModalUser isOpenModal={this.state.isOpenModal} toggleUserModal={this.toggleUserModal} createUser={this.createUser} />
                {this.state.isOpenModalEdit && <ModalEditUser
                    isOpenModalEdit={this.state.isOpenModalEdit}
                    toggleUserModalEdit={this.toggleUserModalEdit}
                    currentUser={this.state.userEdit}
                    editUser={this.editUser}
                />}
                <div className="title text-center">Manage user with Coat</div>
                <div className="mx-1">
                    <button onClick={() => this.handleAddNewUser()} className="btn btn-primary px-3"><i className="fas fa-plus"></i> Add new user</button>
                </div>
                <div className="users-table mt-3 mx-1">
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>

                            {
                                arrUsers && arrUsers.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className="btn-edit" onClick={() => this.handleEditUser(item)}><i className="fas fa-edit"></i></button>
                                                <button className="btn-delete" onClick={() => this.handleDeleteUser(item)}><i className="fas fa-trash-alt"></i></button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>

                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
