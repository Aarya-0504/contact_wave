import {  useContext, useEffect ,useState} from "react";
import { Modal } from 'react-bootstrap';
import Spinner from "../components/Spinner";
import { Link, useNavigate } from "react-router-dom";
import ToastContext from "../context/ToastContext";

const AllContact=()=>{
    const [contacts,setContacts]=useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal,setShowModal]=useState(false);
    const [modalData,setModalData]=useState({});
    const [searchInput,setSearchInput]=useState("");
    const {toast}=useContext(ToastContext);
    useEffect(() => {
     
        setLoading(true);
        async function fetchData() {
          try {
            const res = await fetch(`http://localhost:8000/api/mycontacts`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });
            const result = await res.json();
            if (!result.error) {
              console.log(result);
              setContacts(result.contacts);
              setLoading(false); // Assuming this is where you're updating contacts
            } else {
              console.log(result);
              setLoading(false);
            }
          } catch (e) {
            console.log(e);
          }
        }
      
        fetchData();
      }, []); // Empty dependency array means this effect runs only on mount and unmount
      
    //Deleting the contact
    const deleteContact= async (id)=>{
        if (window.confirm("are you sure you want to delete this contact ?")){
            try{
                const res = await fetch(`http://localhost:8000/api/delete/${id}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });
            const result = await res.json();
            if (!result.error) {
              setContacts(result.myContacts);
              toast.success("Deleted contact");
              setShowModal(false);
            } else {
              toast.error(result.error);
            }
    
            }catch(e){
                console.log(e);
            }
        }
    }  

    const handleSearchSubmit = (event)=>{
      event.preventDefault();

      const newSearchUser=contacts.filter((contact)=>contact.name.toLowerCase().includes(searchInput.toLowerCase()));
      console.log(newSearchUser);
    setContacts(newSearchUser);
    }

    return (<>
    <div >
        <h2>Contact List</h2>
        <hr className="my-4" />
        {loading ? (
          <Spinner splash="Loading Contacts..." />
        ) :(
            <> {contacts.length == 0 ? (
            <h3>No contacts created yet</h3>
            ) : (
             <>
             <form className="d-flex" onSubmit={handleSearchSubmit}>
              <input 
                type="text"
                name="searchInput"
                id="searchInput"
                className="form-control my-2"
                placeholder="Search for Contact"
                value={searchInput}
                onChange={(e)=> setSearchInput(e.target.value)}
                />
             <button type="submit" className="btn btn-info mx-2">Search</button>
             </form>
             <p className="text-muted">Total Contacts are:<strong>{contacts.length}</strong></p>
        <table className="table table-hover">
        <thead>
          <tr className="table-dark">
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">Email-id</th>
            <th scope="col">Contact Number</th>
            <th scope="col">Age</th> 
          </tr>
        </thead>
        <tbody>
        {contacts.map((contact)=>(
           <tr key={contact._id} onClick={()=>{
            setShowModal(true);
            setModalData(contact);
           }}>
           <th scope="row">{contact.name}</th>
             <td>{contact.address}</td>
             <td>{contact.email}</td>
             <td>{contact.phone}</td>
             <td>{contact.age}</td>
           </tr>
        ))}
         
       
        </tbody>
      </table>
      </>
      )} 
       </>
    )}
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalData.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h3>{modalData.name}</h3>
          <p>
            <strong>Address</strong>: {modalData.address}
          </p>
          <p>
            <strong>Email</strong>: {modalData.email}
          </p>
          <p>
            <strong>Phone Number</strong>: {modalData.phone}
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Link className="btn btn-info" to={`/edit/${modalData._id}`}>
            Edit
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => deleteContact(modalData._id)}
          >
            Delete
          </button>
          <button
            className="btn btn-warning"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        </Modal.Footer>

        </Modal>
    </>
    
        );
};

export default AllContact;


