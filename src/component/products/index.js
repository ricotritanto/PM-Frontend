import React,{Component} from 'react';
import axios from 'axios';
import AddProducts from './addProducts'
import EditProducts from './editProducts'
import UploadProducts from './uploadProducts'
import Swal from 'sweetalert2';
import ReactPaginate from 'react-paginate';

export default class Product extends Component {
    constructor(props){
        super(props);
        this.getProducts = this.getProducts.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.state = {
            products:[],
            offset: 0,
            page: 1,
            count: 0,
            per_page: 6,
            totalPages: 0,
            newProductData:{
                'name':'',
                'alias':''
            },
            isLoading:false,
            status:'',
            newProductModal:false,
            editProductData:{
                'id':'',
                'name':'',
                'alias':''
            },
            editProductModal:false,
            uploadProductData:{
            },
            selectedFile:null,
            uploadProductModal:false,
            noDataFound:''            
        }
    }

    componentDidMount(){
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.props.token}`
        this.getProducts()
    }

    getProducts(){
        const { page, per_page } = this.state;
        axios.get('http://localhost:3001/api/products?page='+page+'&per_page='+per_page+'',{},)
        .then((res)=>{
            const products = res.data.result.items
            const count = res.data.result.count
            this.setState({
                products: products ? products:[],
                count:count,
                totalPages:Math.ceil(count/per_page)
            })

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
        e.preventDefault();
        let {newProductData} = this.state
        newProductData[e.target.name] = e.target.value
        this.setState({newProductData})

    }

    setActiveTutorial(tutorial, index) {
        this.setState({
          currentTutorial: tutorial,
          currentIndex: index,
        });
        }




    // function add post to api Product 
    addProduct =()=>{
            axios.post('http://localhost:3001/api/products', this.state.newProductData)
            .then((res)=>{
                const {products} = this.state
                const newProducts = [...products]
                newProducts.push(res.data)
                this.setState({
                    Products : newProducts,
                    newProductModal:false,
                    newProductData:{
                        'name':'',
                        'alias':''
                    }
                },()=>
                Swal.fire({
                    icon: 'success',
                    title: 'Data Berhasil diinput.',
                    text: res.data.data,
                    type: 'success',
                    timer:1500
                  }),
                  this.getProducts())
            })
            .catch((error)=>{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response.data.message,
                    timer:2000
                  });
                this.setState({isLoading:false, newProductModal:false})
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
        let {editProductData} = this.state
        editProductData[e.target.name] = e.target.value
        this.setState({editProductData})
    }

    // function untuk get data edit
    editProduct = (id, name, alias)=>{
        // console.log(name) variable name ini dikirim ke value modal form edit
        this.setState({
            editProductData:{id,name, alias},
            editProductModal: !this.state.editProductModal

        })
        
    }

    // onKeyPress handle
    onKeyPressAdd = (e) => {
        if(e.which === 13) {
          this.addProduct();
        }
    }

    onKeyPressEdit = (e) => {
        if(e.which === 13) {
          this.updateProduct();
        }
    }
    // function untuk kirim data ke API (PUT)
    updateProduct =()=>{
        // console.log(this.state.name)
        let { id, name, alias } = this.state.editProductData;
        this.setState({
            isLoading: true,
        });
        // console.log(name)
        axios.put('http://localhost:3001/api/products/'+id, {name, alias})
        .then((res)=>{
            Swal.fire({
                icon: 'success',
                title: 'Data Berhasil di Update.',
                text: res.data.data,
                type: 'success',
                timer: 1500
              });
            this.getProducts()
            this.setState({
                editProductModal: false,
                editProductData:{name, alias},
                isLoading:false
            })
        })
        .catch((error)=>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message,
                timer:2000
              });
            this.setState({isLoading:false, editProductModal:false})
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
                axios.delete('http://localhost:3001/api/products/'+id)
                .then((res)=>{
                    Swal.fire({
                        title: 'Data Berhasil dihapus.',
                        text: res.data.data,
                        icon: 'success',
                        timer:1500
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
    onChangeHandler=(e)=>{
        // console.log(e.target.files[0])
        this.setState({
            selectedFile:e.target.files[0],
            loaded:0,
            filetype: 'products'
        })
    }

    onClickUpload =()=>{
        const data = new FormData()
        data.append('file_type',this.state.filetype)
        data.append('file', this.state.selectedFile)
        axios.post('http://localhost:3001/api/file/upload', data, {
            headers: {
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
                uploadProductModal: false,  
                isLoading:false
            })
            this.getProducts()
        })
        .catch((error) => {
            // error response
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message
            });
            this.setState({
                uploadProductModal: false,  
                isLoading:false
            })
            this.getProducts()
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
                this.getProducts();
            }
        );
    }

    // getRequestParams(searchTitle, page, pageSize) {
    //     let params = {};

    //     if (searchTitle) {
    //         params["title"] = searchTitle;
    //     }

    //     if (page) {
    //         params["page"] = page - 1;
    //     }

    //     if (pageSize) {
    //         params["size"] = pageSize;
    //     }

    //     return params;
    // }
    
    


    render(){
        const { newProductData,editProductData, uploadProductData, products} = this.state;
        let productDetails = []
        if(products.length){
            productDetails = products.map((product)=>{
                return <tr key={product.id}>
                <td>#</td>
                <td>{product.name}</td>
                <td>{product.alias}</td>
                <td>
                    <div className="d-flex align-items-center">
                        <button type="button" className="btn btn-info btn-sm mr-3" size="sm" onClick={()=>{
                            (
                                this.editProduct(product.id, product.name,product.alias)
                            )}}>
                            <i className="fas fa-pencil-alt"></i> 
                            Edit
                        </button>
                        <button type="button" className="btn btn-danger btn-sm mr-3" size="sm" onClick={(e)=>{
                            (
                                this.deleteProduct(product.id)
                            )}}><i className="fas fa-trash">
                            </i>
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
                                    <h1>Master Products</h1>
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
                                            <h3 className="card-title"><strong>List Data Products</strong></h3>
                                            <AddProducts
                                                togglenewProductModal = {this.togglenewProductModal}
                                                newProductModal = {this.state.newProductModal}
                                                onChangeAddProductHandler = {this.onChangeAddProductHandler}
                                                onChangeEditProductHandler = {this.onChangeEditProductHandler}
                                                onKeyPressAdd = {this.onKeyPressAdd}
                                                addProduct = {this.addProduct}
                                                newProductData = {newProductData}
                                            />
                                            <EditProducts
                                                toggleEditProductModal = {this.toggleEditProductModal}
                                                editProductModal = {this.state.editProductModal}
                                                onChangeEditProductHandler = {this.onChangeEditProductHandler}
                                                onKeyPressEdit = {this.onKeyPressEdit}
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
                                            <br/><br/>
                                            <li>Total Products :  <a className="text-center"> {this.state.count}</a>  </li>                      
                                        </div>                                        
                                        <div className="card-body">
                                            <table id="example2" className="table table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                <th>#</th>
                                                <th>Product Name</th>
                                                <th>Alias</th>
                                                <th>Action</th>
                                                </tr>
                                            </thead>
                                            {products.length === 0?(
                                                <tbody>
                                                {/* <h3>{noDataFound}</h3> */}
                                                </tbody>
                                            ):(   
                                                <tbody>
                                                {productDetails}
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