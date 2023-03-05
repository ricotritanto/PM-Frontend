import React, { Component} from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

export default class AddInvoice extends Component {    
    render(){
        const {optionCustomer} = this.props;
        return(
            <div>
                <Button className="float-right mb-1" color="primary" onClick={this.props.toggleNewInvoiceModal}>
                    Add Invoice
                </Button>
                <Modal isOpen={this.props.newInvoiceModal} toggle={this.props.toggleNewInvoiceModal}>
                    <ModalHeader toggle={this.props.toggleNewInvoiceModal}>
                        Create Invoice
                    </ModalHeader>
                    <ModalBody> 
                        <div className="tab-pane" id="settings">
                            <form className="form-horizontal">
                                <div className="form-group row">
                                    <label htmlFor="inputRole" className="col-sm-3 col-form-label">Customer</label>
                                    <div className="col-sm-9">
                                    <select className="form-control" onChange={this.props.onChangeAddInvoiceHandler} name="customer_id" id="customer_id">      
                                    <option> --- Pilih Customers ---</option>
                                            {optionCustomer.map((data) =>(
                                                <option key={data.value} selected={this.props.newInvoiceData.customer_id === data.value} value={data.value}>{data.label}</option>
                                            ))}     
                                    </select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="inputEmail" className="col-sm-3 col-form-label">Dispentation</label>
                                    <div className="col-sm-9">
                                    <input type="number" className="form-control" id="dispentation" name="dispentation" onChange={this.props.onChangeAddInvoiceHandler} onKeyPress={this.props.onKeyPressAdd} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="inputEmail" className="col-sm-3 col-form-label">Amount</label>
                                    <div className="col-sm-9">
                                    <input type="number" className="form-control" id="amount" name="amount" onChange={this.props.onChangeAddInvoiceHandler} onKeyPress={this.props.onKeyPressAdd} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="inputEmail" className="col-sm-3 col-form-label">Invoice Date</label>
                                    <div className="col-sm-9">
                                    <input type="date" className="form-control" id="invoice_date" name="invoice_date" onChange={this.props.onChangeAddInvoiceHandler} onKeyPress={this.props.onKeyPressAdd} />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="modal-footer justify-content-between">
                            <button type="button" className="btn btn-default" onClick={this.props.toggleNewInvoiceModal}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => this.props.addInvoice()}>Save changes</button>
                        </div>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}