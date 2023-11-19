import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "./modal";
import EditModal from "./editModal";
 
const App = () => {
    let[user, setUser] = useState({firstname: "", lastname : "", email : ""})
    let[euser, setEUser] = useState({firstname: "", lastname : "", email : "", _id:""})
    let[users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [show,setShow] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };
    const handleShow = () => {
        setShow(true);
    }
    const handleHidden = () => {
         setShow(false);
    }
  const handleOpen = () => {
        setOpen(true);
       
    };
 

    let reload = () => {
        axios.get("http://localhost:5050/data")
        .then(res => setUsers(res.data) )
        .catch(err => console.log("Error ", err))
    }
    useEffect(()=>{
        reload();
    },[]);
    let editClickHandler = (hid) => {
        handleShow();
       axios.get("http://localhost:5050/edit/"+hid)
       .then(res => {
        setEUser(res.data);
       })
       .catch()
    }
    let deleteClickHandler = (hid) => {
        axios.delete("http://localhost:5050/delete/"+hid)
        .then(res => {
            console.log(res.data);
            alert(res.data.message)
            reload();
        })
        .catch(err => console.log("Error ", err))
    }
    let userDetailsChangeHandler = (evt) => {
        setUser({...user, [evt.target.id] : evt.target.value }) ;
    }
    let userDetailsUpdateHandler = (evt) => {
        setEUser({...euser, [evt.target.id] : evt.target.value }) ;
    }
 
    let addNewUser = () =>{
    
        if(user.firstname && user.lastname && user.email){
            axios.post("http://localhost:5050/data", user)
            .then( res => {
                console.log(res.data.message);
                reload();
                setUser({firstname: "", lastname : "", email : ""});
            })
            .catch(err => console.log("Error ", err ))
        }else{
            alert("add all info before submitting the form")
        }
        handleClose()
    }
    let updateUserInfo = () =>{
        if(euser.firstname && euser.lastname && euser.email){
            axios.post("http://localhost:5050/edit/"+euser._id, euser)
            .then( res => {
                console.log(res.data.message);
                reload();
                setEUser({firstname: "", lastname : "", email : "", _id:""});
            })
            .catch(err => console.log("Error ", err ))
        }else{
            alert("add all info before submitting the form")
        }
        handleHidden()
    }
    return <div className="container">
        <h1>CRUD Application with MONGO DB</h1>

        <Modal isOpen={open} onClose={handleClose} >
        <div>
            <h2>Add A New User</h2>
            <div className="mb-3">
                <label htmlFor="firstname" className="form-label">First Name</label>
                <input onChange={ userDetailsChangeHandler } value={ user.firstname } type="text" className="form-control" id="firstname" placeholder="First Name"/>
            </div>
            <div className="mb-3">
                <label htmlFor="lastname" className="form-label">Last Name</label>
                <input onChange={userDetailsChangeHandler } value={ user.lastname } type="text" className="form-control" id="lastname" placeholder="Last Name"/>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">eMail</label>
                <input onChange={userDetailsChangeHandler } value={ user.email } type="email" className="form-control" id="email" placeholder="eMail id"/>
            </div>
            <div className="mb-3">
             <button onClick={addNewUser}  className="btn btn-primary">Register</button>
             <button onClick={handleClose} className="btn btn-danger">Close</button>
            </div>
        
        </div> 
        </Modal>
        <button className="btn btn-primary" onClick={handleOpen}>Add user</button>
        
        <EditModal isShow={show} onClose={handleHidden}>
         <div>
            <h2>Edit User Info</h2>
            <div className="mb-3">
                <label htmlFor="firstname" className="form-label">First Name</label>
                <input onChange={ userDetailsUpdateHandler } value={ euser.firstname } type="text" className="form-control" id="firstname" placeholder="First Name"/>
            </div>
            <div className="mb-3">
                <label htmlFor="lastname" className="form-label">Last Name</label>
                <input onChange={userDetailsUpdateHandler } value={ euser.lastname } type="text" className="form-control" id="lastname" placeholder="Last Name"/>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">eMail</label>
                <input onChange={userDetailsUpdateHandler } value={ euser.email } type="email" className="form-control" id="email" placeholder="eMail id"/>
                <input value={ euser._id } type="hidden" />
            </div>
            <div className="mb-3">
             <button onClick={updateUserInfo} className="btn btn-primary">Update</button>
             <button onClick={handleHidden} className="btn btn-danger">Close</button>
            </div>
        </div>
        </EditModal>
      
       
 
 
        
 
        {/* <ul>
            <li>{ user.firstname }</li>
            <li>{ user.lastname }</li>
            <li>{ user.email }</li>
        </ul> */}
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">SL #</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">eMail</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(({firstname, lastname, email, _id }, idx) => <tr key={_id}>
                                        <th scope="row">{idx}</th>
                                        <td>{firstname}</td>
                                        <td>{lastname}</td>
                                        <td>{email}</td>
                                        <td><button onClick={ () => editClickHandler(_id) } className="btn btn-warning">Edit</button></td>
                                        <td><button onClick={ () => deleteClickHandler(_id) } className="btn btn-danger">Delete</button></td>
                                    </tr>
                    )
                    }                    
                </tbody>
            </table>
        </div>
}
 
export default App;
 
 
/* 
http://p.ip.fi/YWOb
*/