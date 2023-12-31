# Getting Started with Create React App

create client and server folder<br/>
in client folder run: npx create-react-app ./ to create react app in current folder<br/>
in server folder run: npm init -y to create package.json file<br/>
in server folder run: npm install express cors mongoose nodemon body-parses dotenv to install dependencies<br/>
in server folder create index.js file<br/>
in package.json file in server folder add "type": "module" to allow import/export<br/>
in package.json file in server folder add "start": "nodemon index.js" to allow start server with npm start<br/>
npm install --legacy-peer-deps to install dependencies on the client folder<br/>
in the client folder remove src folder and create new src folder<br/>
add index.js in src folder<br/>
create App.js in src folder<br/>
go to index.js in server folder and add app.use(bodyParser.json({limit: "30mb", extended: true})) to allow to send images<br/>
also add app.use(bodyParser.urlencoded({limit: "30mb", extended: true})) to configure bodyparser<br/>
app.use(cors()) to allow to send request from frontend to backend<br/>
connect to mongodb cloud/atlas<br/>
const CONNECTION_URL =
"mongodb+srv://zlatimir_rk:t9rMOXUP7eQDXMeT@cluster0.jmtwni8.mongodb.net/";<br/>
const PORT = process.env.PORT || 5000;<br/>
mongoose
.connect(CONNECTION_URL, {
useNewUrlParser: true,
useUnifiedTopology: true,
})<br/>
.then(() =>
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
)<br/>
.catch((error) => console.log(error.message));<br/>
mongoose.set("useFindAndModify", false); - to avoid warnings<br/>

create folder routes in server folder<br/>
create posts.js that have all routes for posts<br/>
after creating initial route we need to import it in index.js file in server folder<br/>
import postRoutes from "./routes/posts.js";<br/>
app.use("/posts", postRoutes); - every route in posts.js will start with /posts<br/>
create controllers folder in server folder to handle logic for routes<br/>
create models folder in server folder to create schema for posts<br/>
create file postMessage.js in models folder and export postMessage model to use it in controllers<br/>
so we can do find,create, delete update using postMessage model<br/>
add router.post("/", createPost); in posts.js to create a route for creating post<br/>
import PostMessage from "../models/postMessage.js"; in controllers/posts.js<br/>
each and every function inside controller will have try catch block inside<br/>
in try block of getPosts we can retrieve all the posts from database using PostMessage.find()<br/>
since it takes time to retrieve data from database we need to make it async await function<br/>
return res.status(200).json(postMessages); - return all the posts in json format<br/>
res.status(404).json({ message: error.message }); - return error message if something goes wrong<br/>

in controllers/posts.js create async function createPost(req, res) to create post<br/>
export const createPost = async (req, res) => {<br/>
const post = req.body;<br/>
const newPost = new PostMessage(post);<br/>
try {<br/>
await newPost.save();<br/>
res.status(201).json(newPost);<br/>
} catch (error) {<br/>
res.status(409).json({ message: error.message });<br/>
}<br/>
};<br/>

by default when posting document to mongodb it will create collection with the name of "test"<br/>
if you want to have different name for mongodb collection you need to add it to CONNECTION_URL<br/>
const CONNECTION_URL =
"mongodb+srv://zlatimir_rk:t9rMOXUP7eQDXMeT@cluster0.jmtwni8.mongodb.net/memories_app_database";<br/>
in this case collection will be called memories_app_database<br/>

creating form in client folder to be able to create post and send it to server and post it to database<br/>
create structure with MUI components<br/>

create api folder inside client folder<br/>

import axios from "axios";<br/>
const url = "http://localhost:5000/posts";<br/>
export const fetchPosts = () => axios.get(url);<br/>
and we can use fetchPosts function in App.js to fetch all the posts from database<br/>

prepare our application to use redux<br/>
inside src folder we create folders actions, reducers, store<br/>

we need to go to index.js in src folder and wrap App component with Provider component - to initialize redux store<br/>

import { Provider } from "react-redux";<br/>
import { createStore, applyMiddleware, compose } from "redux";<br/>
import thunk from "redux-thunk";<br/>
import reducers from "./reducers";<br/>

const store = createStore(reducers, compose(applyMiddleware(thunk)));<br/>

in reducers we create index.js where we use combineReducers to combine all reducers<br/>
after that we create individual reducers for posts and posts will have initialState<br/>

example of posts reducer<br/>
export default (posts = [], action) => {<br/>
switch (action.type) {<br/>
case "FETCH_ALL":<br/>
return posts;<br/>
case "CREATE":<br/>
return posts;<br/>
default:<br/>
break;<br/>
}<br/>
};<br/>

now that we have reducers we can wrap App component with Provider component in index.js in src folder<br/>
now our application is successfully connected to redux store<br/>

now in App.js we need to dispatch action to fetch all the posts from database<br/>
import { useDispatch } from "react-redux";<br/>
const dispatch = useDispatch();<br/>

inside of actions<br/>
import \* as api from "../api";<br/>
// Action Creators<br/>
const getPosts = () => async (dispatch) => {<br/>
try {<br/>
const { data } = await api.fetchPosts();<br/>
dispatch({ type: "FETCH_ALL", payload: data });<br/>
} catch (error) {<br/>
console.log(error);<br/>
}<br/>
};<br/>

export default (posts = [], action) => {<br/>
switch (action.type) {<br/>
case "FETCH_ALL":<br/>
return action.payload;<br/>
case "CREATE":<br/>
return posts;<br/>
default:<br/>
return posts;<br/>
}<br/>
};<br/>

now we need to consume our store in files where we need to use it<br/>
import { useSelector } from "react-redux";<br/>
const posts = useSelector((state) => state.posts);<br/>

additionaly add "proxy": "http://localhost:5000/", to the package json below private<br/>
now we get [] of posts in console<br/>
here setup is done<br/>

now we need to create form to create post<br/>
in the form we also want to handle image upload<br/>
for that we use<br/>
import FileBase from "react-file-base64";<br/>

we need to create routes for creating post, update post, delete post, like post<br/>
first we create route in server - routes/posts.js<br/>
router.post("/", createPost);<br/>
then we create controller in server - controllers/posts.js<br/>
after we need to create action in client - actions/posts.js<br/>
actions consume api from api folder<br/>
after that we need to create reducer in client - reducers/posts.js<br/>
after that we need to consume reducer in App.js - import { useDispatch } from "react-redux";<br/>
const dispatch = useDispatch();<br/>
and dispatch action on proper place<br/>

in order to makeStyles for for example App.js we create styles.js and do it like this<br/>
import { makeStyles } from "@material-ui/core/styles";<br/>
export default makeStyles((theme) => ({<br/>
appBar: {<br/>
borderRadius: 15,<br/>
margin: "30px 0",<br/>
display: "flex",<br/>
flexDirection: "row",<br/>
justifyContent: "center",<br/>
alignItems: "center",<br/>
},<br/>
heading: {<br/>
color: "rgba(0,183,255, 1)",<br/>
},<br/>
image: {<br/>
marginLeft: "15px",<br/>
},<br/>
[theme.breakpoints.down("sm")]: {<br/>
mainContainer: {<br/>
backgroundColor: "#ff0000",<br/>
},<br/>
},<br/>
));<br/>

in order to create theme globaly we need to wrap up our App with theme provider<br/>
import { createTheme } from "@material-ui/core/styles";<br/>
import { ThemeProvider } from "@material-ui/styles";<br/>
const theme = createTheme({<br/>
palette: {<br/>
primary: {<br/>
main: "#2e7d32",<br/>
},<br/>
secondary: {<br/>
main: "#ff6f00",<br/>
},<br/>
tertiary: {<br/>
main: "#97f200",<br/>
},<br/>
},<br/>
});<br/>
<ThemeProvider theme={theme}><br/>

we need to install dotenv in order to use environment variables from .env file<br/>
import dotenv from "dotenv";<br/>
dotenv.config();<br/>

to be able to use Link component from react-router-dom we need to wrap up our App with BrowserRouter<br/>

added Browser Router to App.js<br/>
added routes for Home and Auth<br/>
continue with Auth component<br/>
create both sign in and sign up forms in the same component by using isSignup variable from true to false<br/>

Google Login<br/>
npm install react-google-login<br/>
import GoogleLogin from "react-google-login";<br/>
<GoogleLogin<br/>
clientId="GOOGLE ID"<br/>
render={(renderProps) => {<br/>
<Button<br/>
className={classes.googleButton}<br/>
color="primary"<br/>
fullWidth<br/>
onClick={renderProps.onClick}<br/>
disabled={renderProps.disabled}<br/>
variant="contained"<br/> ><br/>
Google Sign In<br/>
</Button>;<br/>
}}<br/>
onSuccess={googleSuccess}<br/>
onFailure={googleFailure}<br/>
cookiePolicy="single_host_origin"<br/>
/><br/>
we need to find out what is google id<br/>
go to https://console.cloud.google.com/<br/>
create new project<br/>
go to credentials<br/>
create credentials<br/>
OAuth client ID<br/>
you get client id and client secret<br/>

after we done with google signin, we will create manual signin and singup<br/>
we create forms for both signin and signup with switchmode state to toogle between<br/>
we need to add app.use('/users', userRoutes) in index.js of the server<br/>
then in routes folder we create users.js<br/>
in routes we create signin and signup routes with imported controllers<br/>
we create Model for user in models folder<br/>
inside users controllers we import bcryptjs to hash password<br/>
we create signin and signup controllers<br/>

now we need to create auth middleware to protect routes<br/>
we create middleware folder in server folder<br/>
we create auth middleware with next()<br/>
for example if user want to like the post we need to check if user is authenticated<br/>
we need to add auth middleware to like route in posts.js<br/>
if user is authenticated we can proceed with next() to actual like controller<br/>

adding routes to app.js<br />
