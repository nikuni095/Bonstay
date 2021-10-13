import React,{useState,useEffect} from 'react'
import './Login.css'
import axios from 'axios'
import {Link,useHistory} from 'react-router-dom'

const Login=({isLogin})=>{
   const history=useHistory()
  const [email,setEmail]=useState('')
  const [pass,setPass]=useState('')
  const [msg,setMsg]=useState('')
  const [valid,setValid]=useState(false)
  const [res,setRes]=useState('initiate')

  useEffect(() => {
  const loginUser=async()=>{
   const response=await axios.get('http://localhost:4000/users',{
         params:{
            email:email,
            password:pass
              }
           })
        setRes(response.data.length)
        console.log(response)
  }     
      if(valid){
          loginUser()
          setValid(false)
      }
        if(res==1){
            setMsg("login successfull")
            history.push('/home')
            isLogin(true,email)
        }
        else if(res==0) {
            setMsg("user not found")
            isLogin(false,"")
        }else if(res=='initiate'){
            setMsg('')
        }
        

}, [valid,res])

 const handleSubmit=(e)=>{
      e.preventDefault()
      if(email!=='' && pass!==''){
          if(pass.length>12 || pass.length<8){
              setMsg("pass length between 8 to 12");
              setPass('');
              setValid(false);
          }
          else{
              setValid(true)
            }
        }
  }
  
    return (<React.Fragment>
        <div className='login'>
            <div className='form'>
                <form onSubmit={handleSubmit}>
                    <h2>BonStay with Us</h2>
                    <label>Email:</label><br />
                    <input onChange={(e)=>{setEmail(e.target.value)}} value={email} type='emails' required /><br/><br/>
                    
                    <label>Paasword:</label><br />
                    <input onChange={(e)=>{setPass(e.target.value);setMsg('')}} value={pass} type='text' required/><br/><br/>

                    <button type='submit'>Login</button>
                </form>
                <div className='sign'><h6><Link to='/register'>SignUp</Link> to create a new user</h6><span>{msg}</span></div>
                
            </div>
            
        </div></React.Fragment>
    )
}

export default Login
