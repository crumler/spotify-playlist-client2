import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import theme from '../../styles/MuiTheme';
import { ThemeProvider } from '@material-ui/core';


const styles = {
    root: {
        flexGrow: 1,
        secondary: '#191414'
    },
    menuButton: {
        marginRight: theme.spacing(1),
    },
    title: {
        flexGrow: 1,
    },
    Button: {
        backgroundColor: '#191414'
    }
};

const logout = () => {
    localStorage.clear();
    window.location.href = '/';
};


class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            root: '',
            menu: '',
            title: '',
            anchorEl: null,
            setAnchorEl: null,
            open: false
        }
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };


    render() {
        const { anchorEl } = this.state;
        return (

            <ThemeProvider theme={theme}>
                <div className={this.props.classes.root}>
                    <AppBar position="fixed">
                        <Toolbar>
                            <IconButton edge="start" className={this.props.classes.menuButton} color="inherit" aria-label="menu" onClick={this.handleClick}>
                                <MenuIcon />
                            </IconButton>
                            <h3>Menu</h3>
                            <Menu id="menu-appbar"
                                anchorEl={this.anchorEl}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "left"
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left"
                                }}
                                open={Boolean(anchorEl)}
                                onClose={this.handleClose}
                                anchorPosition={{
                                    left: 20,
                                    top: 55
                                }}
                                anchorReference='anchorPosition'>

                                <MenuItem onClick={this.handleClose}>
                                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link>
                                </MenuItem>


                                <MenuItem onClick={this.handleClose}>
                                    <Link to="/newplaylist" style={{ textDecoration: 'none', color: 'inherit' }}>New Playlist</Link>
                                </MenuItem>

                                <Link to="/editplaylist" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <MenuItem onClick={this.handleClose}>Modify Playlists</MenuItem>
                                </Link>
                            </Menu>

                            <Typography variant="h6" className={this.props.classes.title}>
                                Spotify Playlist Creator
                            </Typography>

                            <Button className={this.props.classes.Button} color="secondary" backgroundColor="secondary" variant="contained" onClick={logout}>Logout</Button>
                        </Toolbar>
                    </AppBar>
                </div>
            </ThemeProvider>
        )
    }
};

export default withStyles(styles)(Navbar);