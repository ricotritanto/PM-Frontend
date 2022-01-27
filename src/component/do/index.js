import React,{Component} from 'react';
import axios from 'axios';
// import AddProducts from './addProducts'
// import EditProducts from './editProducts'
// import UploadProducts from './uploadProducts'
import Swal from 'sweetalert2';
import ReactPaginate from 'react-paginate';

export default class Delivery_order extends Component {
    constructor(props){
        super(props)
        this.getDO = this.getDO.bind(this);
        this.state = {
            do:[],
            offset: 0,
            page: 1,
            count: 0,
            per_page: 6,
            totalPages: 0,
            newDOData:{

            },
            isLoading:false,
            status:'',
            EditDOData:{

            },
            uploadDOData:{
                
            },
            selectedFile:null,
        }
    }

    componentDidMount(){
        this.getDO()
    }

    getDO(){
        const {page,per_page} = this.state;
        const dataDO = {
            'nama':'aa'
        }
        this.setState({
            dataDO:dataDO?dataDO:[]
        })
    }

    render(){
        // const {dataDO} = this.state;
        // let dataDODetails = []
        // if(dataDO.length) = products.map((datane)=>{
        //     return (tr key={datane.id}>
                
        // })
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
                                        <div className="card-header">
                                            <h3 className="card-title"><strong>List Data Delivery Orders</strong></h3>
                                          
                                            <br/><br/>
                                            <li>Total Delivery Orders :  <a className="text-center"> {this.state.count}</a>  </li>                      
                                        </div>                                        
                                        <div className="card-body">
                                            <table id="example2" className="table table-bordered table-hover">
                                                <thead>
                                                    <tr>
                                                    <th>#</th>
                                                    <th>Customer Name</th>
                                                    <th>Product Name</th>
                                                    <th>Buying Price</th>
                                                    <th>Selling Price</th>
                                                    <th>Qty</th>
                                                    <th>DO Date</th>
                                                    <th>Action</th>
                                                    </tr>
                                                </thead>
                                            {/* {products.length === 0?( */}
                                                {/* <tbody> */}
                                                {/* <h3>{noDataFound}</h3> */}
                                                {/* </tbody> */}
                                            {/* ):(    */}
                                                {/* <tbody> */}
                                                {/* {productDetails} */}
                                                {/* </tbody> */}
                                            {/* )} */}
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