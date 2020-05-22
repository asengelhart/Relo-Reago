import React from 'react';
import {connect} from 'react-redux';
import {checkUser} from './actions/users';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import MainNavBar from './components/MainNavBar';
import NewUser from './containers/NewUser';
import Login from './containers/Login';
import Logout from './components/Logout';
import TranslationPage from './containers/TranslationPage';
import TranslationContainer from './containers/TranslationContainer';
import TranslationForm from './components/TranslationForm';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.props.checkUser();
  }

  render() {
    return (
      <Router>
        <div className="container">
          <MainNavBar loggedIn={this.props.loggedIn} />
          <Route exact path='/login' render={() => <Login />} />
          <Route exact path='/logout' render={() => <Logout />} />
          <Route exact path='/new_user' render={() => <NewUser />} />
          <Route exact path="/translations/new" render={() => <TranslationForm />} />
          <Route path='/translations/:id' 
                 render={routerProps => {
                   return (
                     <TranslationPage {...routerProps} 
                     translation={routerProps.match.params.id} 
                     />)} 
                    }
          />
          <Route exact path='/' render={() => <TranslationContainer />} />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {loggedIn: !!state.user.currentUser}
}

const mapDispatchToProps = dispatch => {
  return { checkUser: () => dispatch(checkUser()) }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);