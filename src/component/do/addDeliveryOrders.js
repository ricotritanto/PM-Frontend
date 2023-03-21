import React, { Component} from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

export default class AddDeliveryOrders extends Component {  
    render(){
        const {optionCustomer, optionProduct,setSelected} = this.props;
        return(
            <div>
                <Button className="float-right mb-1" color="primary" onClick={this.props.toggleNewDeliveryModal}>
                    Add Delivery Orders
                </Button>
                <Modal isOpen={this.props.newDeliveryModal} toggle={this.props.toggleNewDeliveryModal}>
                    <ModalHeader toggle={this.props.toggleNewDeliveryModal}>
                        Create Delivery Orders
                    </ModalHeader>
                    <ModalBody> 
                        <div className="tab-pane" id="settings">
                            <form className="form-horizontal">
                                <div className="form-group row">
                                    <label htmlFor="inputRole" className="col-sm-3 col-form-label">Customer</label>
                                    <div className="col-sm-9">
                                    <select className="form-control" onChange={this.props.onChangeAddDOHandler} name="customer_id" id="customer_id" required>      
                                    <option> --- Pilih Customers ---</option>
                                            {optionCustomer.map((data) =>(
                                                <option key={data.value} selected={this.props.newDeliveryData.customer_id === data.value} value={data.value}>{data.label}</option>
                                            ))}     
                                    </select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="inputRole" className="col-sm-3 col-form-label">Product</label>
                                    <div className="col-sm-9">
                                        <select className="form-control"onChange={this.props.onChangeAddDOHandler} name="product_id" id="product_id" required>      
                                        <option> --- Pilih Products ---</option>
                                                {optionProduct.map((data) =>(
                                                    <option key={data.value} selected={this.props.newDeliveryData.product_id === data.value} value={data.value}>{data.label}</option>
                                                ))}     
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="inputEmail" className="col-sm-3 col-form-label">Buying Price</label>
                                    <div className="col-sm-9">
                                    <input type="number" className="form-control" id="buying_price" name="buying_price" onChange={this.props.onChangeAddDOHandler} onKeyPress={this.props.onKeyPressAdd} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="inputEmail" className="col-sm-3 col-form-label">Selling Price</label>
                                    <div className="col-sm-9">
                                    <input type="number" className="form-control" id="sell_price" name="sell_price" onChange={this.props.onChangeAddDOHandler} onKeyPress={this.props.onKeyPressAdd} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="inputEmail" className="col-sm-3 col-form-label">Qty</label>
                                    <div className="col-sm-9">
                                    <input type="number" className="form-control" id="qty" name="qty" onChange={this.props.onChangeAddDOHandler} onKeyPress={this.props.onKeyPressAdd} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="inputEmail" className="col-sm-3 col-form-label">DO Date</label>
                                    <div className="col-sm-9">
                                    <input type="date" className="form-control" id="delivery_order_date" name="delivery_order_date" onChange={this.props.onChangeAddDOHandler} onKeyPress={this.props.onKeyPressAdd} />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="modal-footer justify-content-between">
                            <button type="button" className="btn btn-default" onClick={this.props.toggleNewDeliveryModal}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => this.props.addDO()}>Save changes</button>
                        </div>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}