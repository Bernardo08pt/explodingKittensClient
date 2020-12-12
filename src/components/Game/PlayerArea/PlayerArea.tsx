import React from 'react';
//MaterialUI
import Grid from '@material-ui/core/Grid';
//Components
import PlayerAreaTop from './PlayerAreaTop';
import PlayerAreaBottom from './PlayerAreaBottom';
import PlayerAreaLeft from './PlayerAreaLeft';
import PlayerAreaRight from './PlayerAreaRight';
//Assets
import { PlayerPosition } from '../assets/types';

interface Props {
    player: string;
    position: PlayerPosition;
}

const PlayerArea: React.FC<Props> = ({
    player,
    position
}) => {
    return (
        <Grid container>
            {position === "top" 
                ? <PlayerAreaTop player={player}/>
                : position === "left" 
                    ? <PlayerAreaLeft player={player}/>
                    : position === "bottom"
                        ? <PlayerAreaBottom player={player}/>
                        : <PlayerAreaRight player={player}/>
            }
        </Grid>
    )
}

export default PlayerArea;