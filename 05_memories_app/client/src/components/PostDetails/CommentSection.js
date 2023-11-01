import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import { commentPost } from '../../actions/posts';

const CommentSection = ({ post }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState('');

  const handleClick = async () => {
    const finalComment = `${user?.result?.name}: ${comment}`;
    const newComments = await dispatch(commentPost(finalComment, post?._id));
    setComments(newComments);
    setComment('');
  };

  useEffect(() => {
    setComments(post?.comments);
  }, [dispatch, post?.comments]);

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">Comments</Typography>
          {comments?.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              {c}
            </Typography>
          ))}
        </div>
        {user?.result?.name && (
          <div style={{ width: '70%' }}>
            <Typography gutterBottom variant="h6">Write a Comment</Typography>
            <TextField fullWidth minRows={4} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} />
            <Button style={{ marginTop: '10px' }} fullWidth variant="contained" color="primary" disabled={!comment} onClick={handleClick}>Comment</Button>
          </div>)}
      </div>
    </div>
  )
}
export default CommentSection;