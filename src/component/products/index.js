import React,{Component} from 'react';
import axios from 'axios';
import AddProducts from './addProducts'
import EditProducts from './editProducts'
import UploadProducts from './uploadProducts'
import Swal from 'sweetalert2';

export default class Product extends Component {
    constructor(props){
        super(props);
        this.state = {
            products:[],
            newProductData:{
                'name':'',
                'status':''
            },
            isLoading:false,
            status:'',
            newProductModal:false,
            editProductData:{
                'id':'',
                'name':'',
                // 'status':''
            },
            editProductModal:false,
            uploadProductData:{
                'name':'',
            },
            selectedFile:null,
            uploadProductModal:false,
            noDataFound:''
            
        }
    }

    componentDidMount(){
        this.getProducts()
    }

    getProducts(){
        axios.get('http://localhost:4000/api/products')
        .then((res)=>{
            if(res.status === 200){
                this.setState({
                    products: res.data ? res.data:[],
                })
            }
            if(res.data.status === "failed" &&  res.data.success === false)
            {
                this.setState({
                    noDataFound:res.data.message,
                })
            }
        })
    }

    // function modal add Product
    togglenewProductModal =()=>{
        this.setState({
            newProductModal: !this.state.newProductModal
        })
    }

    // handle untuk get data dari form data Product
    onChangeAddProductHandler= (e)=>{
        console.log(e.target.value)
        let {newProductData} = this.state
        newProductData[e.target.name] = e.target.value
        this.setState({newProductData})
    }

    // function add post to api Product 
    addProduct =()=>{
        axios.post('http://localhost:4000/api/product/create', this.state.newProductData)
        .then((res)=>{
            const {Products} = this.state
            const newProducts = [...Products]
            newProducts.push(res.data)
            this.setState({
                Products : newProducts,
                newProductModal:false,
                newProductData:{
                    'name':'',
                    // 'status':''
                }
            },()=>
            Swal.fire({
                title: 'Data Berhasil diinput.',
                text: res.data.data,
                type: 'success',
              }),
              this.getProducts())
        })
    }

    // toggle tombol edit data
    toggleEditProductModal=()=>{
        this.setState({
            editProductModal : !this.state.editProductModal
        })
    }

    // handler form data edit
    onChangeEditProductHandler=(e)=>{
        // console.log(e.target.value)
        let {editProductData} = this.state
        editProductData[e.target.name] = e.target.value
        this.setState({editProductData})
    }

    // function untuk get data edit
    editProduct = (id, name)=>{
        // console.log(name) variable name ini dikirim ke value modal form edit
        this.setState({
            editProductData:{id,name},
            editProductModal: !this.state.editProductModal

        })
        
    }

    // function untuk kirim data ke API (PUT)
    updateProduct =()=>{
        // console.log(this.state.name)
        let { id, name } = this.state.editProductData;
        this.setState({
            isLoading: true,
        });
        // console.log(name)
        axios.put('http://localhost:4000/api/Products/'+id, {name})
        .then((res)=>{
            Swal.fire({
                title: 'Data Berhasil di Update.',
                text: res.data.data,
                type: 'success',
              });
            this.getProducts()
            this.setState({
                editProductModal: false,
                editProductData:{name},
                isLoading:false
            })
        })
        .catch((error)=>{
            this.setState({isLoading:false})
            console.log(error.res)
        })
          
    }

    deleteProduct = (id) => {
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
                axios.delete('http://localhost:4000/api/Product/'+id)
                .then((res)=>{
                    Swal.fire({
                        title: 'Data Berhasil dihapus.',
                        text: res.data.data,
                        type: 'success',
                    });
                    this.setState({isLoading:false})
                    this.getProducts()
                })
            }
            if(result.dismiss === 'cancel'){
                Swal.fire("Cancel Berhasil!");
                this.setState({isLoading:false})
            }
        });
    }

    // toggle modal form upload
    toggleUploadModal =()=>{
        this.setState({
            uploadProductModal: !this.state.uploadProductModal
        })
    }

    // function untuk upload file
    onChangeHandler=e=>{
        // console.log(e.target.files[0])
        this.setState({
            selectedFile:e.target.files[0],
            loaded:0,
        })
    }

    onClickUpload =()=>{
        const data = new FormData()
        data.append('file', this.state.selectedFile)
        console.log(data.append('file', this.state.selectedFile));
        // axios.post('http://localhost:4000/api/Product', data,{
            
        // }).then(res=>{
        //     Swal.fire({
        //         title: 'Upload file berhasil.',
        //         type: 'success',
        //     });
        //     this.setState({isLoading:false})
        //     this.getProducts()
        // })
    }


    render(){
        const { newProductData,editProductData, uploadProductData, noDataFound, products} = this.state;
        let productDetails = []
        let no = 1;
        if(products.length){
            productDetails = products.map((Product)=>{
                return <tr key={products.id}>
                <td>{no++}</td>
                <td>{products.name}</td>
                <td>{products.status}</td>
                <td>
                    <div className="d-flex align-items-center">
                        <button type="button" className="btn btn-warning mr-3" size="sm" onClick={()=>{
                            (
                                this.editProduct(products.id, products.name)
                            )}}>
                            Edit
                        </button>
                        <button type="button" className="btn btn-danger mr-3" size="sm" onClick={(e)=>{
                            (
                                this.deleteProduct(products.id)
                                // this.ConfirmDeleteProduct(Product.id)
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
                                <h1>Master Product</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="/">Home</a></li>
                                <li className="breadcrumb-item active">Master Products</li>
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
                                    <h3 className="card-title">List Data Products</h3>
                                    <AddProducts
                                        togglenewProductModal = {this.togglenewProductModal}
                                        newProductModal = {this.state.newProductModal}
                                        onChangeAddProductHandler = {this.onChangeAddProductHandler}
                                        addProduct = {this.addProduct}
                                        newProductData = {newProductData}
                                    />
                                    <EditProducts
                                        toggleEditProductModal = {this.toggleEditProductModal}
                                        editProductModal = {this.state.editProductModal}
                                        onChangeEditProductHandler = {this.onChangeEditProductHandler}
                                        editProduct = {this.editProduct}
                                        editProductData = {editProductData}
                                        updateProduct = {this.updateProduct}
                                    />

                                    <UploadProducts
                                        toggleUploadModal = {this.toggleUploadModal}
                                        uploadProductModal = {this.state.uploadProductModal}
                                        onChangeHandler = {this.onChangeHandler}
                                        onClickUpload = {this.onClickUpload}
                                        uploadProductData = {uploadProductData}
                                    />
                                </div>
                                <div className="form-gorup files">
                                    <label>Upload file:</label>
                                    <input type="file" className="form-control" name="file" onChange={this.onChangeHandler}/>
                                    <button type="button" class="btn btn-success btn-block" onClick={this.onClickUpload}>Upload</button> 
                                </div>
                                {/* /.card-header */}
                                <div className="card-body">
                                    <table id="example2" className="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                        <th>No</th>
                                        <th>Nama Product</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                        </tr>
                                    </thead>
                                    {products.length === 0?(
                                        <tbody>
                                        <h3>{noDataFound}</h3>
                                        </tbody>
                                    ):(   
                                        <tbody>
                                        {productDetails}
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