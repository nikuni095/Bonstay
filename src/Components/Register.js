import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './Register.css'
import image from '../regis.jpg'
import {Link,useHistory} from 'react-router-dom'


const Register =()=>{
    const history=useHistory()
    const [name,setName]=useState('')
    const [address,setAddess]=useState('')
    const [phone,setPhone]=useState("")
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [msg,setMsg]=useState('')
    const [valid,setValid]=useState(false)
    const [res,setRes]=useState('')
    const reg=/[a-z0-9]+@[a-z]+\.(com|in)$/
   const userData={
       name:name,
       address:address,
       phone:phone,
       email:email,
       password:password
   }
    const headers={
        headers:{
        'Content-Type':'application/json'
    }}
    

    useEffect(() => {
        const registerUser=async()=>{
            const response= await axios.post('http://localhost:4000/users',userData,headers)
            setRes(response.statusText)
        }

        if(valid){
            registerUser()
            setValid(false)
        }
        if(res==='Created'){
            setMsg(`User Created Please login`)
            setName('');setPassword('');setPhone('');setEmail('');setAddess('');
            history.push('/login')
        }

    }, [valid,res])
    


    const handleSubmit=(e)=>{
        e.preventDefault()
        setValid(false)
        if(name!=='' && address!=='' && phone!=='' && email!=='' && password!==''){
            if(name.length<3){
                setMsg('Name have atleast 3 letter')
            }
            else if(phone.length!==10){
                setMsg('Phone Number shouldś 10 digits')
            }
            else if(!reg.test(email)){
                setMsg('Email format abcd09@xyz.com/in')
            }
            else if(password.length>12 || password.length<8){
                setMsg("between 8 and 12 characters")
            }
            else{
                setValid(true)
            }
        }
    }
   
    

    return(<>
        <div style={{display:'flex',justifyContent:'center'}}>
          <div className='formflex'>
            <img src={image} alt="photos"/>
            <div className="fr">
                <form onSubmit={handleSubmit}>
                    <label>Name:</label><br />
                    <input type='string' onChange={(e)=>{setMsg("");setName(e.target.value)}} name='name' required value={name} /><br /><br />
                    
                    <label>Addess:</label><br />
                    <input type='string' onChange={(e)=>{setMsg("");setAddess(e.target.value)}} name='address' required value={address} /><br /><br />

                    <label>Phone No.</label><br />
                    <input type='number' onChange={(e)=>{setMsg("");setPhone(e.target.value)}} name='phone' required value={phone} /><br /><br />
                    
                    <label>Email id:</label><br />
                    <input type='eamil' onChange={(e)=>{setMsg("");setEmail(e.target.value)}} name='email' required value={email} /><br /><br />
                    
                    <label>Password:</label><br />
                    <input type='string' onChange={(e)=>{setMsg("");setPassword(e.target.value)}} name='password' required value={password} /><br /><br />
                    
                    <button type='submit' className='button'>Register</button>
                </form>
                   <br/>
                <p><Link to='/login'>Login</Link> with your existing account</p>
                <p className='error'>{msg}</p>
              </div> </div>
        </div></>
    )
}

export default Register