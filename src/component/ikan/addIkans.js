import React, { Component} from "react";
import { Modal,Button, ModalHeader, ModalBody,ModalFooter, FormGroup, Label, Input} from 'reactstrap';

export default class addIkans extends Component {
    render(){
        return(
            <div>
                <Button className="float-right mb-4" color="primary" onClick={this.props.togglenewIkanModal}>
                    Add Ikan
                </Button>
                <Modal isOpen={this.props.newIkanModal} toggle={this.props.togglenewIkanModal}>
                    <ModalHeader toggle={this.props.togglenewIkanModal}>
                        Create New Ikan
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="nama_ikan">Name:</Label>
                            <Input id="name" name="name" value={this.props.newIkanData.name} onChange={this.props.onChangeAddIkanHandler} />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.props.addIkan()}>
                            Add
                        </Button>{" "}
                        <Button color="secondary" onClick={this.props.togglenewIkanModal}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}