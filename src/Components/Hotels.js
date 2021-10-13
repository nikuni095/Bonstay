import React from 'react'
import './Hotel.css'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ViewReview from './ViewReview'

const Hotels=({flag})=>{
  const [res,setRes]=useState([])
   const loggedin=flag
  useEffect(() => {
      const fetchHotel=async()=>{
          const {data}=await axios.get('http://localhost:4000/hotels')
          setRes(data)
      }
      if(loggedin){
      fetchHotel()}
  }, [])

  const listitem=()=>{
      if(res.length>0){
          return (res.map((each,i)=>{
              const bookLink='/bookRoom/'+each.hotelname
              const addReview='/addReview/'+each.hotelname
              const viewReview='/viewReview/'+each.hotelname
              return (
                <div key={i} className='sec_hotel'>
                <div className='imag'><img src={each.imgUrl}></img></div>
                <div className='txt'>
                    <h2>{each.hotelname}</h2>
                    <div>
                    <p>City: {each.City}</p>
                    <p>Amenities:{each.Amenities}</p>
                    <p>Address:{each.Address}</p>
                    <p>Container No. {each.Contact}</p>
                    </div>
                </div>
                <div className='btn'>
                    <button><Link className='text-white text' to={bookLink}>Book A Room</Link></button>
                    <button><Link className='text-white text' to={addReview}>Add Review</Link></button>
                    <button><Link className='text-white text' to={viewReview}>View Review</Link></button>
                </div>
                </div>
              )
          }))
      }
  }

    return (
        <div className='main_hotel'>
           {listitem()}    
        </div>
    )
}

export default Hotels
