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
          <Route path='/user' render={routerProps => <UserPage {...routerProps} />} />
          <Route path='/translation' 
                 render={routerProps => <TranslationCard {...routerProps} translations={this.props.translations} />} 
          />
        </div>
      </Router>
    );
  }
}

export default App;
