import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router'
import './BookRoom.css'
const BookRoom = ({user}) => {
    const [sDate,setSDate]=useState('')
    const [eDate,setEDate]=useState('')
    const [person, setPerson]=useState('')
    const [room, setRoom]=useState('')
    const [type,setType]=useState('')
    const [eMsg,setEMsg]=useState('')
    const [valid,setValid]=useState(false)
    const [status,setStatus]=useState('')
    
    const param=useParams()

    const headers={
        headers:{
        'Content-Type':'application/json'
    }}
    const pData={
        hotelName:param.hotelName,
        startDate:sDate,
        endDate:eDate,
        noOfRooms:room,
        noOfPersons:person,
        typeOfRoom:type,
        user:user
    }

    useEffect(() => {
        const postdata=async()=>{
            const res=await axios.post('http://localhost:4000/bookings',pData,headers)
            setStatus(res.statusText)
        }

        if(valid){
            postdata()
        }
        if(status!=='Created' && valid===true){
            setEMsg('')
        }
        else if(status=='Created' && valid===true){
            setEMsg('Booking completed Successfully!')
            setType('')
            setValid(false)
            setPerson('')
            setRoom('')
        }
    }, [valid,status])
     
    const handleSubmit=(e)=>{
        e.preventDefault()

        if(type!=='' && sDate!=='' && eDate!==''){
          if(sDate<eDate){
              setValid(true)
              setEMsg('') 
              }
            else{
                setEMsg('End Date should be after Start Date')
            }
        }
        else{
            setValid(false)
            setEMsg('All Feild Required')
        }

    }


    return (
        <div className='main_room'>
        <div className='sec_room'>
            <h2>Book a Rooom</h2>
            <form  onSubmit={handleSubmit}>
            <div className='f_room'>
                <label>Hotel  Name:</label><br/>
                <input type='text' value={param.hotelName} disabled/><br/>

                <label>Start Date</label><br />
                <input required onChange={(e)=>{setSDate(e.target.value)}} value={sDate} type='date' min={new Date().toISOString().split("T")[0]}/><br/>

                <label>End Date</label><br />
                <input required onChange={(e)=>{setEDate(e.target.value)}} value={eDate} type='date' min={new Date().toISOString().split("T")[0]}/><br/>

                <label>No of Persons</label><br />
                <input required onChange={(e)=>{setPerson(e.target.value)}} placeholder='Max. 6 Peoples'value={person} type='text'/><br/>

                <label>No of Rooms</label><br />
                <input required onChange={(e)=>{setRoom(e.target.value)}} placeholder='Max. 3 Rooms' value={room} /><br/>

                <label>Type of Room</label><br />
                <select  onChange={(e)=>{setType(e.target.value)}} > 
                   <option>----Choose Room Type----</option>
                    <option value='AC'>--AC--</option>
                    <option  value='Non AC'>--Non-AC--</option>
                </select>
            </div>
            <br/>
            <button type='submit'>Book</button>
            </form>
            <p className='text text-danger'>{eMsg}</p>
        </div>
           
        </div>
    )
}

export default BookRoom
