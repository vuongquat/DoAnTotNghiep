import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup } from 'reactstrap';
import _ from 'lodash';
class ModalEditlUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',

        }

    }


    componentDidMount() {
        const user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'harcode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
            })
        }
        console.log('check props user: ', this.props.currentUser);
    }

    toggle = () => {
        this.props.toggleUserModalEdit();
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleOnchangeInput = (e, id) => {
        let copyState = { ...this.state };
        copyState[id] = e.target.value;
        this.setState({
            ...copyState
        })
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            //call api modal creat user
            this.props.editUser(this.state);
        }
    }

    render() {

        return (
            <Modal
                isOpen={this.props.isOpenModalEdit}
                toggle={() => this.toggle()}
                className="modal-user"
                size='lg'
                centered>
                <ModalHeader toggle={() => this.toggle()}>Edit user</ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Email:</label>
                            <input type="text" disabled onChange={(e) => this.handleOnchangeInput(e, 'email')} value={this.state.email} />
                        </div>
                        <div className="input-container">
                            <label>Password:</label>
                            <input type="password" disabled onChange={(e) => this.handleOnchangeInput(e, 'password')} value={this.state.password} />
                        </div>
                        <div className="input-container">
                            <label>First name:</label>
                            <input type="text" onChange={(e) => this.handleOnchangeInput(e, 'firstName')} value={this.state.firstName} />
                        </div>
                        <div className="input-container">
                            <label>Last name:</label>
                            <input type="text" onChange={(e) => this.handleOnchangeInput(e, 'lastName')} value={this.state.lastName} />
                        </div>
                        <div className="input-container max-with-input">
                            <label>Address:</label>
                            <input type="text" onChange={(e) => this.handleOnchangeInput(e, 'address')} value={this.state.address} />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className="px-3" onClick={() => this.handleSaveUser()}>Save changes</Button>{' '}
                    <Button color="secondary" className="px-3" onClick={() => this.toggle()}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditlUser);


