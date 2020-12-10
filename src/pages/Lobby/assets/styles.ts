import { makeStyles } from '@material-ui/core/styles';

export const lobbyStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      paddingTop: "10px",
      paddingBottom: "10px"
    },
    title: {
      textAlign: "center"
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "flex-end",
      paddingRight: "10px"
    }
}));