import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup } from 'reactstrap';
import { emitter } from '../../utils/emitter';
class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',

        }

        this.listenToEmitter();
    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
            });
        })
    }
    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleUserModal();
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

    handleAddNewUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            //call api modal creat user
            this.props.createUser(this.state);
        }
    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpenModal}
                toggle={() => this.toggle()}
                className="modal-user"
                size='lg'
                centered>
                <ModalHeader toggle={() => this.toggle()}>Create user</ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Email:</label>
                            <input type="text" onChange={(e) => this.handleOnchangeInput(e, 'email')} value={this.state.email} />
                        </div>
                        <div className="input-container">
                            <label>Password:</label>
                            <input type="password" onChange={(e) => this.handleOnchangeInput(e, 'password')} value={this.state.password} />
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
                    <Button color="primary" className="px-3" onClick={() => this.handleAddNewUser()}>Create</Button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);


