import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Login from './components/site/Login';
import Footer from './components/site/Footer';
import Main from './components/site/Main';
import NewPlaylist from './components/site/NewPlaylist';
import EditPlaylist from './components/site/EditPlaylist';
import Navbar from './components/site/Navbar';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      sessionToken: '',
      open: false,
      isAuthenticated: false
    }
    this.handleSessionTokenUpdate = this.handleSessionTokenUpdate.bind(this)
    this.openFalse = this.openFalse.bind(this)
    this.openTrue = this.openTrue.bind(this)
  }

  // var updateToken = (newToken: string) => {
  //   localStorage.setItem('token', newToken);
  //   setSessionToken(newToken);
  // };

  componentWillMount() {
    if (localStorage.getItem('token')) {
      let token = localStorage.getItem('token')
      console.log(token)
      if (token) {

        this.setState({
          sessionToken: token,
          isAuthenticated: true
        })
      }
    }

  };

  handleSessionTokenUpdate(newToken) {
    localStorage.setItem('token', newToken)
    this.setState({
      sessionToken: newToken,
      isAuthenticated: true
    })
  };

  clearToken() {
    localStorage.clear();
    this.setState({
      sessionToken: '',
      isAuthenticated: false
    })
  };

  openTrue() {
    this.setState({
      ...this.state,
      open: true
    })
  }

  openFalse() {
    this.setState({
      ...this.state,
      open: false
    })
  }

  protectedViews() {
    // let sessionToken;
    // this.setState({
    //   sessionToken: ''
    // })

    if (this.state.isAuthenticated) {
      return (<div className='App'>

        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/newplaylist"><NewPlaylist sessionToken={this.state.sessionToken} /></Route>
            <Route exact path="/editplaylist"><EditPlaylist sessionToken={this.state.sessionToken} /></Route>
            <Route path="/"><Main sessionToken={this.state.sessionToken} /></Route>

          </Switch>
        </Router>
        <Footer />
      </div>)
    } else {
      return (<Login updateToken={this.handleSessionTokenUpdate} open={this.state.open} onClose={this.openFalse} onOpen={this.openTrue} />)
    };

    // return (this.state.sessionToken === localStorage.getItem('token') ? <Main classes={this.classes} token={this.state.sessionToken} clickLogout={this.clearToken.bind(this)} />
    //   : <Login updateToken={this.handleSessionTokenUpdate.bind(this)} open={this.state.open} onClose={this.openFalse.bind(this)} onOpen={this.openTrue.bind(this)} />)
  };


  render() {
    return (
      // <div className='App'>
      //   <Router>
      //     <Switch>
      //       {this.protectedViews()}
      //       <NewPlaylist />
      //     </Switch>
      //   </Router>
      //   <Footer />
      // </div>
      <div>
        {this.protectedViews()}
      </div>
    )
  }
};

export default App;