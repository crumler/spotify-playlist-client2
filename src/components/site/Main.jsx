import React, { Component } from 'react';
import 'animate.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Navbar from './Navbar';
import NewIcon from '../../assets/New.svg';
import EditIcon from '../../assets/Edit.svg';
import { ThemeProvider } from '@material-ui/core';
import theme from '../../styles/MuiTheme';


const styles = theme => ({
    root: {
        maxWidth: 400,
        flexGrow: 1,
        primary: '#1DB954'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    media: {
        width: "100%",
        height: "auto"
    },
    Card: {
        backgroundColor: '#1DB954',
        maxWidth: 400,
        flexGrow: 1,
    }
});


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            root: '',
            media: '',
        }
    }

    render() {

        return (
            <ThemeProvider theme={theme}>
                <div style={{ width: '100%', marginTop: '100px' }}>
                    <Navbar />
                    <br />
                    {/* <Router> */}
                    <Grid container spacing={1} justify="center" alignItems="center" className="animate__animated animate__zoomIn">
                        <Grid item xs={6} sm={3}>
                            <Link to="/newplaylist" style={{ textDecoration: 'none' }}>
                                <Card className={this.props.classes.Card} backgroundColor="primary">
                                    <CardActionArea>
                                        <CardMedia
                                            className={this.props.classes.media}
                                            image={NewIcon}
                                            title="Create new playlist"
                                            component="img"
                                            height="80"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                Create Playlist
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                Click here to begin building a new playlist.
                                            </Typography>
                                        </CardContent>

                                    </CardActionArea>
                                    <CardActions>
                                    </CardActions>
                                </Card>
                            </Link>


                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Link to="/editplaylist" style={{ textDecoration: 'none' }}>
                                <Card className={this.props.classes.Card}>
                                    <CardActionArea>
                                        <CardMedia
                                            className={this.props.classes.media}
                                            image={EditIcon}
                                            title="Edit or View existing playlists"
                                            component="img"
                                            height="80"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                Modify Playlists
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                Click here to view or edit any of your created playlists.
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                    </CardActions>
                                </Card>
                            </Link>

                        </Grid>

                    </Grid>
                </div>
            </ThemeProvider >
        )
    }
};

export default withStyles(styles, { withTheme: true })(Main);