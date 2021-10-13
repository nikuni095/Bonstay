import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import './AddReview.css'

const AddReview = ({user}) => {
    const[userId,setUserId]=useState('')
    const[newReview,setnewReview]=useState('')
    const[initReview,setInitReview]=useState([])
    const[finalReview,setFinalReview]=useState([])
    const param=useParams()

    useEffect(() => {

        const fetchId=async()=>{
          const {data}=await axios.get(`http://localhost:4000/hotels?hotelname=${param.hotelName}`)
           setInitReview(data[0].reviews)
           setUserId(data[0].id)
        }
        if(user!==''){
        fetchId()}

        const postReview=async()=>{
            const res = await axios.patch(`http://localhost:4000/hotels/${userId}`,{
                reviews:finalReview
            })
            if(res.status===200){
                alert('Review Submitted')
                setnewReview('')
            }
            else{
                alert('something went wrong')
                setnewReview('')
            }
        }

        if(user!=='' && newReview!==''){
            postReview()
        }
    }, [user,finalReview])
    const handleSubmit=()=>{
         if(newReview!==''){
            const fArray=[...initReview,newReview]
            setFinalReview(fArray)
         }
         else{
             alert('Please do Review before submiting')
         }
     }
     
    return (<>
        <div className='addR_main'>
        <div className='addR_sec'>
        <h2>Your Review Means a Lot For Us.</h2>
        <label>Add your Review</label><br />
        <textarea required value={newReview} maxLength='50' placeholder='Write your Review here in less than 50 character' onChange={(e)=>{setnewReview(e.target.value)}}/><br />
        <button onClick={handleSubmit} type='submit'>Add Review</button>
        </div>
        </div>
        </>
    )
}

export default AddReview
