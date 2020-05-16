import React from 'react';
import {BrowserRouter as Router} from 'react-router';
import MainNavBar from './components/MainNavBar';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <MainNavBar />
          <Route exact path='/' render={ <TranslationContainer />} />
          <Route path='/user/:id' render={routerProps => <UserPage {...routerProps} />} />
          <Route path='/translations/:id' 
                 render={routerProps => {
                 return (
                  <TranslationPage {...routerProps} 
                    translation={routerProps.id} 
                  />)} 
                }
          />
        </div>
      </Router>
    );
  }
}

export default App;
