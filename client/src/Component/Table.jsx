import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { EditBox } from './EditBox';
export const Table = () => {
    const [user,setUser] = useState([])
    const [Avilable,setAvilable] = useState(false)
    const [editUsers,seteditUser] = useState({
        username:"",
        email:"",
        id:""
    })
    const getUser = ()=>{
        axios.post(`/userList`)
        .then(response => {
            setAvilable(true)
        console.log(response.data)  
        setUser(response.data)
        }).catch((err)=>{
            setAvilable(false)
        });
    }
    useEffect(()=>{
        
    getUser()
        
    },[])
    const editUser = (e) =>{
        document.getElementById('EditBox').style.display = "block"
        seteditUser({
            username:e.target.value,
            email:e.target.name,
            id:e.target.id
        })
        console.log(e.target.value)
        console.log(e.target.name)
        console.log(e.target.id)
    }
    const usersDelete = (e) =>{
        console.log(e.target.name)
        let url = `/userDelete/` + e.target.name
        axios.delete(url)
        .then(response => {
        getUser()
        console.log(response.data)  
       
        }).catch((err)=>{
            
        });
    }
    var UserList = user.map((data)=>{
        console.log(data)
        return<><tbody><tr><td>{data.username}</td><td>{data.email}</td><td style={{display:"flex"}}><button onClick={editUser} name={data.email} id={data._id} value={data.username} >edit</button><button onClick={usersDelete} name={data._id}>delete</button></td></tr></tbody></>
    })
    var None = ()=>{
        return(<><tbody><tr><td colSpan={3}>No Data Avilable please check database connection</td></tr></tbody></>)
    }
     
    
        
    
  return (<div className="table-wrapper">
       
    <table className="fl-table">
        <thead>
        <tr>
          
            <th>Username</th>
            <th>Email</th>
            <th>Action</th>
            
        </tr>
        </thead>
        {Avilable?UserList:<None/>}
        <div id="EditBox" style={{display:"none"}}>
            <EditBox update={getUser}id={editUsers.id} email={editUsers.email} username={editUsers.username}  />
        </div>
        </table>
        
        
        </div>);
};
