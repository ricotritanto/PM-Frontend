import React, { Component} from "react";
import { Modal,Button, ModalHeader, ModalBody,ModalFooter, FormGroup, Label, Input} from 'reactstrap';

export default class uploadCustomers extends Component {
    render(){
        return(
            <div>
                <Button className="float-right mb-4 mr-2" color="primary" onClick={this.props.toggleUploadModal}>
                    Upload Data Master Customers
                </Button>
                <Modal isOpen={this.props.uploadCustomerModal} toggle={this.props.toggleUploadModal}>
                    <ModalHeader toggle={this.props.toggleUploadModal}>
                        Upload Data
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label>Upload file:</Label>
                            <Input type="file" className="form-control" name="file" onChange={this.props.onChangeHandler}/>
                            {/* <Button type="button" class="btn btn-success btn-block" onClick={this.onClickUpload}>Upload</Button>  */}
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.props.onClickUpload}>
                            Upload
                        </Button>{" "}
                        <Button color="secondary" onClick={this.props.toggleUploadModal}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}