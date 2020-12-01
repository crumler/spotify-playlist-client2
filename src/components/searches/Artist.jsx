import React, { Component } from 'react';
import Credentials from '../Credentials';
import SearchIcon from '@material-ui/icons/Search';
import { Grid, TextField, InputAdornment } from '@material-ui/core';
import Button from '@material-ui/core/Button';


class ArtistSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: '',
            artist: '',
            album: ''
        }
    };

    // spotify = Credentials();

    // artistSearchUrl = `https://api.spotify.com/v1/artists/${id}`;

    componentDidMount() {
        // let clientCredentials = {this.props.ClientId}
        console.log(btoa(this.props.ClientID + ':' + this.props.ClientSecret))
        let token = 'Basic ' + btoa(`${this.props.ClientID}:${this.props.ClientSecret}`)
        let idBtoA = btoa(this.props.ClientID);
        let secretBtoA;
        fetch(`https://localhost:5040/login`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic 0dfcb20156444bc6a0b6807bd36a15f8:161c05b86cae409b925efd8f10100576'
            }
        })

            .then(function (result) {
                return result.json();
            }).then(function (json) {
                // displayArtistResults(json);
                console.log(json);
            });
    }
    render() {
        return (
            <div>
                <SearchIcon />
                <TextField placeholder='search for artist' style={{ backgroundColor: 'white', borderRadius: '10px' }} />
                {/* <Button results={displayArtistResults} /> */}
            </div>
        )
    }
};

export default ArtistSearch;