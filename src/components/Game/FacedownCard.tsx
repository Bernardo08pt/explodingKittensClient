import React from 'react';
import clsx from 'clsx';
//MaterialUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
//Assets
import { cardStyles } from "./assets/styles"

interface Props {
    size?: "normal" | "big";
    cards?: number;
}

const FacedownCard: React.FC<Props> = ({
    size = "normal",
    cards
}) => {
    const classes = cardStyles();

    return (
        <Card className={clsx(classes.container, size)}>
            {cards && 
                <CardContent className={classes.content}>
                    <Typography variant={"body1"}>{cards}</Typography>
                </CardContent>
            }
        </Card>
    )
}

export default FacedownCard;