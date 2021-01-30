import React, { Component } from 'react';
import 'animate.css';
import APIURL from '../../helpers/environment';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


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
        fetch(`${APIURL}/playlistsong/create`, {
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

        return this.state.playlistData.map((song) => {
            return (

                <Grid item xs={12}>
                    <li className="animate__animated animate__zoomIn" key={song.artist}>
                        <p className="liveList">Artist:</p> {song.artist}
                        <br />
                        <p className="liveList">Album:</p> {song.album}
                        <br />
                        <p className="liveList">Song:</p> {song.song}
                        <br />
                    </li>
                </Grid>
            )
        })
    };

    render() {

        return (
            <Grid container direction="column" className={this.props.classes.root} spacing={4} alignContent="center">
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
            </Grid>
        )
    }
}

export default AddPlaylistDetails;