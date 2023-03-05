import React, { Component} from "react";
import { Modal, ModalHeader, ModalBody,ModalFooter} from 'reactstrap';
import moment from 'moment';

export default class EditInvoice extends Component {
    render(){
        const {optionCustomer} = this.props;
        var invoicedate = moment(this.props.EditInvoiceData.invoice_date).format('YYYY-MM-DD')
        return(
            <div>
                 <Modal isOpen={this.props.editInvoiceModal} toggle={this.props.toggleEditInvoiceModal}>
                    <ModalHeader toggle={this.props.toggleEditInvoiceModal}>
                        Update Invoice
                    </ModalHeader>
                    <ModalBody>
                        <div className="tab-pane" id="settings">
                            <form className="form-horizontal">                            
                            <div className="form-group row">
                                <label htmlFor="inputCustomer" className="col-sm-3 col-form-label">Customer</label>
                                <div className="col-sm-9">
                                    <select className="form-control" onChange={this.props.onChangeEditInvoiceHandler} name="customer_id" id="customer_id">      
                                        {optionCustomer.map((data) =>(
                                            <option key={data.value} selected={this.props.EditInvoiceData.customer_id === data.value} value={data.value}>{data.label}</option>
                                        ))}     
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="inputName" className="col-sm-3 col-form-label">Buying Price</label>
                                <div className="col-sm-9">
                                    <input type="text" className="form-control" id="dispentation" name="dispentation"  value={this.props.EditInvoiceData.dispentation} onChange={this.props.onChangeEditInvoiceHandler} onKeyPress={this.props.onKeyPressEdit}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="input" className="col-sm-3 col-form-label">Amount</label>
                                <div className="col-sm-9">
                                    <input type="text" className="form-control" id="amount" name="amount" value={this.props.EditInvoiceData.amount} onChange={this.props.onChangeEditInvoiceHandler} onKeyPress={this.props.onKeyPressEdit} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="input" className="col-sm-3 col-form-label">Invoice Date</label>
                                <div className="col-sm-9">
                                <input type="date" className="form-control" id="invoice_date" name="invoice_date" value={invoicedate} onChange={this.props.onChangeEditInvoiceHandler} onKeyPress={this.props.onKeyPressAdd} />
                                </div>
                            </div>
                            </form>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        {/* </div> */}
                        <div className="modal-footer justify-content-between">
                            <button type="button" className="btn btn-default" onClick={this.props.toggleEditInvoiceModal}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => this.props.updateInvoice()}>Save changes</button>
                        </div>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}