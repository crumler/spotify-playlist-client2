import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NewPlaylist from './NewPlaylist';
import Main from './Main';
import EditPlaylist from './EditPlaylist';

class Routes extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/"><Main /></Route>
                    <Route exact path="/newplaylist"><NewPlaylist /></Route>
                    <Route exact path="/editplaylist"><EditPlaylist /></Route>
                </Switch>
            </Router>

        )
    }
};

export default Routes;