import { makeStyles } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";
const theme = createTheme();

export default makeStyles(() => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    color: "rgba(0,183,255, 1)",
  },
  image: {
    marginLeft: "15px",
  },
  [theme.breakpoints.down("sm")]: {
    mainContainer: {
      backgroundColor: "#ff0000",
    },
  },
}));
