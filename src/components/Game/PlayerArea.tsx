import React, { useContext, useEffect, useMemo, useState } from 'react';
import SocketContext from '../../socketProvider/SocketContext';
//MaterialUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
//Components
import PlayingCard from './PlayingCard';
//Assets
import { Player } from './assets/types';
import { playerAreaStyles } from './assets/styles';
import { events } from '../../socketProvider/assets/events';
import { Card } from './assets/types';

interface Props {
    player: Player;
    roomId: string;
    isPlaying: boolean;
    onPlayCard: (card: Card) => void;
}

const PlayerArea: React.FC<Props> = ({
    player,
    roomId,
    isPlaying,
    onPlayCard
}) => {
    const classes = playerAreaStyles();
    const { emit, subscribe, unsubscribe } = useContext(SocketContext);
    const { username } = player;

    const [cards, setCards] = useState<Array<Card>>([]);

    const halfPoint = useMemo(() => Math.floor(cards.length / 2), [cards]);

    useEffect(() => {
        const { GET_CARDS, GET_CARDS_RESPONSE } = events;

        subscribe(GET_CARDS_RESPONSE, (data: Array<Card>) => setCards(data));

        emit(GET_CARDS, roomId);

        return () => {
            unsubscribe(GET_CARDS_RESPONSE);
        }
    }, [subscribe, unsubscribe, emit, roomId, player]); 

    return (
        <Grid container className={isPlaying ? classes.playing : ""}>
            <Grid item xs={12} className={classes.cardTray}> 
                { cards.slice(0, halfPoint).map((card, index) => 
                    <PlayingCard 
                        key={index}
                        card={card}
                        onClick={onPlayCard}
                    />
                )}
            </Grid>
            <Grid item xs={12} className={classes.cardTray}> 
                { cards.slice(halfPoint).map((card, index) => 
                    <PlayingCard 
                        key={index}
                        card={card}
                        onClick={onPlayCard}
                    />
                )}
            </Grid>
            <Grid item xs={12} className={classes.title}>
                <Typography variant={"h6"}>{username}</Typography>
            </Grid>
        </Grid>
    )
}

export default PlayerArea;