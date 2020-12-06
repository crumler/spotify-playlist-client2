import React, { Component } from 'react';
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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox'
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
    root: {
        flexGrow: 1,
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
            maxWidth: 752
        },
        control: {
            padding: theme.spacing(2)
        },
        button: {
            primary: "#1DB954"
        },
        listAllPlaylists: {
            backgroundColor: theme.palette.background.paper,
            overflow: "auto",
            maxHeight: "10"
        },
        title: {
            margin: theme.spacing(4, 0, 2)
        }
    }
});

function generate(element) {
    return [0].map((value) =>
        React.cloneElement(element, {
            key: value
        }),
    );
}

// export default function InteractiveList() {
//     const classes = useStyles();
//     const [dense, setDense] = React.useState(false);
//     const [secondary, setSecondary] = React.useState(false);

class EditPlaylistDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            artist: '',
            album: '',
            song: '',
            playlistName: '',
            description: '',
            playlistData: [],
            allPlaylists: [],
            dense: false,
            secondary: false
        }
    };

    handleSecondary = () => {
        this.setState({ secondary: true });
    };

    // handleDense = () => {
    //     this.setState({ dense: true });
    // };

    // fetchExistingPlaylists = () => {
    //     console.log('Test string!')
    //     fetch('http://localhost:5040/playlist/', {
    //         method: 'GET',
    //         headers: new Headers({
    //             'Content-Type': 'application/json',
    //             'Authorization': this.props.sessionToken
    //         })
    //     }).then(
    //         (response) => console.log(response)
    //     ).then((allPlaylistsCreated) => {
    //         console.log(allPlaylistsCreated)
    //         return this.displayExistingPlaylists(allPlaylistsCreated)
    //     })
    // };

    componentDidMount() {
        fetch('http://localhost:5040/playlist/', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.sessionToken
            })
        }).then((response) => response.json())
            .then((res) => {
                console.log(res);
                return res;
            }).then((res) => {
                this.setState({
                    allPlaylists: res
                },
                    () => console.log(this.state.allPlaylists));
            })
            .catch((err) => { console.log(err) })
    };

    handleSongUpdating = () => {
        fetch('http://localhost:5040/playlistsong/update/:id', {
            method: 'PUT',
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
        ).then((playlistDataResponse) => {
            this.setState({
                playlistData: playlistDataResponse,
                playlistData: [...this.state.playlistData, { artist: this.state.artist, album: this.state.album, song: this.state.song }]
            });
        });
    };

    handlePlaylistDelete = () => {
        fetch("http://localhost:5040/playlist/delete/", {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.sessionToken
            })
        })
            .then(res => res.json())
            .catch(err => console.log(err))
    };

    handlePlaylistEdit = () => {
        fetch("http://localhost:5040/playlist/update/", {
            method: 'PUT',
            body: JSON.stringify({
                playlist: {
                    playlistId: this.props.playlistIdProp,
                    playlistName: this.state.playlistName,
                    description: this.state.description
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.sessionToken
            })
        }).then(
            (response) => response.json()
        ).then((allPlaylistsResponse) => {
            this.setState({
                allPlaylists: allPlaylistsResponse,
                allPlaylists: [...this.state.allPlaylists, { playlistName: this.state.playlistName, description: this.state.description }]
            });
        });
    };

    displayExistingPlaylists() {
        console.log(this.state.allPlaylists)
        return this.state.allPlaylists.map((allPlaylistsCreated) => {
            const { classes } = this.props;
            return (
                <Grid item xs={12} md={6} style={{ maxHeight: '100px', overflow: 'auto', textAlign: "center" }}>
                    <div className={classes.listAllPlaylists}>
                        <List>
                            {generate(
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <QueueMusicIcon style={{ color: "#191414" }} />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={allPlaylistsCreated.playlistName}
                                        secondary={allPlaylistsCreated.description}
                                        style={{ color: "white" }}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="start" aria-label="edit">
                                            <EditIcon style={{ color: "#1DB954" }} />
                                        </IconButton>
                                        <IconButton edge="end" aria-label="delete">
                                            <DeleteIcon style={{ color: "red" }} />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>,
                            )}
                        </List>
                    </div>
                </Grid>

            )
        })
    }


    displayLivePlaylistData() {

        return this.state.playlistData.map((musicData) => {
            console.log(musicData);
            return (

                <li key={musicData.artist}>
                    Artist: {musicData.artist}
                    <br />
                    Album: {musicData.album}
                    <br />
                    Song: {musicData.song}
                </li>

            )
        })
    };

    render() {
        const { classes } = this.props;
        return (
            <ThemeProvider theme={theme}>
                <div style={{ width: '100%', marginTop: '80px' }}>

                    <h1>View / Edit Your Created Playlists:</h1>
                    <div style={{ textAlign: "-webkit-center", maxHeight: 400, overflow: 'auto' }}>
                        {this.displayExistingPlaylists()}
                    </div>
                    <Grid container direction="column" alignContent="center" spacing={2} className={this.props.classes.root}>
                        <Grid item xs={12} md={6}>
                            <div className={classes.demo}>
                                {/* {this.fetchExistingPlaylists()} */}

                                {/* <List dense={this.dense}>
                                    {generate(
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <FolderIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary="Single-line item"
                                                secondary={this.secondary ? 'Secondary text' : null}
                                            />
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" aria-label="delete">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>,
                                    )}
                                </List> */}
                            </div>
                        </Grid>



                        <form onSubmit={this.handleSongUpdating()} noValidate autoComplete="off" style={{ marginTop: '2rem' }}>
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
                    </Grid>


                </div>
            </ThemeProvider>
        )
    }
}

export default withStyles(styles, { withTheme: true })(EditPlaylistDetails);