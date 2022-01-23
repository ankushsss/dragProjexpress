import React,{useState} from 'react';
// import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios';
export const RegistrationForm = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
   

});


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
      if (userData.username != "" && userData.email != "" && userData.password != "") {
         
              try {
                  var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

                  let ismail = pattern.test(userData.email)
                  console.log(ismail)
                  if (ismail) {
                      const { username, email, password } = userData
                      const res = axios.post(`/register`,{ username, email, password})
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
                              window.alert("registration successfull")
                              let userInformation = result.data
                              setInfo({ userInformation })
                              window.location.reload() 
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
                  else {
                      window.alert("email is not valid")
                  }

              }
              catch (e) {
                  console.log(e)

              }
        
      }
      else {
          window.alert("fill all fileds")
      }
    }

  return (
  <div>
     <div className="login-box">
  <h2>Add User</h2>
  <form>
    <div className="user-box">
    <label>Username</label><br/>
      <input onChange={targetData} type="text" name="username" value={userData.username} required=""/>
      
    </div>
    <div className="user-box">
    <label>email</label><br/>
     <input  onChange={targetData} type="email" name="email" value={userData.email} />
      
    </div>
  
    <div className="user-box">
    <label>password</label><br/>
     <input  onChange={targetData}  type="password" name="password" value={userData.password} />
      
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
  </div>);
};
