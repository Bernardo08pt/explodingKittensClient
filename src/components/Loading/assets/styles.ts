import { makeStyles } from '@material-ui/core/styles';

export const loadingStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      paddingTop: "10px",
      paddingBottom: "10px",
      display: "flex",
      justifyContent: "center",
    }
}));