import React, { Component} from "react";
import { Modal, ModalHeader, ModalBody,ModalFooter} from 'reactstrap';
import moment from 'moment';

export default class EditDeliveryOrders extends Component {
    render(){
        const {optionCustomer, optionProduct} = this.props;
        var dodate = moment(this.props.EditDeliveryData.delivery_order_date).format('YYYY-MM-DD')
        return(
            <div>
                 <Modal isOpen={this.props.editDeliveryModal} toggle={this.props.toggleEditDeliveryModal}>
                    <ModalHeader toggle={this.props.toggleEditDeliveryModal}>
                        Update Delivery Orders
                    </ModalHeader>
                    <ModalBody>
                        <div className="tab-pane" id="settings">
                            <form className="form-horizontal">                            
                            <div className="form-group row">
                                <label htmlFor="inputCustomer" className="col-sm-3 col-form-label">Customer</label>
                                <div className="col-sm-9">
                                    <select className="form-control" onChange={this.props.onChangeEditDOHandler} name="customer_id" id="customer_id">      
                                        {optionCustomer.map((data) =>(
                                            <option key={data.value} selected={this.props.EditDeliveryData.customer_id === data.value} value={data.value}>{data.label}</option>
                                        ))}     
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="inputCustomer" className="col-sm-3 col-form-label">Product</label>
                                <div className="col-sm-9">
                                    <select className="form-control" onChange={this.props.onChangeEditDOHandler} name="product_id" id="product_id">      
                                        {optionProduct.map((data) =>(
                                            <option key={data.value} selected={this.props.EditDeliveryData.product_id === data.value} value={data.value}>{data.label}</option>
                                        ))}     
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="inputName" className="col-sm-3 col-form-label">Buying Price</label>
                                <div className="col-sm-9">
                                    <input type="text" className="form-control" id="buying_price" name="buying_price"  value={this.props.EditDeliveryData.buying_price} onChange={this.props.onChangeEditDOHandler} onKeyPress={this.props.onKeyPressEdit}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="input" className="col-sm-3 col-form-label">Selling Price</label>
                                <div className="col-sm-9">
                                    <input type="text" className="form-control" id="sell_price" name="sell_price" value={this.props.EditDeliveryData.sell_price} onChange={this.props.onChangeEditDOHandler} onKeyPress={this.props.onKeyPressEdit} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="input" className="col-sm-3 col-form-label">Qty</label>
                                <div className="col-sm-9">
                                    <input type="text" className="form-control" id="qty" name="qty" value={this.props.EditDeliveryData.qty} onChange={this.props.onChangeEditDOHandler} onKeyPress={this.props.onKeyPressEdit} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="input" className="col-sm-3 col-form-label">DO Date</label>
                                <div className="col-sm-9">
                                <input type="date" className="form-control" id="delivery_order_date" name="delivery_order_date" value={dodate} onChange={this.props.onChangeEditDOHandler} onKeyPress={this.props.onKeyPressAdd} />
                                </div>
                            </div>
                            </form>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        {/* </div> */}
                        <div className="modal-footer justify-content-between">
                            <button type="button" className="btn btn-default" onClick={this.props.toggleEditDeliveryModal}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => this.props.updateDO()}>Save changes</button>
                        </div>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}