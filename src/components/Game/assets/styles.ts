import { makeStyles } from '@material-ui/core/styles';

export const gameAreaStyles = makeStyles((theme) => ({
  deckArea: {
    height: "100%", 
    flexDirection: "column", 
    display: "flex", 
    alignItems: "center",
    justifyContent: "center"
  },
  playerArea: {
    minHeight: "200px"
  }   
}));

export const playerAreaHorizontalStyles = makeStyles((theme) => ({
    title: {
      textAlign: "center",
      marginBottom: "5px"
    }, 
    cardTray: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
}));

export const playerAreaVerticalStyles = makeStyles((theme) => ({
  column: {
    height: "100%", 
    flexDirection: "column", 
    display: "flex", 
    justifyContent: "center"
  }
}));