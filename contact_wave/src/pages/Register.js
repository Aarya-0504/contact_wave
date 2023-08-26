import { Link } from "react-router-dom";
import { useContext, useState } from "react";



  import  AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";


const Register=()=>{
  const {toast}=useContext(ToastContext);
  const {registerUser}=useContext(AuthContext);
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        confirmpassword: "",
      });

      const handleInputChange = (event) => {
        const { name, value } = event.target;
    
        setCredentials({ ...credentials, [name]: value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(credentials);
        if (
          !credentials.email ||
          !credentials.password ||
          !credentials.confirmpassword
        ) {
          toast.error("please enter all the required fields!");
          return;
        }
    
        if (credentials.password !== credentials.confirmpassword) {
          toast.error("password do not match!");
          return;
        }

        const userData = { ...credentials, confirmpassword: undefined };
        registerUser(userData);
      };




    return (<>
   
    <h3>Create an Account</h3>
    <form onSubmit={handleSubmit}>
    <div class="form-group">
      <label for="nameInput" class="form-label mt-4">Your Name</label>
      <input type="text" 
      name="name"
       class="form-control" 
       id="exampleInput"  
       placeholder="Aarya Patil"
       value={credentials.name} 
       onChange={handleInputChange}
       required
       />
      <small id="emailInput" class="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div class="form-group">
      <label for="emailInput" class="form-label mt-4">Email address</label>
      <input type="email" 
      name="email"
       class="form-control" 
       id="exampleInput" 
       aria-describedby="emailHelp" 
       placeholder="Enter email"
       value={credentials.email} 
       onChange={handleInputChange}
       required
       />
      <small id="emailInput" class="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div class="form-group">
      <label for="passwordInput" class="form-label mt-4"> Password
          </label>
          <input
            type="password"
            class="form-control"
            id="passwordInput"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            placeholder="Enter Password"
            required
       /> 
      <small id="passwordInput" class="form-text text-muted"></small>
    </div>

    {/* Confirm Password */}
    <div class="form-group">
      <label for="confirmpassword" class="form-label mt-4">Confirm Password</label>
      <input 
      type="password" 
      name="confirmpassword" 
      class="form-control" 
      id="confirmpasswordInput" aria-describedby="emailHelp" 
      placeholder="Enter Password"
      value={credentials.confirmpassword} 
       onChange={handleInputChange}
       required
      /> 
      <small id="passwordInput" class="form-text text-muted"></small>
    </div>

      <input type="submit" value="Register" className="btn btn-primary my-3"></input>
      <p>Already have an Account? <Link to="/login" >Login</Link></p>
    </form>
    </>)
}
export default Register;