import React, { Component } from 'react';
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
import NewPlaylistTable from '../results/NewPlaylistTable';
import AddPlaylistDetails from './AddPlaylistDetails';

const styles = theme => ({
    root: {
        flexGrow: 1,
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
        control: {
            padding: theme.spacing(2)
        },
        button: {
            primary: "#1DB954"
        },
    },
});

class NewPlaylist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            root: '',
            spacing: '',
            playlistId: null,
            artist: '',
            album: '',
            song: '',
            playlistName: '',
            description: '',
            playlistOwner: '',
            playlistNameField: null,
            playlistNameFieldDisabled: false
        }
    };

    handlePlaylistSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5040/playlist/create', {
            // fetch(`${APIURL}/playlist/create`, {
            method: 'POST',
            body: JSON.stringify({
                playlist: {
                    playlistName: this.state.playlistName,
                    playlistOwner: this.state.playlistOwner,
                    description: this.state.description
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.sessionToken
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            !this.state.playlistName ? alert('You must enter a name for your playlist.') : alert('Playlist updated!');
            this.setState({
                playlistId: data.playlist.id
            })
        })
    };


    disabledTrue() {
        this.setState({
            ...this.state,
            playlistNameFieldDisabled: true
        })
    };

    disabledFalse() {
        this.setState({
            ...this.state,
            playlistNameFieldDisabled: false
        })
    };

    // disablePlaylistNameField = () => {
    //     this.state.playlistName ? this.disabledTrue() : this.disabledFalse
    // };

    render() {
        return (
            <ThemeProvider theme={theme}>
                <div style={{ width: '100%', marginTop: '100px' }}>
                    <h1>Create a New Playlist:</h1>
                    <Grid container direction="column" className={this.props.classes.root} spacing={2} alignContent="center">
                        <Grid item xs={12}>
                            <div style={{ width: '100%', marginTop: '.5rem' }}>
                                <form onSubmit={this.handlePlaylistSubmit} className={this.props.classes.root} noValidate autoComplete="off" style={{ marginBottom: "1rem" }}>
                                    <TextField size="small" id="outlined-basic standard-size-small" label="Playlist Name" variant="filled" style={{ backgroundColor: 'white', color: 'white', borderRadius: '10px' }} onChange={(e) => this.setState({ playlistName: e.target.value })} value={this.state.playlistName} required
                                        disabled={this.state.playlistNameFieldDisabled} />

                                    <TextField size="small" id="outlined-basic" label="Playlist Description" variant="filled" style={{ backgroundColor: 'white', color: 'white', borderRadius: '10px' }} onChange={(e) => this.setState({ description: e.target.value })} value={this.state.description} />

                                    <br />
                                    <Button variant="contained" color="primary" type="submit">Create New Playlist</Button>
                                </form>

                                <hr style={{ color: "white" }} />

                                <h3 style={{ textDecoration: "underline" }}>Current Playlist:</h3>
                                <h3>{this.state.playlistName}</h3>

                                {this.state.playlistId ? <AddPlaylistDetails playlistIdProp={this.state.playlistId} sessionToken={this.props.sessionToken} classes={this.props.classes} /> : null}
                            </div>
                        </Grid>
                    </Grid>
                    <br />
                    <br />

                </div>
            </ThemeProvider>
        )
    }
};

export default withStyles(styles, { withTheme: true })(NewPlaylist);