import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        flexGrow: 1,
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
        control: {
            padding: theme.spacing(2)
        }
    },
});

class NewPlaylist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            root: '',
            spacing: ''
        }
    }

    render() {
        return (
            <div style={{ width: '100%', marginTop: '100px' }}>
                <h1>Create a New Playlist:</h1>
                <Grid container className={this.props.classes.root} spacing={2}>
                    <Grid item xs={12}>
                        <div style={{ width: '100%', marginTop: '100px' }}>
                            <form className={this.props.classes.root} noValidate autoComplete="off">
                                <TextField id="outlined-basic" label="Playlist Name" variant="outlined" style={{ backgroundColor: 'white', color: 'white', borderRadius: '10px' }} />
                                <TextField id="outlined-basic" label="Artist / Band" variant="outlined" style={{ backgroundColor: 'white', color: 'white', borderRadius: '10px' }} />
                                <TextField id="outlined-basic" label="Album Name" variant="outlined" style={{ backgroundColor: 'white', color: 'white', borderRadius: '10px' }} />
                                <TextField id="outlined-basic" label="Song Name" variant="outlined" style={{ backgroundColor: 'white', color: 'white', borderRadius: '10px' }} />
                                <br />
                                <Button variant="contained" color="primary">Add to Playlist</Button>
                            </form>
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }
};

export default withStyles(styles, { withTheme: true })(NewPlaylist);