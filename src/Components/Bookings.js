import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Bookings.css'
import Reshedule from './Reshedule'

const Bookings=({user})=> {
   const[res,setRes]=useState([])
   const[delStatus,setDelStatus]=useState('')

   

   useEffect(() => { 
           
      const apiCall=async()=>{
         
            const {data}=await axios.get(`http://localhost:4000/bookings?user=${user}`)
            console.log(data)
            setRes(data) 
            }

         if(user!=''){
           apiCall()
           }

   }, [user,delStatus])

   const handleDelete=async(del_id)=>{
       const id=del_id
       console.log(del_id)
    const call=await axios.delete(`http://localhost:4000/bookings/${id}`)
    setDelStatus(call.status)

}

   const itemList=()=>{
       if(res.length!=0){
           const lists=res.map((list,i)=>{
               let path="/Reshedule/"+list.id
               return(
                <div className='card_book' key={i}>
                <h3>B-00{i}</h3>
                <div className='txt_book'>
                    <p>Hotel Name: {list.hotelName}</p>
                    <p>Start Date :{list.startDate}</p>
                    <p>End Date :{list.endDate}</p>
                    <p>No of Persons :{list.noOfPersons}  No of Rooms: {list.noOfRooms}</p>
                    <p>Type of Room :{list.typeOfRoom}</p>
                </div>
                <div className='btn_main'>
                    <button type='button'><Link className='text-white nav-link' to={path}>Reschuled</Link></button>
                    <button type='button' className='text-white nav-link' onClick={()=>handleDelete(list.id)}>Cancel</button>
                </div>
            </div>
               )
           })
           return (lists) 
       }

   }
    
    return (
        
        <div className='sec_book'>
           {itemList()}
        </div>
        
    )
}

export default Bookings