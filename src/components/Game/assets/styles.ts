import { makeStyles } from '@material-ui/core/styles';

export const gameAreaStyles = makeStyles((theme) => ({
  deckArea: {
    height: "100%", 
    flexDirection: "row", 
    display: "flex", 
    alignItems: "center",
    justifyContent: "center"
  },
  playerArea: {
    minHeight: "150px"
  }   
}));

export const playerAreaStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    marginBottom: "5px"
  }, 
  cardTray: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }, 
  playing: {
    color: "red"
  }
}));

export const cardStyles = makeStyles((theme) => ({
  container: {
    width: "50px", 
    height: "75px", 
    backgroundColor: "lightblue", 
    margin: "5px",
    cursor: "pointer",
    "&:hover": {
      border: "2px solid orange"
    }
  },
  content: {
    padding: 0    
  },
  image: {
    width: "50px", 
    height: "75px", 
  }
}));