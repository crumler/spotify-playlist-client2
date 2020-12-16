import React from 'react';
import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#1DB954'
        },
        secondary: {
            main: '#191414'
        }
    },
    text: {
        color: 'white'
    }
});

export default theme;