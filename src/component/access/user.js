import React,{Component} from 'react';
import axios from 'axios';
import AddUser from './addUser'
import EditUser from './editUser'
// import UploadProducts from './uploadProducts'
import Swal from 'sweetalert2';
import ReactPaginate from 'react-paginate';

export default class User extends Component {
    constructor(props){
        super(props)
        this.dataRoleOption = this.dataRoleOption.bind(this);
        this.getUser = this.getUser.bind(this);
        this.state = {
            users:[],
            offset: 0,
            page: 1,
            count: 0,
            per_page: 6,
            totalPages: 0,
            newUserData:{
                "username":'',
                "email":'',
                "role":'',

            },
            isLoading:false,
            status:'',
            newUserModal:false,
            editUserData:{
                "id":'',
                "username":'',
                "email":'',
                "roles":''
            },
            editUserModal:false,
            optionRole:[]
        }
    }

    componentDidMount(){
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.props.token}`
        this.getUser()
        this.dataRoleOption()
    }

    getUser(){
        const {page, per_page} = this.state;
        axios.get('http://localhost:3001/api/users?page='+page+'&per_page='+per_page+'',{},)
        .then((res)=>{
            const users = res.data.result.items
            const count = res.data.result.count
            this.setState({
                users: users ? users:[],
                count:count,
                totalPages:Math.ceil(count/per_page)
            })
        })
    }

    async dataRoleOption(){
        const res = await axios.get('http://localhost:3001/api/roles')
        const data = res.data.result.items
        
        const options = data.map(d => ({
            "value":d.id,
            "label" : d.role,
            "target" : {
                "name" :"id_role",
                "id":"id_role",
                "value" :d.id
            }
          })
        )
        this.setState({optionRole: options})
    }


    // function modal add User
    togglenewUserModal =()=>{
        this.setState({
            newUserModal: !this.state.newUserModal,
            optionRole: this.state.optionRole
        })
    }
    // handle untuk get data dari form data Product
    onChangeAddUserHandler= (e)=>{
        e.preventDefault();
        let {newUserData} = this.state
        newUserData[e.target.name] = e.target.value
        this.setState({newUserData})

    }

     // function add post to api Product 
     addResep =()=>{
        axios.post('http://localhost:3001/api/signup', this.state.newUserData)
        .then((res)=>{
            const {reseps} = this.state
            const newResep= [...reseps]
            newResep.push(res.data)
            this.setState({
                Resep : newResep,
                newUserModal:false,
                newUserData:{
                    'username':'',
                    'email':'',
                    'password':'',
                    'role':''
                }
            },()=>
            Swal.fire({
                icon: 'success',
                title: 'Data Berhasil diinput.',
                text: res.data.message,
                type: 'success',
                timer:1500
              }),
              this.getUser())
        })
    }

     // toggle tombol edit data
     toggleEditUserModal=()=>{
        this.setState({
            editUserModal : !this.state.editUserModal,
            optionRole: this.state.optionRole
        })
    }

    // handler form data edit
    onChangeEditUserHandler=(e)=>{
        let {editUserData} = this.state
        editUserData[e.target.name] = e.target.value
        this.setState(({editUserData}) => ({
            ...editUserData,
            [e.target.name]: e.target.value
          }));

    }

    // function untuk get data edit
    editUser = (id, username, email, roles)=>{
        // console.log(name) variable name ini dikirim ke value modal form edit
        this.setState({
            editUserData:{id, username, email, roles},
            editUserModal: !this.state.editUserModal,
            optionRole: this.state.optionRole

        })
        
    }
    
    updateUser =()=>{
        let { id, username, email, roles} = this.state.editUserData;
        this.setState({
            isLoading: true,
        });
        // console.log(name)
        axios.put('http://localhost:3001/api/users/'+id, {username,email,roles})
        .then((res)=>{
            Swal.fire({
                title: 'Data Berhasil di Update.',
                text: res.data.data,
                type: 'success',
              });
            this.getUser()
            this.setState({
                editUserModal: false,
                editUserData:{username,email,roles},
                isLoading:false
            })
        })
        .catch((error)=>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message
              });
            this.setState({isLoading:false, editUserModal:false})
        })
          
    }


    deleteUser = (id) => {
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
                axios.delete('http://localhost:3001/api/users/'+id)
                .then((res)=>{
                    Swal.fire({
                        title: 'Data Berhasil dihapus.',
                        text: res.data.data,
                        type: 'success',
                    });
                    this.setState({isLoading:false})
                    this.getUser()
                })
            }
            if(result.dismiss === 'cancel'){
                Swal.fire("Cancel Berhasil!");
                this.setState({isLoading:false})
            }
        });
    }

    render(){
        const {users, newUserData, editUserData} = this.state;
        let userDetails = []
        let noRole = ''
        if(users.length){
            userDetails = users.map((user)=>{
                if(user.roles === ''){
                    noRole = '-'
                }
                else{
                    noRole= user.roles[0].role
                }
                return <tr key={user.id}>
                <td>#</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{noRole}</td>
                <td>
                    <div className="d-flex align-items-center">
                        <button type="button" className="btn btn-info btn-sm mr-3" size="sm" onClick={()=>{
                            (
                                this.editUser(user.id, user.username,user.email, user.roles[0].id)
                            )}}>
                            <i className="fas fa-pencil-alt"></i> 
                            Edit
                        </button>
                        <button type="button" className="btn btn-danger btn-sm mr-3" size="sm" onClick={(e)=>{
                            (
                                this.deleteUser(user.id)
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
                                    <h1>Users</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                                    <li className="breadcrumb-item active">Users</li>
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
                                            <h3 className="card-title"><strong>List Data Users</strong></h3>
                                            <AddUser
                                                togglenewUserModal = {this.togglenewUserModal}
                                                newUserModal = {this.state.newUserModal}
                                                optionRole = {this.state.optionRole}
                                                onChangeAddUserHandler = {this.onChangeAddUserHandler}
                                                onChangeEditUserHandler = {this.onChangeEditUserHandler}
                                                onKeyPressAdd = {this.onKeyPressAdd}
                                                addUser = {this.addUser}
                                                newUserData = {newUserData}
                                            />
                                             <EditUser
                                                toggleEditUserModal = {this.toggleEditUserModal}
                                                editUserModal = {this.state.editUserModal}
                                                onChangeEditUserHandler = {this.onChangeEditUserHandler}
                                                // onKeyPressEdit = {this.onKeyPressEdit}
                                                optionRole = {this.state.optionRole}
                                                editUser = {this.editUser}
                                                editUserData = {editUserData}
                                                updateUser = {this.updateUser}
                                            />
                                            <br/><br/>
                                            <li>Total Users :  <i className="text-center"> {this.state.count}</i>  </li>                      
                                        </div>                                        
                                        <div className="card-body">
                                            <table id="example2" className="table table-bordered table-hover">
                                                <thead>
                                                    <tr>
                                                    <th>#</th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Role</th>
                                                    <th>Action</th>
                                                    </tr>
                                                </thead>
                                                {users.length === 0?(
                                                    <tbody>
                                                    {/* <h3>{noDataFound}</h3> */}
                                                    </tbody>
                                                ):(   
                                                    <tbody>
                                                    {userDetails}
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