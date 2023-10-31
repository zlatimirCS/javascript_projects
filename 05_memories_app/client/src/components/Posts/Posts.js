import React from "react";
import Post from "./Post/Post";
import useStyles from "../styles";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";

const Posts = ({ currentId, setCurrentId }) => {
  const classes = useStyles();
  const { posts } = useSelector((state) => state.posts);

  const sortedPosts = posts?.sort((a, b) =>
    a.createdAt < b.createdAt ? 1 : -1
  );
  return !posts?.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {sortedPosts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6} md={6} lg={3}>
          <Post post={post} currentId={currentId} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
