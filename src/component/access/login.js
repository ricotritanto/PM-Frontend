//import hook react
import React, { useState,useEffect } from 'react';
//import axios
import axios from 'axios';
//import hook useHitory from react router dom
import { useHistory } from 'react-router';

// import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

function Login() {

    //define state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //define history
    const history = useHistory();

    //hook useEffect
    useEffect(() => {

        // check token
        if(localStorage.getItem('token')) {
            // redirect page dashboard
            history.push('/dashboard');
        }
    })

    //function "loginHanlder"
    const loginHandler = async (e) => {
        e.preventDefault();
        
        //send data to server
        await axios.post('http://localhost:3001/api/auth/signin', {email,password})
        .then((response) => {
            //set token on localStorage
            localStorage.setItem('iduser', response.data.id)
            localStorage.setItem('usernya', response.data.username)
            localStorage.setItem('token', response.data.accessToken);
            //redirect to dashboard
            Swal.fire({
                title: 'Login Successfully!',
                text: response.data.username,
                type: 'success',
              })
            window.location.reload('/dashboard');
            // history.push('/dashboard')
        })
        .catch((error) => {

            //assign error to state "validation"
            Swal.fire({
                title: 'Login Failed!!',
                text: 'User and Password dont match!',
                icon: 'warning',
                confirmButtonColor: '#d63b30',
                confirmButtonText: 'back',
                timer: 2000
              })
            .then(() => {
                window.location.reload('/');
            })

            // setValidation(error.response.data);
        })
    };

    return (
        // <div>
        <div className="limiter">
		<div className="container-login100">
			<div className="wrap-login100">
				<div className="login100-pic js-tilt" data-tilt >
					<img src={"/logo.png"} alt="IMG" />
				</div>

				<form className="login100-form validate-form" onSubmit={loginHandler}>
					<span className="login100-form-title">
						Please Login
					</span>

					<div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
						<input className="input100" type="text" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-envelope" aria-hidden="true"></i>
						</span>
					</div>

					<div className="wrap-input100 validate-input" data-validate = "Password is required">
						<input className="input100" type="password"value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>
					
					<div className="container-login100-form-btn">
						<button type="submit" className="login100-form-btn">
							Login
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
    )

}
// Login.propTypes = {
//     setToken: PropTypes.func.isRequired
// }
export default Login;