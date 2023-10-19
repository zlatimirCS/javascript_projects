import React from "react";
import Posts from "../../components/Posts/Posts";
import Form from "../../components/Form/Form";
import { Container, Grow, Grid } from "@material-ui/core";
import useStyles from "./styles";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";

const Home = () => {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);
  return (
    <Grow in>
      <Container>
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.mainContainer}
        >
          <Grid item xs={12} sm={7}>
            <Posts currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};
export default Home;
