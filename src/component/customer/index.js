import React,{Component} from 'react';
import axios from 'axios';
import AddCustomer from './addCustomer'
import EditCustomer from './editCustomer'
import UploadCustomers from './uploadCustomers'
import Swal from 'sweetalert2';
import ReactPaginate from 'react-paginate';

export default class Customer extends Component {
    constructor(props){
        super(props);
        this.getCustomers = this.getCustomers.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.state = {
            customers:[],
            offset: 0,
            page: 1,
            count: 0,
            per_page: 6,
            totalPages: 0,
            newCustomerData:{
                'name':'',
                'alias':'',
                'address':'',
                'phone':''
            },
            isLoading:false,
            status:'',
            newCustomerModal:false,
            editCustomerData:{
                'id':'',
                'name':'',
                'alias':'',
                'address':'',
                'phone':''
            },
            editCustomerModal:false,
            uploadCustomerData:{},
            selectedFile:null,
            uploadCustomerModal:false,
            noDataFound:''
        }
    }

    componentDidMount(){
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.props.token}`
        this.getCustomers()
    }

    getCustomers(){
        const {page, per_page} = this.state;
        axios.get('http://localhost:3001/api/customers?page='+page+'&per_page='+per_page+'',{},)
        .then((res)=>{
            const customers = res.data.result.items
            const count = res.data.result.count
            this.setState({
                customers: customers ? customers:[],
                count:count,
                totalPages:Math.ceil(count/per_page)
            })
        })
    }
     // setting pagination
     handlePageChange(e) {
        const selectedPage = e.selected + 1
        const offset = selectedPage * this.state.per_page
        this.setState({
            page: selectedPage,
            offset: offset
            },
            () => {
                this.getCustomers();
            }
        );
    }
    // function modal add customer
    
    togglenewCustomerModal =()=>{
        this.setState({
            newCustomerModal: !this.state.newCustomerModal
        })
    }

    // handle untuk get data dari form data customer
    onChangeAddCustomerHandler= (e)=>{
        e.preventDefault();
        let {newCustomerData} = this.state
        newCustomerData[e.target.name] = e.target.value
        this.setState({newCustomerData})
    }

    // function add post to api customer 
    addCustomer =()=>{
        console.log(this.state.newCustomerData)
        axios.post('http://localhost:3001/api/customers', this.state.newCustomerData)
        .then((res)=>{
            const {customers} = this.state
            const newCustomers = [...customers]
            newCustomers.push(res.data)
            this.setState({
                customer : newCustomers,
                newCustomerModal:false,
                newCustomerData:{
                    'name':'',
                    'alias':'',
                    'address':'',
                    'phone':''
                }
            },()=>
            Swal.fire({
                title: 'Data Berhasil diinput.',
                text: res.data.data,
                type: 'success',
              }),
              this.getCustomers())
        })
    }
    onKeyPressEdit = (e) => {
        if(e.which === 13) {
          this.updateCustomer();
        }
    }

    // toggle tombol edit data
    toggleEditCustomerModal=()=>{
        this.setState({
            editCustomerModal : !this.state.editCustomerModal
        })
    }

    // handler form data edit
    onChangeEditCustomerHandler=(e)=>{
        let {editCustomerData} = this.state
        editCustomerData[e.target.name] = e.target.value
        this.setState({editCustomerData})
    }

    // function untuk get data edit
    editCustomer = (id, name, alias, address, phone)=>{
        // console.log(name) variable name ini dikirim ke value modal form edit
        this.setState({
            editCustomerData:{id,name, alias, address, phone},
            editCustomerModal: !this.state.editCustomerModal

        })
        
    }

    // function untuk kirim data ke API (PUT)
    updateCustomer =()=>{
        // console.log(this.state.name)
        let { id, name, alias, address, phone } = this.state.editCustomerData;
        // console.log(name)
        this.setState({
            isLoading: true,
        });
        // console.log(name)
        axios.put('http://localhost:3001/api/customers/'+id, {name,alias, address, phone})
        .then((res)=>{
            Swal.fire({
                title: 'Data Berhasil di Update.',
                text: res.data.data,
                type: 'success',
              });
            this.getCustomers()
            this.setState({
                editCustomerModal: false,
                editCustomerData:{name, alias, address, phone},
                isLoading:false
            })
        })
        .catch((error)=>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message
              });
            this.setState({isLoading:false, editCustomerModal:false})
        })
          
    }

    deleteCustomer = (id) => {
        this.setState({
            isLoading: true,
        })
        Swal.fire({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            type: "warning",
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes!",
            showCancelButton: true,
        })
        .then((result) => {
            if (result.value === true) {
                axios.delete('http://localhost:3001/api/customers/'+id)
                .then((res)=>{
                    Swal.fire({
                        title: 'Data Berhasil dihapus.',
                        text: res.data.data,
                        type: 'success',
                    });
                    this.setState({isLoading:false})
                    this.getCustomers()
                })
            }
            if(result.dismiss === 'cancel'){
                Swal.fire("Cancel Berhasil!");
                this.setState({isLoading:false})
            }
        });
    }

    toggleUploadModal = ()=>{
        this.setState({
            uploadCustomerModal: !this.state.uploadCustomerModal
        })
    }

    onChangeHandler=(e)=>{
        this.setState({
            selectedFile:e.target.files[0],
            loaded:0,
            filetype:'customers'
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
                icon: 'success',
                timer: 1500
              });
            this.setState({
                uploadCustomerModal: false,  
                isLoading:false
            })
            this.getCustomers()
        })
        .catch((error) => {
            // error response
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message
            });
            this.setState({
                uploadCustomerModal: false,  
                isLoading:false
            })
            this.getCustomers()
        })
    }

    render(){
        const { newCustomerData,editCustomerData,uploadCustomerData, customers} = this.state;
        let customerDetails = []
        let no = 1;
        if(customers.length){
            customerDetails = customers.map((customer)=>{
                return <tr key={customer.id}>
                <td>{no++}</td>
                <td>{customer.name}</td>
                <td>{customer.alias}</td>
                <td>{customer.address}</td>
                <td>{customer.phone}</td>
                <td>
                    <div className="d-flex align-items-center">
                        <button type="button" className="btn btn-warning mr-3" size="sm" onClick={()=>{
                            (
                                this.editCustomer(customer.id, customer.name,customer.alias,customer.address,customer.phone)   
                            )
                            }
                            }>
                            Edit
                        </button>
                        <button type="button" className="btn btn-danger mr-3" size="sm" onClick={(e)=>{
                            (
                                this.deleteCustomer(customer.id)
                                // this.ConfirmDeleteIkan(ikan.id)
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
                                <h1>Master Customers</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="/">Home</a></li>
                                <li className="breadcrumb-item active">Master Customers</li>
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
                                <div className="card-header">
                                    <h3 className="card-title">List Data Customers</h3>
                                    <AddCustomer
                                        togglenewCustomerModal = {this.togglenewCustomerModal}
                                        newCustomerModal = {this.state.newCustomerModal}
                                        onChangeAddCustomerHandler = {this.onChangeAddCustomerHandler}
                                        onKeyPressAdd = {this.onKeyPressAdd}
                                        addCustomer = {this.addCustomer}
                                        newCustomerData = {newCustomerData}
                                    />
                                    <EditCustomer
                                        toggleEditCustomerModal = {this.toggleEditCustomerModal}
                                        editCustomerModal = {this.state.editCustomerModal}
                                        onChangeEditCustomerHandler = {this.onChangeEditCustomerHandler}
                                        editCustomer = {this.editCustomer}
                                        editCustomerData = {editCustomerData}
                                        updateCustomer = {this.updateCustomer}
                                    />
                                    <UploadCustomers
                                        toggleUploadModal = {this.toggleUploadModal}
                                        uploadCustomerModal = {this.state.uploadCustomerModal}
                                        onChangeHandler = {this.onChangeHandler}
                                        onClickUpload = {this.onClickUpload}
                                        uploadCustomerData = {uploadCustomerData}
                                    />
                                </div>
                                {/* /.card-header */}
                                <div className="card-body">
                                    <table id="example2" className="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                        <th>No</th>
                                        <th>Nama Customer</th>
                                        <th>Alias</th>
                                        <th>Address</th>
                                        <th>Phone</th>
                                        <th>Action</th>
                                        </tr>
                                    </thead>
                                    {customers.length === 0?(
                                        <tbody>
                                        {/* <h3>{noDataFound}</h3> */}
                                        </tbody>
                                    ):(   
                                        <tbody>
                                        {customerDetails}
                                        </tbody>
                                    )}
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