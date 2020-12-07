import React, { Component } from 'react';

class EditPlaylistDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            playlistName: '',
            description: ''
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleRegisterSubmit}>
                    <Dialog open={this.props.open} onClose={this.handleClose}>
                        <DialogTitle>Registration:</DialogTitle>
                        <DialogContent>
                            <DialogContentText>To create a new account, please enter your new username and password.  You may also enter your first and last name, if you wish.</DialogContentText>
                            <TextField
                                margin='dense'
                                id='name'
                                label='First Name:'
                                fullWidth
                                onChange={(e) => this.setState({ firstName: e.target.value })}
                                value={this.state.firstName}
                            />
                            <br />
                            <TextField
                                margin='dense'
                                id='name'
                                label='Last Name:'
                                fullWidth
                                onChange={(e) => this.setState({ lastName: e.target.value })}
                                value={this.state.lastName}
                            />
                            <br />
                            <TextField
                                margin='dense'
                                id='name'
                                label='Username:'
                                fullWidth
                                onChange={(e) => this.setState({ username: e.target.value })}
                                value={this.state.username}
                                required
                            />
                            <br />
                            <TextField
                                margin='dense'
                                id='password'
                                type='password'
                                label='Password:'
                                fullWidth
                                onChange={(e) => this.setState({ password: e.target.value })}
                                value={this.state.password}
                                required
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color='primary'>
                                Cancel
                                    </Button>
                            <Button onClick={this.handleRegisterSubmit} color='primary'>
                                Create Account
                                    </Button>
                        </DialogActions>
                    </Dialog>
                </form>
            </div>
        )
    }
};

export default EditPlaylistDetails;