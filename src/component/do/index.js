import React,{Component} from 'react';
import {Button, Input} from 'reactstrap';
import axios from 'axios';
import AddDeliveryOrders from './addDeliveryOrders'
import EditDeliveryOrders from './editDeliveryOrders'
import UploadDO from './uploadDO'
import Swal from 'sweetalert2';
import ReactPaginate from 'react-paginate';
import moment from 'moment';
// import { Calendar } from 'react-date-range';

export default class Delivery_order extends Component {
    constructor(props){
        super(props)
        this.getDO = this.getDO.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.dataCustomerOption = this.dataCustomerOption.bind(this);
        this.dataProductOption = this.dataProductOption.bind(this); 
        this.searchData = this.searchData.bind(this);
        // this.searchData2 = this.searchData2.bind(this);
        // this.searchData3 = this.searchData3.bind(this);
        // this.onChangeSearch = this.onChangeSearch.bind(this);
        // this.onChangeSearch2 = this.onChangeSearch2.bind(this);
        // this.onChangeSearch3 = this.onChangeSearch3.bind(this);
        // this.onChangeSearch4 = this.onChangeSearch4.bind(this);
        this.state = {
            deliveryOrders:[],
            offset: 0,
            page: 1,
            count: 0,
            per_page: 5,
            totalPages: 0,
            newDeliveryData:{
                'customer_id':'',
                'product_id':'',
                'buying_price':'',
                'sell_price':'',
                'qty':'',
                'delivery_order_date':''
            },
            isLoading:false,
            status:'',
            EditDeliveryData:{
                'id':'',
                'customer_id':'',
                'product_id':'',
                'buying_price':'',
                'sell_price':'',
                'qty':'',
                'delivery_order_date':''
            },
            newDeliveryModal:false,
            editDeliveryModal:false,
            uploadDOData:{},
            selectedFile:null,
            uploadDOModal:false,
            optionCustomer:[],
            optionProduct:[],
            noDataFound:'Data is empty',
            searchData:'',
            searchData2:'',
            searchData3:'',
            searchData4:''
        }
    }

    componentDidMount(){
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.props.token}`
        this.getDO()
        this.dataCustomerOption()
        this.dataProductOption()
    }
    getDO(){
        const {page,per_page} = this.state;
        axios.get('http://localhost:3001/api/delivery_orders?page='+page+'&per_page='+per_page+'',{},)
        .then((res)=>{
            const deliveryOrders = res.data.result.items
            const count = res.data.result.count
            this.setState({
                deliveryOrders: deliveryOrders ? deliveryOrders:[],
                count:count,
                totalPages:Math.ceil(count/per_page)
            })
        })
    }

    async dataCustomerOption(){
        const res = await axios.get('http://localhost:3001/api/customers')
        const data = res.data.result.items
        
        const options = data.map(d => ({
            "value":d.id,
            "label" : d.name,
            "target" : {
                "name" :"customer_id",
                "id":"customer_id",
                "value" :d.id
            }
          })
        )
        this.setState({optionCustomer: options})
    }

    async dataProductOption(){
        const res = await axios.get('http://localhost:3001/api/products')
        const data = res.data.result.items
        
        const options = data.map(d => ({
            "value":d.id,
            "label" : d.name,
            "target" : {
                "name" :"product_id",
                "id":"product_id",
                "value" :d.id
            }
          })
        )
        this.setState({optionProduct: options})
    }

    handlePageChange(e) {
        const selectedPage = e.selected + 1
        const offset = selectedPage * this.state.per_page
        this.setState({
            page: selectedPage,
            offset: offset
            },
            () => {
                this.getDO();
            }
        );
    }

    toggleUploadModal = ()=>{
        this.setState({
            uploadDOModal: !this.state.uploadDOModal
        })
    }

    toggleNewDeliveryModal=()=>{
        this.setState({
            newDeliveryModal: !this.state.newDeliveryModal,
            optionCustomer: this.state.optionCustomer,
            optionProduct: this.state.optionProduct
        })
    }

    onChangeAddDOHandler=(e)=>{
        e.preventDefault();
        let {newDeliveryData} = this.state
        newDeliveryData[e.target.name] = e.target.value
        this.setState({newDeliveryData})
    }
 
    addDO =()=>{
        axios.post('http://localhost:3001/api/delivery_orders', this.state.newDeliveryData)
        .then((res)=>{
            const delivery_orders = Array.isArray(this.state.delivery_orders) ? this.state.delivery_orders : [];
            const newDO = [...delivery_orders]
            newDO.push(res.data)
            this.setState({
                newDeliveryModal:false,
                newDeliveryData:{
                    'customer_id':'',
                    'product_id':'',
                    'buying_price':'',
                    'sell_price':'',
                    'qty':'',
                    'delivery_order_date':''
                }
            },()=>
            Swal.fire({
                title: 'Data Berhasil diinput.',
                text: res.data.data,
                icon: 'success',
                confirmButtonText: 'ok',
                timer:2000
              }),
              this.getDO())
              this.setState({
                newDeliveryModal: false,
                // editDeliveryData:{customer_id, product_id, buying_price, sell_price, qty, delivery_order_date},
                isLoading:false
            })
        })
        .catch((err) => {
            let errorText = '';
            if (err.response && err.response.statusText) {
              errorText = err.response.status + ' ' + err.response.statusText;
            } else {
              errorText = 'An error occurred while creating the delivery order';
            }
            Swal.fire({
                title: 'Create data Failed!',
                text: err.response.status + ' ' + err.response.statusText,
                icon: 'warning',
                confirmButtonColor: '#d63b30',
                confirmButtonText: 'back',
                timer: 2000
              })
            .then(() => {
                // window.location.reload('/delivery');
                this.getDO()
            })
        })
    }


    // toggle tombol edit data
    toggleEditDeliveryModal=()=>{
        this.setState({
            editDeliveryModal : !this.state.editDeliveryModal,
            optionCustomer : this.state.optionCustomer,
            optionProduct: this.state.optionProduct
        })
    }

    // handler form data edit
    onChangeEditDOHandler=(e)=>{
        let {EditDeliveryData} = this.state
        EditDeliveryData[e.target.name] = e.target.value
        this.setState(({EditDeliveryData}) => ({
            ...EditDeliveryData,
            [e.target.name]: e.target.value
          }));

    }

    // function untuk get data edit
    editDO = (id, customer_id, product_id, buying_price, sell_price,qty, delivery_order_date)=>{
        this.setState({
            EditDeliveryData:{id,customer_id, product_id, buying_price, sell_price,qty, delivery_order_date},
            editDeliveryModal: !this.state.editDeliveryModal,
            optionCustomer: this.state.optionCustomer,
            optionProduct: this.state.optionProduct

        })
    }

    updateDO =()=>{
        let { id, customer_id, product_id, buying_price, sell_price, qty, delivery_order_date} = this.state.EditDeliveryData;
        this.setState({
            isLoading: true,
        });
        // console.log(name)
        axios.put('http://localhost:3001/api/delivery_orders/'+id, {customer_id, product_id, buying_price, sell_price, qty, delivery_order_date})
        .then((res)=>{
            Swal.fire({
                title: 'Data Berhasil di Update.',
                text: res.data.data,
                icon: 'success',
              });
            this.getDO()
            this.setState({
                editDeliveryModal: false,
                editDeliveryData:{customer_id, product_id, buying_price, sell_price, qty, delivery_order_date},
                isLoading:false
            })
        })
        .catch((error)=>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message
              });
            this.setState({isLoading:false, editDeliveryModal:false})
        })
          
    }



    onChangeHandler=(e)=>{
        this.setState({
            selectedFile:e.target.files[0],
            loaded:0,
            filetype:'deliveryOrder'
        })
    }


    onClickUpload = () =>{
        const data = new FormData()
        data.append('file_type', this.state.filetype)
        data.append('file', this.state.selectedFile)
        axios.post('http://localhost:3001/api/file/upload', data, {
            headers:{
                "Content-Type": "multipart/form-data"
            }
        })
        .then((res)=>{
            Swal.fire({
                title: 'Data Berhasil di upload.',
                text: res.data.data,
                type:'success',
                timer: 1500
              });
            this.setState({
                uploadDOModal: false,  
                isLoading:false
            })
            this.getDO()
        })
        .catch((error) => {
            // error response
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message
            });
            this.setState({
                uploadDOModal: false,  
                isLoading:false
            })
            this.getDO()
        })
    }

    // delete delivery_orders by id
    deleteDO = (id) => {
        this.setState({
            isLoading: true,
        })
        Swal.fire({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this file!",
            icon: "warning",
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes!",
            showCancelButton: true,
        })
        .then((result) => {
            if (result.value === true) {
                axios.delete('http://localhost:3001/api/delivery_orders/'+id)
                .then((res)=>{
                    Swal.fire({
                        title: 'Data Berhasil dihapus.',
                        text: res.data.data,
                        icon: 'success',
                    });
                    this.setState({isLoading:false})
                    this.getDO()
                })
            }
            if(result.dismiss === 'cancel'){
                Swal.fire("Cancel Berhasil!");
                this.setState({isLoading:false})
            }
        });
    }
    onChangeSearch=(e)=> {
        e.preventDefault();
        const searchData= e.target.value;
        this.setState({
            searchData: searchData,
        })
    }
    onChangeSearch2=(e)=>{
        e.preventDefault();
        const searchData2 = e.target.value;
        this.setState({
        searchData2 : searchData2
        })
    }
    onChangeSearch3=(e)=>{
        e.preventDefault();
        const searchData3 = e.target.value;
        this.setState({
        searchData3 : searchData3
        })
    }
    onChangeSearch4=(e)=>{
        e.preventDefault();
        const searchData4 = e.target.value;
        this.setState({
        searchData4 : searchData4
        })
    }

    searchData(){
        const {searchData,searchData2,searchData3,searchData4,page, per_page} = this.state;
        axios.get('http://localhost:3001/api/delivery_orders?customer='+searchData+'&product='+searchData2+'&do_date='+searchData3+'&do_date2='+searchData4+'&page='+page+'&per_page='+per_page+'',{},)
        .then((res)=>{
            const deliveryOrders = res.data.result.items
            const count = res.data.result.count
            this.setState({
                deliveryOrders: deliveryOrders ? deliveryOrders:[],
                count:count,
                totalPages:Math.ceil(count/per_page), 
                searchData4:'',
                searchData3:'',
                searchData2:'',
                searchData:''
            })
        })
    }

    render(){
        const selectionRange = {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
          }
        const { deliveryOrders,newDeliveryData,uploadDOData, EditDeliveryData, page, per_page, searchData,searchData2,searchData3,searchData4, noDataFound} = this.state;
        let doDetails = []
        let doItems = []
        if(deliveryOrders.length){
            doDetails = deliveryOrders.map((datane, index)=>{
                doItems = datane.deliveryOrderItems.map((orderItems,i) => {
                    const abc = Object.values(datane.deliveryOrderItems)
                    const customer = i === 0 ? <td rowSpan={abc.length + 1} style={{verticalAlign: 'middle'}}>{datane.customers.name}</td> : null
                    const nourut = i === 0 ? <td rowSpan={abc.length + 1} style={{verticalAlign: 'middle'}}>{per_page*(page-1)+index+1}</td> : null
                    const orderDate = i === 0 ? <td rowSpan={abc.length + 1} style={{verticalAlign: 'middle'}}>{moment(datane.delivery_order_date).format('D-MM-YYYY')}</td> : null

                    let buyingPrice = (orderItems.buying_price).toLocaleString(undefined, {maximumFractionDigits:2})
                    let sellingPrice = (orderItems.selling_price).toLocaleString(undefined, {maximumFractionDigits:2})
                    let totalBuying =(orderItems.buying_price * orderItems.qty).toLocaleString(undefined, {maximumFractionDigits:2})
                    let totalSelling = (orderItems.selling_price * orderItems.qty).toLocaleString(undefined, {maximumFractionDigits:2})

                    return(
                        <tr key={i}>
                            {nourut}
                            {customer}
                            <td>{orderItems.products.name}</td>
                            <td>{buyingPrice}</td>
                            <td>{sellingPrice}</td>
                            <td>{orderItems.qty}</td>
                            <td>{totalBuying}</td>
                            <td>{totalSelling}</td>
                            {orderDate}
                            <td>
                                <div className="d-flex align-items-center">
                                    <button type="button" className="btn btn-warning mr-3" size="sm" onClick={()=>{
                                        (
                                            this.editDO(orderItems.id, datane.customer_id,orderItems.product_id,orderItems.buying_price,orderItems.selling_price,orderItems.qty,datane.delivery_order_date)   
                                        )
                                        }
                                        }>
                                        Edit
                                    </button>
                                    <button type="button" className="btn btn-danger mr-3" size="sm" onClick={(e)=>{
                                        (
                                            this.deleteDO(orderItems.id)
                                        )}}>
                                        Hapus
                                    </button>
                                </div>
                            </td>
                        </tr>
                    )
                })
                return(
                    <tbody key={index}>
                        {doItems}
                    </tbody>
                )
            })
        }
        return(
            <div>
                <div className="content-wrapper">
                    <section className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1>Delivery Orders</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                                    <li className="breadcrumb-item active">Delivery Orders</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Main content */}
                    <section className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header pt-1 pb-0 mb-0 mt-0">
                                            <h3 className="card-title pt-2"><strong>List Data Delivery Orders</strong></h3>
                                            <AddDeliveryOrders
                                                toggleNewDeliveryModal = {this.toggleNewDeliveryModal}
                                                newDeliveryModal = {this.state.newDeliveryModal}
                                                onChangeAddDOHandler = {this.onChangeAddDOHandler}
                                                optionCustomer = {this.state.optionCustomer}
                                                optionProduct = {this.state.optionProduct}
                                                // onKeyPressAdd = {this.onKeyPressAdd}
                                                addDO = {this.addDO}
                                                newDeliveryData = {newDeliveryData}
                                            />
                                            <EditDeliveryOrders
                                                toggleEditDeliveryModal = {this.toggleEditDeliveryModal}
                                                editDeliveryModal = {this.state.editDeliveryModal}
                                                onChangeEditDOHandler = {this.onChangeEditDOHandler}
                                                // onKeyPressEdit = {this.onKeyPressEdit}
                                                optionCustomer = {this.state.optionCustomer}
                                                optionProduct = {this.state.optionProduct}
                                                editDO = {this.editDO}
                                                EditDeliveryData = {EditDeliveryData}
                                                updateDO = {this.updateDO}
                                            />
                                             <UploadDO
                                                toggleUploadModal = {this.toggleUploadModal}
                                                uploadDOModal = {this.state.uploadDOModal}
                                                onChangeHandler = {this.onChangeHandler}
                                                onClickUpload = {this.onClickUpload}
                                                uploadDOData = {uploadDOData}
                                            />
                                            <br/><br/>
                                            <li>Total Delivery Orders :  <i className="text-center"> {this.state.count}</i>  </li>                      
                                        </div>        
                                        <div className="card-header pt-1 pb-0 mb-0 mt-0 border-0">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="row">
                                                        <div className="col-3 mb-0">
                                                            <label>customer : </label>
                                                            <div className="form-group mb-0">
                                                                <Input type="text" className="form-control mb-0" value={searchData}  onChange={this.onChangeSearch} placeholder="type customer name here"/>
                                                            </div>
                                                        </div>
                                                        <div className="col-3 mb-0">
                                                            <label>product : </label>
                                                            <div className="form-group mb-0">
                                                                <Input type="text" className="form-control mb-0" value={searchData2}  onChange={this.onChangeSearch2} placeholder="type product name here"/>
                                                            </div>
                                                        </div>
                                                        <div className="col-2 mb-0">
                                                            <label>Start date :</label>
                                                            <div className="form-group mb-0">
                                                            <Input type="date" className="form-control mb-0" id="do_date" name="do_date" value={searchData3}  onChange={this.onChangeSearch3}/>
                                                            </div>
                                                        </div>
                                                        <div className="col-2 mb-0">
                                                            <label>End date :</label>
                                                            <div className="form-group mb-0">
                                                            <Input type="date" className="form-control mb-0" id="do_date2" name="do_date2" value={searchData4}  onChange={this.onChangeSearch4}/>
                                                            </div>
                                                        </div>
                                                        <div className="col-2 mb-0">
                                                            <label></label>
                                                            <div className="form-group mb-0 pt-2">
                                                                <Button type="submit" className="btn btn-default" onClick={this.searchData}>
                                                                    <i className="fa fa-search"></i>
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                
                                        <div className="card-body">
                                            <table id="example2" className="table table-bordered table-hover">
                                                <thead>
                                                    <tr style={{textAlign: 'center',verticalAlign: 'middle'}}>
                                                        <th>#</th>
                                                        <th>Customer Name</th>
                                                        <th>Product Name</th>
                                                        <th>Buying Price</th>
                                                        <th>Selling Price</th>
                                                        <th>Qty</th>
                                                        <th>Total Buying</th>
                                                        <th>Total Selling</th>
                                                        <th width="12%">DO Date</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                {doDetails}
                                                {/* {deliveryOrders.length === 0?(
                                                    <tbody>
                                                       {noDataFound}
                                                   </tbody>):(
                                                   <tbody key={this.state.index}>
                                                        {doDetails}
                                                    </tbody>
                                                )} */}
                                            </table>
                                        </div>                                        
                                        <div className="card-footer clearfix">                                    
                                            Total Pages: {this.state.totalPages}
                                            <ul className="pagination pagination-sm m-0 float-right">
                                                <ReactPaginate
                                                    previousLabel={"prev"}
                                                    nextLabel={"next"}
                                                    breakLabel={"..."}
                                                    breakClassName={"break-me"}
                                                    pageCount={this.state.totalPages}
                                                    marginPagesDisplayed={2}
                                                    pageRangeDisplayed={2}
                                                    containerClassName={"pagination"}
                                                    previousClassName={"page-item"}
                                                    previousLinkClassName={"page-link"}
                                                    nextClassName={"page-item"}
                                                    nextLinkClassName={"page-link"}
                                                    activeLinkClassName={"page-link"}
                                                    activeClassName={"active"}
                                                    pageClassName={"page-item"}
                                                    pageLinkClassName={"page-link"}
                                                    onPageChange={this.handlePageChange}
                                                />
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

        )
    }

}



