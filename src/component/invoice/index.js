import React,{Component} from 'react';
import {Button, Input} from 'reactstrap';
import axios from 'axios';
import AddInvoice from './addInvoice'
import EditInvoice from './editInvoice'
import UploadInvoice from './uploadInvoice'
import Swal from 'sweetalert2';
import ReactPaginate from 'react-paginate';
import moment from 'moment';

export default class Invoice extends Component {
    constructor(props){
        super(props)
        this.getInvoice = this.getInvoice.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.dataCustomerOption = this.dataCustomerOption.bind(this);
        this.searchData = this.searchData.bind(this);
        // this.searchData2 = this.searchData2.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.state = {
            invoices:[],
            offset: 0,
            page: 1,
            count: 0,
            per_page: 6,
            totalPages: 0,
            newInvoiceData:{
                'customer_id':'',
                'dispentation':'',
                'amount':'',
                'invoice_date':''
            },
            isLoading:false,
            status:'',
            EditInvoiceData:{
                'id':'',
                'customer_id':'',
                'dispentation':'',
                'amount':'',
                'invoice_date':''
            },
            uploadInvoiceData:{},
            newInvoiceModal:false,
            editInvoiceModal:false,
            optionCustomer:[],
            selectedFile:null,
            noDataFound:'Data is empty',
            // searchData:{
            //     'customer':'',
            //     'invoice_date':'',
            // },
            searchData:'',
            searchData2:'',
            searchData3:'',
        }
    }

    componentDidMount(){
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.props.token}`
        this.getInvoice()
        this.dataCustomerOption()
    }

    getInvoice(){
        const {page,per_page} = this.state;
        axios.get('http://localhost:3001/api/invoice?page='+page+'&per_page='+per_page+'',{},)
        .then((res)=>{
            const invoices = res.data.result.items
            const count = res.data.result.count
            this.setState({
                invoices: invoices ? invoices:[],
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

    handlePageChange(e) {
        const selectedPage = e.selected + 1
        const offset = selectedPage * this.state.per_page
        this.setState({
            page: selectedPage,
            offset: offset
            },
            () => {
                this.getInvoice();
            }
        );
    }

    toggleUploadModal = ()=>{
        this.setState({
            uploadInvoiceModal: !this.state.uploadInvoiceModal
        })
    }

    onChangeHandler=(e)=>{
        this.setState({
            selectedFile:e.target.files[0],
            loaded:0,
            filetype:'invoice'
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
                uploadInvoiceModal: false,  
                isLoading:false
            })
            this.getInvoice()
        })
        .catch((error) => {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message
            });
            this.setState({
                uploadInvoiceModal: false,  
                isLoading:false
            })
            this.getInvoice()
        })
    }

    toggleNewInvoiceModal=()=>{
        this.setState({
            newInvoiceModal: !this.state.newInvoiceModal,
            optionCustomer: this.state.optionCustomer
        })
    }

    onChangeAddInvoiceHandler=(e)=>{
        e.preventDefault();
        let {newInvoiceData} = this.state
        newInvoiceData[e.target.name] = e.target.value
        this.setState({newInvoiceData})
    }
 
    addInvoice =()=>{
        this.setState({
            isLoading: true,
        })
        axios.post('http://localhost:3001/api/invoice', this.state.newInvoiceData)
        .then((res)=>{
            const {invoices} = this.state
            const newInvoice = [...invoices]
            newInvoice.push(res.data)
            this.setState({
                newInvoiceModal:false,
                newInvoiceData:{
                    'customer_id':'',
                    'dispentation':'',
                    'amount':'',
                    'invoice_date':''
                }
            },()=>
            Swal.fire({
                title: 'Data Berhasil diinput.',
                text: res.data.data,
                icon: 'success',
                confirmButtonText: 'ok',
                timer:2000
              }),
              this.getInvoice())
        })
        .catch((err) => {
            Swal.fire({
                title: 'Create data Failed!',
                text: err.response.status+' '+err.response.statusText,
                icon: 'warning',
                confirmButtonColor: '#d63b30',
                confirmButtonText: 'back',
                timer: 2000
              })
            .then(() => {
                this.getInvoice()
            })
        })
    }

    // toggle tombol edit data
    toggleEditInvoiceModal=()=>{
        this.setState({
            editInvoiceModal : !this.state.editInvoiceModal,
            optionCustomer : this.state.optionCustomer
        })
    }

    // handler form data edit
    onChangeEditInvoiceHandler=(e)=>{
        let {EditInvoiceData} = this.state
        EditInvoiceData[e.target.name] = e.target.value
        this.setState(({EditInvoiceData}) => ({
            ...EditInvoiceData,
            [e.target.name]: e.target.value
          }));

    }

    // function untuk get data edit
    editInvoice = (id, customer_id, dispentation, amount, invoice_date)=>{
        // console.log(name) variable name ini dikirim ke value modal form edit
        this.setState({
            EditInvoiceData:{id, customer_id, dispentation, amount, invoice_date},
            editInvoiceModal: !this.state.editInvoiceModal,
            optionCustomer: this.state.optionCustomer

        })
    }

    updateInvoice =()=>{
        let { id,  customer_id, dispentation, amount, invoice_date} = this.state.EditInvoiceData;
        this.setState({
            isLoading: true,
        });
        // console.log(name)
        axios.put('http://localhost:3001/api/invoice/'+id, { customer_id, dispentation, amount, invoice_date})
        .then((res)=>{
            Swal.fire({
                title: 'Data Berhasil di Update.',
                text: res.data.data,
                icon: 'success',
              });
            this.getInvoice()
            this.setState({
                editInvoiceModal: false,
                editInvoiceData:{ customer_id, dispentation, amount, invoice_date},
                isLoading:false
            })
        })
        .catch((error)=>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message
              });
            this.setState({isLoading:false, editInvoiceModal:false})
        })
          
    }

    deleteInvoice = (id) => {
        this.setState({
            isLoading: true,
        })
        Swal.fire({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes!",
            showCancelButton: true,
        })
        .then((result) => {
            if (result.value === true) {
                axios.delete('http://localhost:3001/api/invoice/'+id)
                .then((res)=>{
                    Swal.fire({
                        title: 'Data Berhasil dihapus.',
                        text: res.data.data,
                        icon: 'success',
                    });
                    this.setState({isLoading:false})
                    this.getInvoice()
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

    searchData(){
        const {searchData,searchData2,searchData3,page, per_page} = this.state;
        axios.get('http://localhost:3001/api/invoice?customer='+searchData+'&invoice_date='+searchData2+'&invoice_date2='+searchData3+'&page='+page+'&per_page='+per_page+'',{},)
        .then((res)=>{
            const invoices = res.data.result.items
            const count = res.data.result.count
            this.setState({
                invoices: invoices ? invoices:[],
                count:count,
                totalPages:Math.ceil(count/per_page),
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
        const { invoices,newInvoiceData,uploadInvoiceData, EditInvoiceData, searchData,searchData2,searchData3,page,per_page} = this.state;
        let invoiceDetails = []
        let totalDispentation =0
        let totalAmount = 0
        if(invoices.length){
            invoiceDetails = invoices.map((invoice,index)=>{
                totalDispentation += invoice.dispentation
                totalAmount += invoice.amount
                return <tr key={invoice.id}>
                <td>{per_page*(page-1)+index+1}</td>
                <td>{invoice.customers.name}</td>
                <td style={{ textAlign: 'right'}}>{invoice.dispentation.toLocaleString()}</td>
                <td style={{ textAlign: 'right'}}>{invoice.amount.toLocaleString()}</td>
                <td style={{ textAlign: 'center'}}>{moment(invoice.invoice_date).format('D MMMM Y')}</td>
                <td>
                    <div className="d-flex align-items-center">
                        <button type="button" className="btn btn-warning mr-3" size="sm" onClick={()=>{
                            (
                                this.editInvoice(invoice.id, invoice.customers.id,invoice.dispentation, invoice.amount,invoice.invoice_date)   
                            )
                            }
                            }>
                            Edit
                        </button>
                        <button type="button" className="btn btn-danger mr-3" size="sm" onClick={(e)=>{
                            (
                                this.deleteInvoice(invoice.id)
                            )}}>
                            Hapus
                        </button>
                    </div>
                </td>
            </tr>
            })
        }
        return(
            <div>
                <div className="content-wrapper">
                    <section className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1>Invoice</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                                    <li className="breadcrumb-item active">Invoice</li>
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
                                            <h3 className="card-title pt-2"><strong>List Data Invoice</strong></h3>
                                            <AddInvoice
                                                toggleNewInvoiceModal = {this.toggleNewInvoiceModal}
                                                newInvoiceModal = {this.state.newInvoiceModal}
                                                onChangeAddInvoiceHandler = {this.onChangeAddInvoiceHandler}
                                                optionCustomer = {this.state.optionCustomer}
                                                // onKeyPressAdd = {this.onKeyPressAdd}
                                                addInvoice = {this.addInvoice}
                                                newInvoiceData = {newInvoiceData}
                                            />
                                            <EditInvoice
                                                toggleEditInvoiceModal = {this.toggleEditInvoiceModal}
                                                editInvoiceModal = {this.state.editInvoiceModal}
                                                onChangeEditInvoiceHandler = {this.onChangeEditInvoiceHandler}
                                                // onKeyPressEdit = {this.onKeyPressEdit}
                                                optionCustomer = {this.state.optionCustomer}
                                                editInvoice = {this.editInvoice}
                                                EditInvoiceData = {EditInvoiceData}
                                                updateInvoice = {this.updateInvoice}
                                            />
                                            <UploadInvoice
                                                toggleUploadModal = {this.toggleUploadModal}
                                                uploadInvoiceModal = {this.state.uploadInvoiceModal}
                                                onChangeHandler = {this.onChangeHandler}
                                                onClickUpload = {this.onClickUpload}
                                                uploadInvoiceData = {uploadInvoiceData}
                                            />
                                            <br/><br/>
                                            <li>Total Invoice :  <i className="text-center"> {this.state.count}</i>  </li>                               
                                        </div>     
                                        <div className="card-header pt-1 pb-0 mb-0 mt-0 border-0">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="row">
                                                        <div className="col-4 mb-0">
                                                            <label>customer : </label>
                                                            <div className="form-group mb-0">
                                                                <Input type="text" className="form-control mb-0" value={searchData} onChange={this.onChangeSearch} placeholder="search by customer name here"/>
                                                            </div>
                                                        </div>
                                                        <div className="col-3 mb-0">
                                                            <label>Start date :</label>
                                                            <div className="form-group mb-0">
                                                            <Input type="date" className="form-control mb-0" id="invoice_date" name="invoice_date" value={searchData2} onChange={this.onChangeSearch2}/>
                                                            </div>
                                                        </div>
                                                        <div className="col-3 mb-0">
                                                            <label>End date :</label>
                                                            <div className="form-group mb-0">
                                                            <Input type="date" className="form-control mb-0" id="invoice_date2" name="invoice_date2" value={searchData3} onChange={this.onChangeSearch3}/>
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
                                        <div className="card-body mt-0 mb-0 pt-1 pb-0">
                                            <table id="example2" className="table table-bordered table-hover">
                                                <thead>
                                                    <tr style={{ textAlign: 'center'}}>
                                                        <th>#</th>
                                                        <th>Customer Name</th>
                                                        <th>Dispentation</th>
                                                        <th>Amount</th>
                                                        <th>Invoice Date</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                {invoices.length === 0?(
                                                    <tbody>
                                                    <h3>{this.state.noDataFound}</h3>
                                                    </tbody>
                                                ):(   
                                                    <tbody>
                                                    {invoiceDetails}
                                                    </tbody>
                                                )}
                                                <tfoot>
                                                    <tr>
                                                        <th colSpan={2} style={{ textAlign: 'right', color: 'black',fontSize:'24px'}}>TOTAL :</th>
                                                        <td style={{ textAlign: 'right', color: 'red',fontSize:'24px'}}>{totalDispentation.toLocaleString()}</td>
                                                        <td style={{ textAlign: 'right', color: 'red',fontSize:'24px' }}>{totalAmount.toLocaleString()}</td>
                                                    </tr>
                                                </tfoot>
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