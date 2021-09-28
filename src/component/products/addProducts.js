import React, { Component} from "react";
import { Modal,Button, ModalHeader, ModalBody,ModalFooter, FormGroup, Label, Input} from 'reactstrap';

export default class addProducts extends Component {
    render(){
        return(
            <div>
                <Button className="float-right mb-4" color="primary" onClick={this.props.togglenewProductModal}>
                    Add products
                </Button>
                <Modal isOpen={this.props.newProductModal} toggle={this.props.togglenewProductModal}>
                    <ModalHeader toggle={this.props.togglenewProductModal}>
                        Create New Product
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="nama_product">Name:</Label>
                            <Input id="name" name="name" value={this.props.newProductData.name} onChange={this.props.onChangeAddProductHandler} />
                            <Label for="alias">Alias:</Label>
                            <Input id="alias" name="alias" value={this.props.newProductData.alias} onChange={this.props.onChangeAddProductHandler} />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.props.addProduct()}>
                            Add
                        </Button>{" "}
                        <Button color="secondary" onClick={this.props.togglenewProductModal}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}