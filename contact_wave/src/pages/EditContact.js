import { useContext, useEffect ,useState} from "react";
import React from 'react';
import ToastContext from "../context/ToastContext";
//import AuthContext from "../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";


const EditContact=()=>{
    const navigate=useNavigate();
    const {id}=useParams();
   // const {usar}=useContext(AuthContext)
    const { toast } = useContext(ToastContext);

    const [loading, setLoading] = useState(false);

    const [userDetails, setUserDetails] = useState({
        name: "",
        address: "",
        email: "",
        phone: "",
        age:"",
      });


    const handleSubmit=async (event)=>{
        event.preventDefault();
        const res=await fetch(`http://localhost:8000/api/contact`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({id,...userDetails}),
        });
        const result=await res.json();
        if(!result.error){
            console.log(result);
            toast.success(`Updated [${userDetails.name}] contact`);
          
            setUserDetails({ name: "", address: "", email: "", phone: "",age:"" });
           
             //navigate("/mycontacts");
        }else{
            console.log(result);
            toast.error(result.error);
        }
    }

    const handleInputChange=(event) =>{
        const {name,value}=event.target;

        setUserDetails({...userDetails,[name]:value});
    }

    //using effect while editing result
    useEffect(async () => {
        setLoading(true);
        async function datafetch(){
            try {
                const res = await fetch(`http://localhost:8000/api/contact/${id}`, {
                  method: "GET",
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                });
                const result = await res.json();
                console.log(result);
                setUserDetails({
                  name: result.name,
                  email: result.email,
                  address: result.address,
                  phone: result.phone,
                  age: result.age,
                });
                setLoading(false);
              } catch (err) {
                console.log(err);
              }
        }
        datafetch();
      }, []);

    return (<>
    {/* <h2>Create your contact</h2> */}
    {loading ? (
        <Spinner splash="Loading Contact..." />
      ) : ( <>
    <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nameInput" className="form-label mt-4">
            Name Of Person
          </label>
          <input
            type="text"
            className="form-control"
            id="nameInput"
            name="name"
            value={userDetails.name}
            onChange={handleInputChange}
            placeholder="John Doe"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="addressInput" className="form-label mt-4">
            Address Of Person
          </label>
          <input
            type="text"
            className="form-control"
            id="addressInput"
            name="address"
            value={userDetails.address}
            onChange={handleInputChange}
            placeholder="WalkStreet 05, California"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="emailInput" className="form-label mt-4">
            Email Of Person
          </label>
          <input
            type="email"
            className="form-control"
            id="emailInput"
            name="email"
            value={userDetails.email}
            onChange={handleInputChange}
            placeholder="johndoe@example.com"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneInput" className="form-label mt-4">
            Phone Number Of Person
          </label>
          <input
            type="number"
            className="form-control"
            id="phoneInput"
            name="phone"
            value={userDetails.phone}
            onChange={handleInputChange}
            placeholder="+91 123567890"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="ageInput" className="form-label mt-4">
            Age Of Person
          </label>
          <input
            type="number"
            className="form-control"
            id="ageInput"
            name="age"
            value={userDetails.age}
            onChange={handleInputChange}
            placeholder="xx"
            required
          />
        </div>
        
        <input
          type="submit"
          value="Save Changes"
          className="btn btn-info my-2"
        />
        
        </form>
      
      </>
      )}
    

    
    </>
    )
}
export default EditContact;