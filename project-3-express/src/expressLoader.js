const express = require("express");
const session = require("express-session");
const path = require("path");
const app = express();
const cors = require("cors");

app.use(cors({ credentials: true, origin: `${process.env.FRONTEND_URI}` }));

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "..", "public")));
app.set("view engine", "hbs");

const connectDB = require("../db/db");
const mongoURI = `${process.env.MONGODB_URI}/onlyfriends`;
connectDB(mongoURI);

const MongoDBStore = require("connect-mongodb-session")(session);
const store = new MongoDBStore({
  uri: mongoURI,
  collection: "sessions",
});

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    maxAge: 24 * 60 * 60 * 1000,
    store: store,
  })
);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

module.exports = app;
