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
import FolderIcon from '@material-ui/icons/Folder';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

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
        demo: {
            backgroundColor: theme.palette.background.paper
        },
        title: {
            margin: theme.spacing(4, 0, 2)
        }
    },
});

function generate(element) {
    return [0, 1, 2].map((value) =>
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

    // handleSecondary = () => {
    //     this.setState({ secondary: true });
    // };

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
        let token = this.props.sessionToken
        fetch('http://localhost:5040/playlist/', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': token
            })
        }).then((response) => response.json())
            .then((res) => {
                console.log(res);
            })
            .catch((err) => { console.log(err) })


        console.log('Finished!')
    };

    // componentDidMount() {
    //     fetch('http://localhost:5040/playlist', {
    //         method: 'GET',
    //         headers: new Headers({ 'Content-Type': 'application/json' })
    //     })
    //         .then((response) => response.json())
    //         .then((journeys) => this.setState({ allJourneys: journeys }))
    //         .catch(err => console.log(err))

    // };


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
        ).then((playlistData) => {
            this.setState({
                playlistData: playlistData,
                playlistData: [...this.state.playlistData, { artist: this.state.artist, album: this.state.album, song: this.state.song }]
            });
        });
    };

    // displayAllPlaylists() {
    //     return this.state.allPlaylists.map((playlistData) => {
    //         return (

    //         )
    //     })
    // }

    displayExistingPlaylists() {
        return this.state.allPlaylists.map((allPlaylistsCreated) => {
            console.log(allPlaylistsCreated);
            const { classes } = this.props;
            return (
                // <List dense={this.dense}>
                //     {generate(
                //         <ListItem>
                //             <ListItemAvatar>
                //                 <Avatar>
                //                     <FolderIcon />
                //                 </Avatar>
                //             </ListItemAvatar>
                //             <ListItemText
                //                 primary="Single-line item"
                //                 secondary={this.secondary ? 'Secondary text' : null}
                //             />
                //             <ListItemSecondaryAction>
                //                 <IconButton edge="end" aria-label="delete">
                //                     <EditIcon />
                //                     <DeleteIcon />
                //                 </IconButton>
                //             </ListItemSecondaryAction>
                //         </ListItem>,
                //     )}
                // </List>
                <li>
                    {allPlaylistsCreated.playlistName}
                </li>
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
                <div style={{ width: '100%', marginTop: '100px' }}>

                    <h1>View / Edit Your Created Playlists:</h1>

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

                        <br />

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