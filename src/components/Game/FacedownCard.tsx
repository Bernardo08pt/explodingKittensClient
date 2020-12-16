import React from 'react';
//MaterialUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
//Assets
import { cardStyles } from "./assets/styles"

interface Props {
    cards: number;
}

const FacedownCard: React.FC<Props> = ({
    cards
}) => {
    const classes = cardStyles();

    return (
        <Card className={classes.container}>
            <CardContent className={classes.content}>
                <Typography variant={"body1"}>{cards}</Typography>
            </CardContent>
        </Card>
    )
}

export default FacedownCard;