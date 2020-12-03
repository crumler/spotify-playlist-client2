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
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false
        }
    };

    componentDidMount() {
        fetch('http://localhost:5040/playlist/:id', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application / json',
                'Authorization': this.props.sessionToken
            })
        }).then((res) => res.json())
            .then((playlistData) => {
                this.state({
                    isLoaded: true,
                    items: playlistData
                });
            });
    };


    render() {
        const { playlistData } = this.state;
        if (!this.state.isLoaded) {
            return <div>Loading data...</div>
        } else {

            return (

                <div style={{ width: '100%', marginTop: '100px' }}>
                    <ul>
                        {playlistData.map(playlistData => (
                            <li key={playlistData.id}>
                                <h3>{playlistData.artist}</h3>
                                <h4>{playlistData.album}</h4>
                                <p>{playlistData.song}</p>
                            </li>
                        ))}
                    </ul>

                </div >
            )
        }
    }
};

export default withStyles(styles, { withTheme: true })(EditPlaylist);