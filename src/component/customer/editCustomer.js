import React, { Component} from "react";
import { Modal,Button, ModalHeader, ModalBody,ModalFooter, FormGroup, Label, Input} from 'reactstrap';

export default class editCustomer extends Component {
    render(){
        return(
            <div>
                <Modal isOpen={this.props.editCustomerModal} toggle={this.props.toggleEditCustomerModal}>
                    <ModalHeader toggle={this.props.toggleEditCustomerModal}>
                        Update Data Customer
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="name">Name:</Label>
                            <Input id="name" name="name" value={this.props.editCustomerData.name} onChange={this.props.onChangeEditCustomerHandler} onKeyPress={this.props.onKeyPressEdit}/>
                            <Label for="alias">Alias:</Label>
                            <Input id="alias" name="alias" value={this.props.editCustomerData.alias} onChange={this.props.onChangeEditCustomerHandler} onKeyPress={this.props.onKeyPressEdit}/>
                            <Label for="alias">Address:</Label>
                            <Input id="address" name="address" value={this.props.editCustomerData.address} onChange={this.props.onChangeEditCustomerHandler} onKeyPress={this.props.onKeyPressEdit}/>
                            <Label for="phone">Phone:</Label>
                            <Input id="phone" name="phone" value={this.props.editCustomerData.phone} onChange={this.props.onChangeEditCustomerHandler} onKeyPress={this.props.onKeyPressEdit}/>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.props.updateCustomer()}>
                            Update
                        </Button>{" "}
                        <Button color="secondary" onClick={this.props.toggleEditCustomerModal}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}