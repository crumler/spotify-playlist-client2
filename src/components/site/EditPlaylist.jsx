// import React, { Component } from 'react';
// import TextField from '@material-ui/core/TextField';
// import { makeStyles, withStyles } from '@material-ui/core/styles';

// const styles = theme => ({
//     root: {
//         '& > *': {
//             margin: theme.spacing(1),
//             width: '25ch',
//         },
//     },
// });

// class EditPlaylist extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             playlistName: '',
//             artist: '',
//             album: '',
//             song: ''
//         }
//     };

//     componentDidMount() {

//     }

//     getPlaylistData = () => {
//         fetch('http://localhost:5040/playlist/:id', {
//             method: 'GET',
//             body: JSON.stringify({ playlist: { playlistName: this.state.playlistName, artist: this.playlist}})
//         })
//     }

//     displayPlaylistData = ({ playlistName, artist, album, song }) => <div key={artist}>{ }</div>

//     render() {
//         const { playlistData } = this.state;
//         return (

//             <div style={{ width: '100%', marginTop: '100px' }}><h1>Edit Playlist here!</h1>
//                 {/* <form className={classes.root} noValidate autoComplete="off">
//                     <TextField id="standard-basic" label="Standard" />
//                     <TextField id="filled-basic" label="Filled" variant="filled" />
//                     <TextField id="outlined-basic" label="Outlined" variant="outlined" />
//                 </form> */}
//                 {playlistData.map(this.displayPlaylistData)}
//             </div>
//         )
//     }
// };

// export default withStyles(styles, { withTheme: true })(EditPlaylist);