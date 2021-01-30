import React, { Component } from 'react';
import { ThemeProvider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import APIURL from '../../helpers/environment';
import theme from '../../styles/MuiTheme';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
    root: {
        flexGrow: 1,
        '& > *': {
            margin: theme.spacing(1),
            width: '100em',
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
        },
        selected: {
            color: "white"
        }
    },
    typography: {
        padding: theme.spacing(2),
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    }

});

function generate(element) {
    return [0].map((value) =>
        React.cloneElement(element, {
            key: value
        }),
    );
};


class EditPlaylistMusic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            artist: '',
            album: '',
            song: '',
            allSongs: [],
            songData: [],
            open: false
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    };

    componentDidMount() {
        fetch(`${APIURL}/playlistsong/`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.sessionToken
            })
        }).then((response) => response.json())
            .then((res) => {
                return res;
            }).then((res) => {
                this.setState({
                    allSongs: res,
                    songData: res
                })
            })
            .catch((err) => { console.log(err) })
    };

    // handleSongDelete = Version 2.0 placeholder
    handleSongDelete(songDeleteId, userId) {
        fetch(`${APIURL}/playlist/delete/${songDeleteId}`, {
            method: 'DELETE',
            body: JSON.stringify({
                playlistsong: {
                    songId: this.props.songIdProp,
                    artist: this.state.artist,
                    album: this.state.album,
                    song: this.state.song
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.sessionToken
            })
        })
            .then(res => res.json())
            .then(window.location.reload())
            .catch(err => console.log(err))
    };

    handleOpen() {
        this.setState({ open: true });
    };

    handleClose() {
        this.setState({ open: false });
    };

    render() {

        return (
            <ThemeProvider theme={theme}>
                <div style={{ width: '100%', marginTop: '80px' }}>
                    <Grid container direction="column" alignContent="center" spacing={2} className={this.props.classes.root}>
                        <Grid item xs={12} md={6} className="animate__animated animate__zoomIn">
                            <div style={{ textAlign: "-webkit-center", maxHeight: 400, overflow: 'auto' }}>
                                {this.state.allSongs.map((allPlaylistSongs, index) => {
                                    
                                    return (
                                        <Grid key={index} item xs={12} md={6}
                                            style={{ maxHeight: "100px", overflow: "auto", textAlign: "center" }}>
                                            <div>
                                                <List>
                                                    {generate(
                                                        <ListItem>
                                                            <ListItemAvatar>
                                                                <Avatar>
                                                                    <MusicNoteIcon key={index} style={{ color: "#191414" }} />
                                                                </Avatar>
                                                            </ListItemAvatar>
                                                            <ListItemText key={index} primary={allPlaylistSongs.artist}
                                                                secondary={allPlaylistSongs.album}
                                                                style={{ color: "white" }}
                                                            />
                                                        </ListItem>
                                                    )}
                                                </List>
                                            </div>
                                        </Grid>
                                    )
                                })}
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </ThemeProvider>
        )
    }
};

export default withStyles(styles, { withTheme: true })(EditPlaylistMusic);