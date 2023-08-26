import { Link } from "react-router-dom";
import { useContext, useState } from "react";

// import { ToastContainer, toast } from 'react-toastify';
//   import 'react-toastify/dist/ReactToastify.css';
import  AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

const Login=()=>{
const {loginUser}=useContext(AuthContext);

const {toast}= useContext(ToastContext)

const [credentials,setCredentials]=useState({
    email:"",
    password:"",
});

const handleInputChange=(event)=>{
    const {name,value}=event.target;

    setCredentials({...credentials,[name]: value});
};

const handleSubmit=(e)=>{
    e.preventDefault();
  toast.success("Logging in the user")
    if (!credentials.email || !credentials.password) {
        toast.error("Please enter all the required fields!");
        return;
    }
    loginUser(credentials);
}

    return (
    <>
    <h3>Login</h3>
    <form onSubmit={handleSubmit}>
        {/* //email id */}
    <div class="form-group">
      <label for="emailInput" class="form-label mt-4">Email address</label>
      <input 
        type="email" 
        name="email"
       value={credentials.email} 
       onChange={handleInputChange}
       class="form-control" 
       id="exampleInput" 
       aria-describedby="emailHelp" 
       placeholder="Enter email"
       required
       />
      <small id="emailInput" class="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    {/* //password */}
    <div class="form-group">
      <label for="passwordInput" class="form-label mt-4">Password</label>
      <input type="password" 
      name="password" 
      value={credentials.password}
      onChange={handleInputChange}
      class="form-control" 
      id="passwordInput" 
      aria-describedby="emailHelp" 
      placeholder="Enter Password"
      required
      /> 
      <small id="passwordInput" class="form-text text-muted"></small>
    </div>
{/* //confirm password */}
    


      <input type="submit" value="Login" className="btn btn-primary my-3"></input>
      <p>Don't have an Account? <Link to="/register" >Create one</Link></p>
    </form>
    </>)
}
export default Login;