import React from 'react';
//MaterialUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

interface Props {
    horizontal?: boolean;
}

const PlayingCard: React.FC<Props> = ({
    horizontal,
    children
}) => {
    return (
        <Card style={{width: horizontal ? "75px" : "50px", height: horizontal ? "50px" : "75px", backgroundColor: "lightblue", margin: "5px"}}>
            <CardContent style={{padding: 0}}>
                { children }
            </CardContent>
        </Card>
    )
}

export default PlayingCard;