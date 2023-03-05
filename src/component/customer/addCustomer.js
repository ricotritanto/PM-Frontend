import React, { Component} from "react";
import { Modal,Button, ModalHeader, ModalBody,ModalFooter, FormGroup, Label, Input} from 'reactstrap';

export default class addCustomer extends Component {
    render(){
        return(
            <div>
                <Button className="float-right mb-1" color="primary" onClick={this.props.togglenewCustomerModal}>
                    Add Customer
                </Button>
                <Modal isOpen={this.props.newCustomerModal} toggle={this.props.togglenewCustomerModal}>
                    <ModalHeader toggle={this.props.togglenewCustomerModal}>
                        Create New Customer
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="name">Name:</Label>
                            <Input id="name" name="name" onChange={this.props.onChangeAddCustomerHandler} onKeyPress={this.props.onKeyPressAdd}  />
                            <Label for="alias">Alias:</Label>
                            <Input id="alias" name="alias" onChange={this.props.onChangeAddCustomerHandler} onKeyPress={this.props.onKeyPressAdd}  />
                            <Label for="alias">Address:</Label>
                            <Input id="address" name="address" onChange={this.props.onChangeAddCustomerHandler} onKeyPress={this.props.onKeyPressAdd}  />
                            <Label for="phone">Phone:</Label>
                            <Input id="phone" name="phone" onChange={this.props.onChangeAddCustomerHandler} onKeyPress={this.props.onKeyPressAdd} />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.props.addCustomer()}>
                            Add
                        </Button>{" "}
                        <Button color="secondary" onClick={this.props.togglenewCustomerModal}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}