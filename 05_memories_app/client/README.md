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
