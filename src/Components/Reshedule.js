import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import './Reshedule.css'

const Reshedule=({user})=> {
  const history=useHistory()
  const {fleet}=useParams()
  const[sDat,setSDat]=useState('')
  const[eDat,setEDat]=useState('')
  const [valid,setValid]=useState(false)
      const d=new Date()
      const mm=d.getMonth()+1
      const today= d.getFullYear()+'-'+mm+'-'+d.getDate()
      console.log(today)
 
  useEffect(() => {
      const apiCall=async()=>{
        const res=await axios.patch(`http://localhost:4000/bookings/${fleet}`,
        {
                "startDate": sDat,
                "endDate":eDat
        })

        console.log(res)
      }

      if(valid && user!==''){
          apiCall()
          history.push('/bookings')
          
      }
      if(user==='')
      {alert('not valid')}
  }, [valid])

    const handleSubmit=(e)=>{
      e.preventDefault()
           
      if(sDat!=='' && eDat!==''){
          if(new Date(today)>new Date(sDat)){
            alert('Start Date cannnot be before today')
            }
            else if(new Date(sDat)>new Date(eDat)){
              alert('End date should be after start date')
            }
          else{setValid(true)}
      }
      else{
          setValid(false)
      }
    } 

    return (
        <div className='main_resh'>
        <div className='sec_resh'>
        <form onSubmit={handleSubmit}>
           <h2>Reschule</h2>
           <br/>
               <label>Start Date</label>
               <input onChange={(e)=>{setSDat(e.target.value)}} min={today} value={sDat} type='date' /><br />
               <label>End Date</label>
               <input onChange={(e)=>{setEDat(e.target.value)}} value={eDat} type='date' /><br /><br />
           <button type='submit'> Reschule</button>
          </form>
        </div>
        </div>
    )
}

export default Reshedule
