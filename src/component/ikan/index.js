import React,{Component} from 'react';
import axios from 'axios';
import AddIkans from './addIkans'
import EditIkan from './editIkans'
import UploadIkans from './uploadIkans'
import Swal from 'sweetalert2';

export default class Ikan extends Component {
    constructor(props){
        super(props);
        this.state = {
            ikans:[],
            newIkanData:{
                'name':'',
                'status':''
            },
            isLoading:false,
            status:'',
            newIkanModal:false,
            editIkanData:{
                'id':'',
                'name':'',
                // 'status':''
            },
            editIkanModal:false,
            uploadIkanData:{
                'name':'',
            },
            selectedFile:null,
            uploadIkanModal:false,
            noDataFound:''
            
        }
    }

    componentDidMount(){
        this.getIkans()
    }

    getIkans(){
        axios.get('http://localhost:4000/api/ikan')
        .then((res)=>{
            if(res.status === 200){
                this.setState({
                    ikans: res.data ? res.data:[],
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

    // function modal add Ikan
    togglenewIkanModal =()=>{
        this.setState({
            newIkanModal: !this.state.newIkanModal
        })
    }

    // handle untuk get data dari form data ikan
    onChangeAddIkanHandler= (e)=>{
        console.log(e.target.value)
        let {newIkanData} = this.state
        newIkanData[e.target.name] = e.target.value
        this.setState({newIkanData})
    }

    // function add post to api ikan 
    addIkan =()=>{
        axios.post('http://localhost:4000/api/ikan/create', this.state.newIkanData)
        .then((res)=>{
            const {ikans} = this.state
            const newIkans = [...ikans]
            newIkans.push(res.data)
            this.setState({
                ikans : newIkans,
                newIkanModal:false,
                newIkanData:{
                    'name':'',
                    // 'status':''
                }
            },()=>
            Swal.fire({
                title: 'Data Berhasil diinput.',
                text: res.data.data,
                type: 'success',
              }),
              this.getIkans())
        })
    }

    // toggle tombol edit data
    toggleEditIkanModal=()=>{
        this.setState({
            editIkanModal : !this.state.editIkanModal
        })
    }

    // handler form data edit
    onChangeEditIkanHandler=(e)=>{
        // console.log(e.target.value)
        let {editIkanData} = this.state
        editIkanData[e.target.name] = e.target.value
        this.setState({editIkanData})
    }

    // function untuk get data edit
    editIkan = (id, name)=>{
        // console.log(name) variable name ini dikirim ke value modal form edit
        this.setState({
            editIkanData:{id,name},
            editIkanModal: !this.state.editIkanModal

        })
        
    }

    // function untuk kirim data ke API (PUT)
    updateIkan =()=>{
        // console.log(this.state.name)
        let { id, name } = this.state.editIkanData;
        this.setState({
            isLoading: true,
        });
        // console.log(name)
        axios.put('http://localhost:4000/api/ikan/'+id, {name})
        .then((res)=>{
            Swal.fire({
                title: 'Data Berhasil di Update.',
                text: res.data.data,
                type: 'success',
              });
            this.getIkans()
            this.setState({
                editIkanModal: false,
                editIkanData:{name},
                isLoading:false
            })
        })
        .catch((error)=>{
            this.setState({isLoading:false})
            console.log(error.res)
        })
          
    }

    deleteIkan = (id) => {
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
                axios.delete('http://localhost:4000/api/ikan/'+id)
                .then((res)=>{
                    Swal.fire({
                        title: 'Data Berhasil dihapus.',
                        text: res.data.data,
                        type: 'success',
                    });
                    this.setState({isLoading:false})
                    this.getIkans()
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
            uploadIkanModal: !this.state.uploadIkanModal
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
        // axios.post('http://localhost:4000/api/ikan', data,{
            
        // }).then(res=>{
        //     Swal.fire({
        //         title: 'Upload file berhasil.',
        //         type: 'success',
        //     });
        //     this.setState({isLoading:false})
        //     this.getIkans()
        // })
    }


    render(){
        const { newIkanData,editIkanData, uploadIkanData, noDataFound, ikans} = this.state;
        let ikanDetails = []
        let no = 1;
        if(ikans.length){
            ikanDetails = ikans.map((ikan)=>{
                return <tr key={ikan.id}>
                <td>{no++}</td>
                <td>{ikan.nama_ikan}</td>
                <td>{ikan.status}</td>
                <td>
                    <div className="d-flex align-items-center">
                        <button type="button" className="btn btn-warning mr-3" size="sm" onClick={()=>{
                            (
                                this.editIkan(ikan.id, ikan.nama_ikan)
                            )}}>
                            Edit
                        </button>
                        <button type="button" className="btn btn-danger mr-3" size="sm" onClick={(e)=>{
                            (
                                this.deleteIkan(ikan.id)
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
                                <h1>Master Ikan</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="/">Home</a></li>
                                <li className="breadcrumb-item active">Master Ikan</li>
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
                                    <h3 className="card-title">List Data Ikan</h3>
                                    <AddIkans 
                                        togglenewIkanModal = {this.togglenewIkanModal}
                                        newIkanModal = {this.state.newIkanModal}
                                        onChangeAddIkanHandler = {this.onChangeAddIkanHandler}
                                        addIkan = {this.addIkan}
                                        newIkanData = {newIkanData}
                                    />
                                    <EditIkan
                                        toggleEditIkanModal = {this.toggleEditIkanModal}
                                        editIkanModal = {this.state.editIkanModal}
                                        onChangeEditIkanHandler = {this.onChangeEditIkanHandler}
                                        editIkan = {this.editIkan}
                                        editIkanData = {editIkanData}
                                        updateIkan = {this.updateIkan}
                                    />

                                    <UploadIkans 
                                        toggleUploadModal = {this.toggleUploadModal}
                                        uploadIkanModal = {this.state.uploadIkanModal}
                                        onChangeHandler = {this.onChangeHandler}
                                        onClickUpload = {this.onClickUpload}
                                        uploadIkanData = {uploadIkanData}
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
                                        <th>Nama Ikan</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                        </tr>
                                    </thead>
                                    {ikans.length === 0?(
                                        <tbody>
                                        <h3>{noDataFound}</h3>
                                        </tbody>
                                    ):(   
                                        <tbody>
                                        {ikanDetails}
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