import React, { Component } from 'react';

class NewPlaylistTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlistName: '',
            artist: '',
            album: '',
            song: ''
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <p>Table Results!</p>
            </div>
        )
    }
};

export default NewPlaylistTable;