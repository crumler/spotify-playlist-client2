let APIURL = '';

switch (window.location.hosename) {
    case 'localhost' || '127.0.0.1':

        APIURL = 'http://localhost:5040';
        break;

    case 'cgr-spotify-playlist-server.herokuapp.com':

        APIURL = 'https://cgr-spotify-playlist-server.herokuapp.com'
}

export default APIURL;