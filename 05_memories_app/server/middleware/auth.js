import jwt from 'jsonwebtoken';

// wants to like the post
// click the like button => auth middleware (NEXT) => like controller...

const auth = async (req, res, next) => {
  try {
    console.log(req.headers);
    const token = req.headers.authorization.split(" ")[1]; // [1]
    const isCustomAuth = token.length < 500; // [2]

    let decodedData;

    if (token && isCustomAuth) { // [3]
      decodedData = jwt.verify(token, 'test'); // [4]
      req.userId = decodedData?.id; // [5]
    } else {
      decodedData = jwt.decode(token); // [6]
      req.userId = decodedData?.sub; // [7]
    }

    next(); // [8]
  } catch (error) {
    console.log(error);
  }
};

export default auth;