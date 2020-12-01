import React from 'react';
import { Grid, TextField, Button, InputAdornment } from '@material-ui/core';
import { AccountCircle, LockRounded } from '@material-ui/icons';

// const Register = () => {

// const [username, setUsername] = useState('');
// const [password, setPassword] = useState('');

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }

    // handleUsernameChange = () => {
    //     this.setState({
    //         username: this.state.username
    //     })
    // };

    // handlePasswordChange = () => {
    //     this.setState({
    //         password: this.state.password
    //     })
    // };

    render() {
        return (
            <div>
                <h1>Please create a new account below:</h1>
                <Grid container>
                    <Grid item>
                        <TextField label='username'
                            margin="normal"
                            value={this.state.username}
                            InputProps={{ startAdornment: <InputAdornment position='start'><AccountCircle /></InputAdornment> }}
                            id='textField'
                        />
                        <TextField label="Password"
                            type='password'
                            margin="normal"
                            value={this.state.password}
                            InputProps={{ startAdornment: <InputAdornment position='start'><LockRounded /></InputAdornment> }}
                            id='textField'
                        />
                        <br />
                        <Button color='primary' variant='contained'>Create New Account</Button>
                    </Grid>
                </Grid>
            </div>

        )
    }
};

export default Register;