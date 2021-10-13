import axios from 'axios'
import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router'
import './ViewReview.css'

const ViewReview = ({user}) => {
    const[resReview,setResReview]=useState([])
    const param=useParams()
    
    useEffect(() => {
        const fetchReview=async()=>{
            const res=await axios.get(`http://localhost:4000/hotels?hotelname=${param.hotelName}`)
            console.log(res.data[0].reviews)
            setResReview(res.data[0].reviews)
        }
        if(user!==''){
            fetchReview()
        }
    }, [user])

    return (
        <div className='viewR_main'>
            <div className='viewR_sec'>
            <h2>Customer's Review</h2>
             {resReview.length !== 0 ? 
             resReview.map((each)=>{
               return(<>
                <p>{each}</p>
               </>)
             })
             :
              <h5>Sorry! No Review to Display</h5>}
                
            </div>
        </div>
    )
}

export default ViewReview