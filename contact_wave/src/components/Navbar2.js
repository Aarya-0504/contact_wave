import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

const Navbar2 = ({ title = "ContactWave" }) => {
  const {toast}=useContext(ToastContext);
  const navigate=useNavigate();
  const {usar,setUsar}=useContext(AuthContext);
  return (
    <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div class="container-fluid">
        <Link to="/">
          <a class="navbar-brand" >{title}</a></Link>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarColor01">
          <ul class="navbar-nav me-auto">
            {usar ? <>

              <li className="nav-item">
                  <Link to="/mycontacts">
                    <a className="nav-link">My Contacts</a>
                  </Link>
                </li>
              <li className="nav-item">
                  <Link to="/create">
                    <a className="nav-link">Create</a>
                  </Link>
                </li>
            <li class="nav-item" onClick={()=>{
              setUsar(null);
              localStorage.clear();
              toast.success("Logged out");
              navigate("/login",{replace:true});
            }}>
              <button className="btn btn-danger ">Logout</button>
            </li></>: <><li class="nav-item">
              <Link to="/register">
                <a class="nav-link " >Register
                </a>
              </Link>

            </li>
            <li class="nav-item">
              <Link to="/login">
                <a class="nav-link " >Login
                </a>
              </Link>
            </li></> }
            
            


          </ul>

        </div>
      </div>
    </nav>
  )
}

export default Navbar2;