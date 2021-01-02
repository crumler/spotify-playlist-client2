import React from 'react';
import 'animate.css';
import { Grid } from '@material-ui/core';

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid InUpcontainer justify='center' style={{ backgroundColor: '#191414' }}>
                <Grid item className="animate__animated animate__back">
                    <p>&#169; {(new Date().getFullYear())} - Chris Rumler</p>
                </Grid>
            </Grid>
        )
    }
}

export default Footer;