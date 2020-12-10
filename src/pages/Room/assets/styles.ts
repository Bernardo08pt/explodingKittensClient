import { makeStyles } from '@material-ui/core/styles';

export const roomStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(2),
      padding: "10px",
      height: "500px"
    },
    title: {
      textAlign: "center"
    }
}));