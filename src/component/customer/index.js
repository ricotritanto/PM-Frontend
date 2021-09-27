import React,{Component} from 'react';
import axios from 'axios';
import AddCustomer from './addCustomer'
import EditCustomer from './editCustomer'
import Swal from 'sweetalert2';

export default class Customer extends Component {
    constructor(props){
        super(props);
        this.state = {
            customers:[],
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
            noDataFound:''
        }
    }

    componentDidMount(){
        this.getCustomers()
    }

    getCustomers(){
        axios.get('http://localhost:4000/api/customers')
        .then((res)=>{
            this.setState({
            customers: res.data ? res.data:[],
            })
        })
    }

    // function modal add customer
    togglenewCustomerModal =()=>{
        this.setState({
            newCustomerModal: !this.state.newCustomerModal
        })
    }

    // handle untuk get data dari form data customer
    onChangeAddCustomerHandler= (e)=>{
        let {newCustomerData} = this.state
        newCustomerData[e.target.name] = e.target.value
        this.setState({newCustomerData})
    }

    // function add post to api customer 
    addCustomer =()=>{
        axios.post('http://localhost:4000/api/customer/create', this.state.newCustomerData)
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
        axios.put('http://localhost:4000/api/customer/'+id, {name,alias, address, phone})
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
            this.setState({isLoading:false})
            console.log(error.res)
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
                axios.delete('http://localhost:4000/api/customer/'+id)
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


    render(){
        const { newCustomerData,editCustomerData, noDataFound, customers} = this.state;
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
                <div class="content-wrapper">
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
                                        <h3>{noDataFound}</h3>
                                        </tbody>
                                    ):(   
                                        <tbody>
                                        {customerDetails}
                                        </tbody>
                                    )}
                                    </table>
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