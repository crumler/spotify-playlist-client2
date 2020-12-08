import React, { Component } from 'react';
import 'animate.css';
import APIURL from '../../helpers/environment';
import { ThemeProvider } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import Footer from './Footer';
import theme from '../../styles/MuiTheme';

class AddPlaylistDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            artist: '',
            album: '',
            song: '',
            playlistData: []
        }
    };

    handleSongSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        console.log(this.props.playlistIdProp);
        // fetch(`${APIURL}/playlistsong/create`, {
        fetch('http://localhost:5040/playlistsong/create', {
            method: 'POST',
            body: JSON.stringify({
                playlistsong: {
                    playlistId: this.props.playlistIdProp,
                    artist: this.state.artist,
                    album: this.state.album,
                    song: this.state.song
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.sessionToken
            })
        }).then(
            (response) => response.json()
            //below is the code for mapping live playlist details
        ).then((playlistData) => {
            this.setState({
                playlistData: playlistData,
                playlistData: [...this.state.playlistData, { artist: this.state.artist, album: this.state.album, song: this.state.song }]
            });
        });
    };

    displayLivePlaylistData() {

        console.log(this.state.playlistData);
        return this.state.playlistData.map((song) => {
            console.log(song);
            return (

                <li className="animate__animated animate__zoomIn" key={song.artist}>
                    Artist: {song.artist}
                    <br />
                    Album: {song.album}
                    <br />
                    Song: {song.song}
                </li>

            )
        })
    };

    /* <h3>{song.artist}</h3>
<h4>{song.album}</h4>
<p>{song.song}</p> */

    render() {

        return (
            <div className="animate__animated animate__zoomIn">
                <form onSubmit={this.handleSongSubmit} className={this.props.classes.root} noValidate autoComplete="off" style={{ marginTop: '2rem' }}>
                    <TextField size="small" id="outlined-basic standard-size-small" label="Artist / Band" variant="filled" style={{ backgroundColor: 'white', color: 'white', borderRadius: '10px' }} onChange={(e) => this.setState({ artist: e.target.value })} value={this.state.artist} />

                    <TextField size="small" id="outlined-basic standard-size-small" label="Album" variant="filled" style={{ backgroundColor: 'white', color: 'white', borderRadius: '10px' }} onChange={(e) => this.setState({ album: e.target.value })} value={this.state.album} />

                    <TextField size="small" id="outlined-basic standard-size-small" label="Song" variant="filled" style={{ backgroundColor: 'white', color: 'white', borderRadius: '10px' }} onChange={(e) => this.setState({ song: e.target.value })} value={this.state.song} />
                    <br />
                    <Button variant="contained" color="primary" type="submit">Add Info to Playlist</Button>
                </form>
                <br />
                <ol>
                    {this.displayLivePlaylistData()}
                </ol>


            </div>
        )
    }
}

export default AddPlaylistDetails;