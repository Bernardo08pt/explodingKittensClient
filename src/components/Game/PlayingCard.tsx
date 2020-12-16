import React from 'react';
//MaterialUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
//Images
import Shuffle from '../../assets/images/cards/shuffle.jpeg';
//Assets
import { cardStyles } from "./assets/styles"
import { Card as CardType } from './assets/types';

interface Props {
    card: CardType;
    onClick?: (card: CardType) => void;
}

const PlayingCard: React.FC<Props> = ({
    card,
    onClick
}) => {
    const classes = cardStyles();

    return (
        <Card 
            className={classes.container}
            onClick={() => onClick && onClick(card)}
        >
            <CardContent className={classes.content}>
                { card.type === "shuffle" 
                    ? <img alt={card.name} className={classes.image} src={Shuffle} />
                    : <Typography variant={"body1"}>{card.name}</Typography>
                }
            </CardContent>
        </Card>
    )
}

export default PlayingCard;