import React from 'react';
import { Grid } from '@material-ui/core';

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid container justify='center' style={{ backgroundColor: '#191414' }}>
                <Grid item>
                    <p>&#169; 2020 - Chris Rumler</p>
                </Grid>
            </Grid>
        )
    }
}

export default Footer;