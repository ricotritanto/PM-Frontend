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
                            <Label for="customer_name">Name:</Label>
                            <Input id="customer_name" name="customer_name" value={this.props.editCustomerData.customer_name} onChange={this.props.onChangeEditCustomerHandler} />
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