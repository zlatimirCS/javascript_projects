# Getting Started with Create React App

create client and server folder
in client folder run: npx create-react-app ./ to create react app in current folder
in server folder run: npm init -y to create package.json file
in server folder run: npm install express cors mongoose nodemon body-parses dotenv to install dependencies
in server folder create index.js file
in package.json file in server folder add "type": "module" to allow import/export
in package.json file in server folder add "start": "nodemon index.js" to allow start server with npm start
npm install --legacy-peer-deps to install dependencies on the client folder
in the client folder remove src folder and create new src folder
add index.js in src folder
create App.js in src folder
go to index.js in server folder and add app.use(bodyParser.json({limit: "30mb", extended: true})) to allow to send images
also add app.use(bodyParser.urlencoded({limit: "30mb", extended: true})) to configure bodyparser
app.use(cors()) to allow to send request from frontend to backend
connect to mongodb cloud/atlas
const CONNECTION_URL =
"mongodb+srv://zlatimir_rk:t9rMOXUP7eQDXMeT@cluster0.jmtwni8.mongodb.net/";
const PORT = process.env.PORT || 5000;
mongoose
.connect(CONNECTION_URL, {
useNewUrlParser: true,
useUnifiedTopology: true,
})
.then(() =>
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
)
.catch((error) => console.log(error.message));
mongoose.set("useFindAndModify", false); - to avoid warnings

create folder routes in server folder
create posts.js that have all routes for posts
after creating initial route we need to import it in index.js file in server folder
import postRoutes from "./routes/posts.js";
app.use("/posts", postRoutes); - every route in posts.js will start with /posts
create controllers folder in server folder to handle logic for routes
create models folder in server folder to create schema for posts
create file postMessage.js in models folder and export postMessage model to use it in controllers
so we can do find,create, delete update using postMessage model
add router.post("/", createPost); in posts.js to create a route for creating post
import PostMessage from "../models/postMessage.js"; in controllers/posts.js
each and every function inside controller will have try catch block inside
in try block of getPosts we can retrieve all the posts from database using PostMessage.find()
since it takes time to retrieve data from database we need to make it async await function
return res.status(200).json(postMessages); - return all the posts in json format
res.status(404).json({ message: error.message }); - return error message if something goes wrong

in controllers/posts.js create async function createPost(req, res) to create post
export const createPost = async (req, res) => {
const post = req.body;
const newPost = new PostMessage(post);
try {
await newPost.save();
res.status(201).json(newPost);
} catch (error) {
res.status(409).json({ message: error.message });
}
};

by default when posting document to mongodb it will create collection with the name of "test"
if you want to have different name for mongodb collection you need to add it to CONNECTION_URL
const CONNECTION_URL =
"mongodb+srv://zlatimir_rk:t9rMOXUP7eQDXMeT@cluster0.jmtwni8.mongodb.net/memories_app_database";
in this case collection will be called memories_app_database

creating form in client folder to be able to create post and send it to server and post it to database
create structure with MUI components

create api folder inside client folder

import axios from "axios";
const url = "http://localhost:5000/posts";
export const fetchPosts = () => axios.get(url);
and we can use fetchPosts function in App.js to fetch all the posts from database

prepare our application to use redux
inside src folder we create folders actions, reducers, store

we need to go to index.js in src folder and wrap App component with Provider component - to initialize redux store

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

in reducers we create index.js where we use combineReducers to combine all reducers
after that we create individual reducers for posts and posts will have initialState

example of posts reducer
export default (posts = [], action) => {
switch (action.type) {
case "FETCH_ALL":
return posts;
case "CREATE":
return posts;
default:
break;
}
};

now that we have reducers we can wrap App component with Provider component in index.js in src folder
now our application is successfully connected to redux store
