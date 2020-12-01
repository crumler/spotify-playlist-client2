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
      open: false
    }
    this.handleSessionTokenUpdate.bind(this)
  }

  // var updateToken = (newToken: string) => {
  //   localStorage.setItem('token', newToken);
  //   setSessionToken(newToken);
  // };

  componentWillMount() {
    let token = localStorage.getItem('token')
    console.log(token)
    if (token) {

      this.setState({
        sessionToken: token
      })
    }
  };

  handleSessionTokenUpdate(newToken) {
    localStorage.setItem('token', newToken)
    this.setState({
      sessionToken: newToken
    })
  };

  clearToken() {
    localStorage.clear();
    this.setState({
      sessionToken: ''
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

    if (this.state.sessionToken === localStorage.getItem('token')) {
      return (<div className='App'>

        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/newplaylist"><NewPlaylist /></Route>
            <Route exact path="/editplaylist"><EditPlaylist /></Route>
            <Route path="/"><Main /></Route>

          </Switch>
        </Router>
        <Footer />
      </div>)
    } else {
      return (<Login updateToken={this.handleSessionTokenUpdate.bind(this)} open={this.state.open} onClose={this.openFalse.bind(this)} onOpen={this.openTrue.bind(this)} />)
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