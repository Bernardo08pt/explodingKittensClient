import React, { useContext, useEffect, useState } from 'react';
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
import Shuffle from '../../assets/images/cards/shuffle.jpeg';

interface Props {
    player: Player;
    roomId: string;
}

const PlayerArea: React.FC<Props> = ({
    player,
    roomId
}) => {
    const classes = playerAreaStyles();
    const { emit, subscribe, unsubscribe } = useContext(SocketContext);
    const { username } = player;

    const [cards, setCards] = useState<Array<Card>>([]);

    // const halfPoint = Math.floor(cards / 2);

    useEffect(() => {
        const { GET_CARDS, GET_CARDS_RESPONSE } = events;

        subscribe(GET_CARDS_RESPONSE, (data: Array<Card>) => setCards(data));

        emit(GET_CARDS, roomId);

        return () => {
            unsubscribe(GET_CARDS_RESPONSE);
        }
    }, [subscribe, unsubscribe, emit, roomId, player]); 

    return (
        <Grid container>
            <Grid item xs={12} className={classes.cardTray}> 
                { cards.slice(0, Math.floor(cards.length / 2)).map((card, index) => 
                    <PlayingCard key={index}>
                        {card.type === "shuffle" 
                            ? <img alt={card.name} style={{width: "50px", height: "75px"}} src={Shuffle} />
                            : <Typography variant={"body1"}>{card.name}</Typography>
                        }
                    </PlayingCard>) 
                }
            </Grid>
            <Grid item xs={12} className={classes.cardTray}> 
                { cards.slice(Math.floor(cards.length / 2)).map((card, index) => 
                    <PlayingCard key={index}>
                        {card.type === "shuffle" 
                            ? <img alt={card.name} style={{width: "50px", height: "75px"}} src={Shuffle} />
                            : <Typography variant={"body1"}>{card.name}</Typography>
                        }
                    </PlayingCard>) 
                }
            </Grid>
            <Grid item xs={12} className={classes.title}>
                <Typography variant={"h6"}>{username}</Typography>
            </Grid>
        </Grid>
    )
}

export default PlayerArea;