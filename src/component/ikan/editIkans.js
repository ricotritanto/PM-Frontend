import React, { Component} from "react";
import { Modal,Button, ModalHeader, ModalBody,ModalFooter, FormGroup, Label, Input} from 'reactstrap';

export default class editIkans extends Component {
    render(){
        return(
            <div>
                <Modal isOpen={this.props.editIkanModal} toggle={this.props.toggleEditIkanModal}>
                    <ModalHeader toggle={this.props.toggleEditIkanModal}>
                        Update Data Ikan
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="nama_ikan">Name:</Label>
                            <Input id="name" name="name" value={this.props.editIkanData.name} onChange={this.props.onChangeEditIkanHandler} />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.props.updateIkan()}>
                            Update
                        </Button>{" "}
                        <Button color="secondary" onClick={this.props.toggleEditIkanModal}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}