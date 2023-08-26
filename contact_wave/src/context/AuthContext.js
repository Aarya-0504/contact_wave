import { createContext, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import ToastContext from "./ToastContext";

 const AuthContext=createContext();

export const AuthContextProvider = ({children})=>{
    const navigate=useNavigate();
    const { toast } = useContext(ToastContext);
    const location=useLocation();
    const [usar,setUsar]=useState(null);
    const [error, setError] = useState(null);

    useEffect(()=>{
        checkUserLoggedIn();
    },[]);

//check if user logged in
const checkUserLoggedIn=async ()=>{
    try{
        const res = await fetch(`http://localhost:8000/api/me`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          const result = await res.json();
        
          if(!result.error){
           // console.log(result);
           if (!result.error) {
            if (
              location.pathname === "/login" ||
              location.pathname === "/register"
            ) {
              setTimeout(() => {
                navigate("/", { replace: true });
              }, 500);
            } else {
              navigate(location.pathname ? location.pathname : "/");
            }
            setUsar(result);
          } else {
            navigate("/", { replace: true });
          }
          }else{
            toast.error(result.error);
          }
    }catch(e){
        console.log(e);
    }
}

//register request
const registerUser=async(userData)=>{
    try{
        const res = await fetch(`http://localhost:8000/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userData }),
      });
      const result = await res.json();

      if (!result.error) {
       //console.log(result)
       toast.success("User registered successfully, Now pls login");
       navigate("/login",{replace:true});
      } else {
        toast.error(result.error);
      }
    }catch(e){
        console.log(e);
    }
}
//login request
const loginUser=async(userData)=>{
    try {
        const res = await fetch(`http://localhost:8000/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...userData }),
        });
        const result=await res.json();
        if(!result.error){
            //console.log(result);
            console.log(result.usar);
            localStorage.setItem("token",result.token);
            setUsar(result.usar);
            toast.success(`Logged in as ${result.usar.name} successfully!`);
            navigate("/", { replace: true });
           // console.log(user)
        }else{
           toast.error(result.error); 
        }
        //console.log(user);
    }catch(e){
        console.log(e);
    }
}
    
    return <AuthContext.Provider value={{loginUser, registerUser,usar,setUsar}}>
        
        {children}</AuthContext.Provider>;
};

export default AuthContext;