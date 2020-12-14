import { makeStyles } from '@material-ui/core/styles';

export const roomStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(2),
      padding: "10px",
      minHeight: "500px"
    },
    title: {
      textAlign: "center"
    },
    roomActionsContainer: {
      display: "flex", 
      justifyContent: "flex-end"
    },
    startButton: {
      width: "150px",
      marginRight: "5px"
    }, 
    endButton: {
      width: "150px"
    } 
}));