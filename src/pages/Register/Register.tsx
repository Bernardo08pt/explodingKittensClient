import React, { useContext, useEffect, useState, useCallback } from 'react';
import SocketContext from '../../socketProvider/SocketContext';
//MaterialUI
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
//Assets
import { events } from '../../socketProvider/assets/events';
import { formStyles } from './assets/styles';
import { Paper } from '@material-ui/core';

interface Props {
    onRegister: () => void;
}
  
const Register: React.FC<Props> = ({
    onRegister
}) => {
    const classes = formStyles();
    const [username, setUsername] = useState("");
    const [error, setError] = useState(false);

    const { emit, subscribe, unsubscribe, saveUser } = useContext(SocketContext);

    useEffect(() => {
        subscribe(events.REGISTER_RESULT, (usernameData: null | string) => {
            if (usernameData) {
                saveUser(usernameData);
                onRegister();
            } else {
                setError(true);
            }
        });

        return () => unsubscribe(events.REGISTER_RESULT);
    }, [subscribe, unsubscribe, onRegister, saveUser]);

    const handleSubmitUsername = useCallback(() => {
        emit(events.REGISTER, { "username": username });
    }, [emit, username]);
    
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form 
                    className={classes.form} 
                    noValidate 
                    onSubmit={(event) => { 
                        event.preventDefault();
                        handleSubmitUsername();
                    }}
                >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        onChange={(event) => setUsername(event.target.value)}
                        error={error}
                        helperText={error ? "Username already exists" : ""}
                    />
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmitUsername}
                    >
                        Sign In
                    </Button>
                </form>
            </Paper>
        </Container>
    )
}

export default Register;