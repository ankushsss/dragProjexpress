import React, { useEffect, useState } from 'react';
import axios from 'axios';
export const EditBox = (props) => {
    const [userData, setUserData] = useState({
        username: props.username,
        email: props.email,
        id:props.id
    })
  useEffect(()=>{
     setUserData({
         username:props.username,
         email:props.email
     })
  },[]) 
    var [userInfo, setInfo] = useState({})
// const navigate = useNavigate()
const targetData = (e) => {
    let name = e.target.name
    let value = e.target.value
    console.log(name);
    setUserData({ ...userData, [name]: value })
    console.log(value);



    }

        const submitData = async (e) => {
          e.preventDefault();
          console.log(userData,props.id)
          
          if (userData.username != "" ) {
             
                  try {
                      
                          const { username } = userData
                          let email = props.email
                          const res = axios.put(`/edit`,{ username, email})
                          // const res = await fetch("/register", {
                          //     method: 'post',
                          //     headers: {
                          //         'content-Type': 'application/json'
                          //     },
                          //     body: JSON.stringify({
                          //         name, email, password
                          //     }),
                          //     credentials: 'include'
                          // })
    
                          .then((result) => {
                              console.log(result)
    
                              if (result.status === 200) {
                                  window.alert("edit successfull")
                                  let userInformation = result.data
                                  setInfo({ userInformation })
                                  document.getElementById("EditBox").style.display ="none"
                                  props.update()
                                  // navigate("/login")
                                  //  let use =  userInfo.userInformation.username
                                  //   history.push('/DATA/'+ userInformation.username)
    
                              }
                              else {
                                  window.alert(result)
                                  console.log(result)
                              }
                          }).catch((error) => {
                              console.log(error)
                              window.alert(error)
                          });
                    
    
                  }
                  catch (e) {
                      console.log(e)
    
                  }
            
          }
          else {
              window.alert("fill all fileds")
          }
        }
    console.log(props.id)
  return (
  <div>
     <div className="login-box" style={{position:"absolute"}}>
  <h2>EditUser</h2>
  <form>
    <div className="user-box">
    <label>Username</label><br/>
      <input onChange={targetData}  type="password" name="password" value={userData.username} type="text" name="username" value={userData.username} required=""/>
      
    </div>
    <div className="user-box">
    <label>email</label><br/>
     <input   type="email" name="email" value={props.email} type="email" name="email" required="" disabled/>
      
    </div>   
    <a onClick={submitData}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      Submit
    </a>
  </form>
</div>
  </div>
  );
};
