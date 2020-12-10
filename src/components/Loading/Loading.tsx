import React from 'react';
//MaterialUI
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
//Assets
import { loadingStyles } from './assets/styles';
import { CircularProgress } from '@material-ui/core';

const Loading: React.FC = () => {
    const classes = loadingStyles();

    return (
        <Container component="main" maxWidth="md">
            <Paper className={classes.paper}>
                <CircularProgress />
            </Paper>
        </Container>
    )
}

export default Loading;