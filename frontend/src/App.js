import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import MainNavBar from './components/MainNavBar';
import TranslationContainer from './containers/TranslationContainer';
import TranslationPage from './containers/TranslationPage';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container">
          <MainNavBar />
          <Route exact path='/' render={() => <TranslationContainer />} />
          {/* <Route path='/user/:id' render={routerProps => <UserPage {...routerProps} />} /> */}
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
