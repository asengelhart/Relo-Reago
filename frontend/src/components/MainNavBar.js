import React from 'react';
import { Navbar } from 'react-materialize';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'

const MainNavBar = (props) => {
  return (
    <Navbar>
      <NavLink to='/login'>
        Login / Ensaluti
      </NavLink>
      <NavLink to='/'>
        Dictionary / Vortaro
      </NavLink>
    </Navbar>
  )  
}

export default MainNavBar;