import React from "react";
import {Navbar,Nav, Container} from 'react-bootstrap'
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

const Navigation =({flag})=>{
    const history=useHistory()
  const handleNav=()=>{
    if(flag){
      return(
        <Navbar bg="dark" style={{height:'60px',color:'rgb(125, 89, 89)'}}>
          <Navbar.Brand className='nav-link text text-white' style={{fontFamily:'Brush Script MT',fontSize:'40px'}}>  BonStay</Navbar.Brand>
          <Container>
            <Navbar.Collapse className="justify-content-end">
            <Nav.Link><Link className='nav-link text text-white'to='/home'>Home</Link></Nav.Link>
            <Nav.Link><Link className='nav-link text text-white'to='/hotels'>Hotels</Link></Nav.Link>
            <Nav.Link><Link className='nav-link text text-white'to='/bookings'>Bookings</Link></Nav.Link>
            <Nav.Link><Link className='nav-link text text-white'to='/login'>Logout</Link></Nav.Link>
            </Navbar.Collapse>
            </Container>
        </Navbar>
      )}
      else {
        history.push('/login')
        return(
          <Navbar bg="dark" style={{height:'60px',color:'rgb(125, 89, 89)'}} >
          <Navbar.Brand className='nav-link text text-white' style={{fontFamily:'Brush Script MT',fontSize:'40px'}}>  BonStay</Navbar.Brand>
            <Container>
              <Navbar.Collapse className="justify-content-end">
              </Navbar.Collapse>
              </Container>
          </Navbar>
        )
      }
    
  }

 return(
   <div style={{position: 'sticky',top:'0px', width:'100%',zIndex:1}} >
   {handleNav()}</div>
    )
}

export default Navigation;