import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
});

class EditPlaylist extends Component {

    render() {
        return (

            <div style={{ width: '100%', marginTop: '100px' }}><h1>Edit Playlist here!</h1>
                {/* <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="standard-basic" label="Standard" />
                    <TextField id="filled-basic" label="Filled" variant="filled" />
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                </form> */}
            </div>
        )
    }
};

export default withStyles(styles, { withTheme: true })(EditPlaylist);