import React, { Component} from "react";
import { Modal,Button, ModalHeader, ModalBody,ModalFooter, FormGroup, Label, Input} from 'reactstrap';

export default class addCustomer extends Component {
    render(){
        return(
            <div>
                <Button className="float-right mb-4" color="primary" onClick={this.props.togglenewCustomerModal}>
                    Add Customer
                </Button>
                <Modal isOpen={this.props.newCustomerModal} toggle={this.props.togglenewCustomerModal}>
                    <ModalHeader toggle={this.props.togglenewCustomerModal}>
                        Create New Customer
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="customer_name">Name:</Label>
                            <Input id="customer_name" name="customer_name" value={this.props.newCustomerData.customer_name} onChange={this.props.onChangeAddCustomerHandler} />
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