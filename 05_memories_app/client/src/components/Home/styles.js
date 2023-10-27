import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  [theme.breakpoints.down("sm")]: {
    mainContainer: {
      backgroundColor: "#ff0000",
    },
  },
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
}));
