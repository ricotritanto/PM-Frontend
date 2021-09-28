import React, { Component} from "react";
import { Modal,Button, ModalHeader, ModalBody,ModalFooter, FormGroup, Label, Input} from 'reactstrap';

export default class editProducts extends Component {
    render(){
        return(
            <div>
                <Modal isOpen={this.props.editProductModal} toggle={this.props.toggleEditProductModal}>
                    <ModalHeader toggle={this.props.toggleEditProductModal}>
                        Update Data Product
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="nama_Product">Name:</Label>
                            <Input id="name" name="name" value={this.props.editProductData.name} onChange={this.props.onChangeEditProductHandler} />
                            <Label for="alias">Alias:</Label>
                            <Input id="alias" name="alias" value={this.props.editProductData.alias} onChange={this.props.onChangeEditProductHandler} />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.props.updateProduct()}>
                            Update
                        </Button>{" "}
                        <Button color="secondary" onClick={this.props.toggleEditProductModal}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}