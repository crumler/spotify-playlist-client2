let APIURL = '';

switch (window.location.hosename) {
    case 'localhost' || '127.0.0.1':

        APIURL = 'http://localhost:5040';
        break;

    case 'cgr-spotify-playlist-client.herokuapp.com':

        APIURL = 'https://cgr-spotify-playlist-client.herokuapp.com'
}

export default APIURL;