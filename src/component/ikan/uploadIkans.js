import React, { Component} from "react";
import { Modal,Button, ModalHeader, ModalBody,ModalFooter, FormGroup, Label, Input} from 'reactstrap';

export default class uploadIkans extends Component {
    render(){
        return(
            <div>
                <Button className="float-right mb-4" color="warning" onClick={this.props.toggleUploadModal}>
                    Upload Data Master Ikan
                </Button>
                <Modal isOpen={this.props.uploadIkanModal} toggle={this.props.toggleUploadModal}>
                    <ModalHeader toggle={this.props.toggleUploadModal}>
                        Upload Data
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label>Upload file:</Label>
                            <Input type="file" className="form-control" name="name" onChange={this.onChangeHandler}/>
                            {/* <Button type="button" class="btn btn-success btn-block" onClick={this.onClickUpload}>Upload</Button>  */}
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.props.onClickUpload()}>
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