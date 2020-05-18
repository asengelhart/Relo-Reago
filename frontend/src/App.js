import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import MainNavBar from './components/MainNavBar';
import NewUser from './containers/NewUser';
import Login from './containers/Login';
import TranslationContainer from './containers/TranslationContainer';
import TranslationForm from './components/TranslationForm';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container">
          <MainNavBar />
          <Route exact path='/' render={() => <TranslationContainer />} />
          <Route exact path='/login' render={() => <Login />} />
          <Route exact path='/new_user' render={() => <NewUser />} />
          <Route exact path="/translations/new" render={() => <TranslationForm />} />
        </div>
      </Router>
    );
  }
}

export default App;
