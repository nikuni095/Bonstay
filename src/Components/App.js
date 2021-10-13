import React,{useState,useEffect} from 'react'
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom'

import Register from './Register'
import Login from './Login'
import image from '../hotel_back.jpg'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './Navigation'
import Home from './Home'
import Hotels from './Hotels'
import Bookings from './Bookings'
import Reshedule from './Reshedule'
import BookRoom from './BookRoom'
import AddReview from './AddReview'
import ViewReview from './ViewReview'

 

const App=()=> {
    var [flag,setFlag]=useState(false)
    const[user,SetUser]=useState('')
useEffect(() => {
    console.log("logged in:"+flag+user)
}, [flag])

    const isLogin=(loginStatus,email)=>{
        setFlag(loginStatus)
        SetUser(email)
    }

    
    return (
        <div style={{background:`url(${image})`,minHeight:'100vh',minWidth:'100vw',backgroundPosition:'center',backgroundRepeat:'no-repeat', backgroundAttachment:'fixed'}}>
            <BrowserRouter>
                <Navigation flag={flag} />
                <Switch>
                <Route exact path='/register' component={Register} />
                <Route exact path='/login'><Login isLogin={isLogin}/></Route> 
                <Route exact path='/home'><Home /></Route> 
                <Route exact path='/hotels'><Hotels flag={flag}/></Route>
                <Route exact path='/bookings'><Bookings flag={flag} user={user} /></Route>
                <Route exact path='/reshedule/:fleet' ><Reshedule user={user} /> </Route>
                <Route exact path='/bookRoom/:hotelName' ><BookRoom user={user} /> </Route>
                <Route exact path='/addReview/:hotelName' ><AddReview user={user} /> </Route>
                <Route exact path='/viewReview/:hotelName' ><ViewReview user={user} /> </Route>
                <Route path='*'  render={()=>(<Redirect to='/login' />)} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App
