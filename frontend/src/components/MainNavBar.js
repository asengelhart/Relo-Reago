import React from 'react';
import { Navbar } from 'react-materialize';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'

const MainNavBar = (props) => {
  const loginOrLogout = () =>{
    if(!props.loggedIn) {
      return <NavLink to='/login'>Login / Ensaluti</NavLink>
    } else {
      return <NavLink to='/logout'>Logout / Adiaŭi</NavLink>
    }
  }

  return (
    <Navbar>
      {loginOrLogout()}
      <NavLink to='/'>
        Dictionary / Vortaro
      </NavLink>
    </Navbar>
  )  
}

export default MainNavBar;