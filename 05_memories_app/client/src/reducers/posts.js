export default (posts = [], action) => {
  switch (action.type) {
    case "UPDATE":
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case "FETCH_ALL":
      return action.payload;
    case "CREATE":
      return [...posts, action.payload];
    case "DELETE":
      return posts.filter((post) => post._id !== action.payload);
    case "LIKE":
      // update like count of the post with the given id
      return posts.map((post) =>
        post._id === action.payload
          ? { ...post, likeCount: post.likeCount + 1 }
          : post
      );
    default:
      return posts;
  }
};
