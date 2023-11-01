import React from "react";
import useStyles from "./styles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import memoriespic from "../../../assets/images/memories.png";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";
import { useTheme } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const Post = ({ post, currentId, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();

  const openPost = () => {
    history.push(`/posts/${post._id}`);
  };

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find(
        (like) => like === user?.result?._id
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltIcon fontSize="small" />
        &nbsp;Like
      </>
    );
  };
  return (
    <Card className={classes.card}>
      <div className={classes.cardAction} onClick={openPost}>
        {post.selectedFile ? (
          <CardMedia
            className={classes.media}
            image={post.selectedFile}
            title={post.title}
          />
        ) : (
          <CardMedia
            className={classes.media}
            image={memoriespic}
            title={post.title}
          />
        )}
        <div
          className={classes.overlay}
          style={{ backgroundColor: theme.palette.tertiary.main }}
        >
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        {user?.result?._id === post?.creator &&
          <div className={classes.overlay2}>
            <Button
              style={{ color: "white", zIndex: "9" }}
              size="small"
              onClick={(event) => {
                event.stopPropagation();
                setCurrentId(post._id);
              }}
            >
              <MoreHorizIcon fontSize="medium" />
            </Button>
          </div>}
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography className={classes.title} variant="h5" gutterBottom>
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            {post.message}
          </Typography>
        </CardContent>
      </div>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            dispatch(likePost(post._id));
          }}
          disabled={!user?.result}
        >
          <Likes />
        </Button>
        {user?.result?._id === post?.creator &&
          <Button
            size="small"
            onClick={() => {
              dispatch(deletePost(post._id));
            }}
            style={{ color: theme.palette.tertiary.main }}
          >
            <DeleteIcon fontSize="small" />
            Delete
          </Button>}
      </CardActions>
    </Card>
  );
};

export default Post;
