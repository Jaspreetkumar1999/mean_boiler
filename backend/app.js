const express = require('express')
const app = express();
const path = require("path")
const bodyParser = require('body-parser')
const postRoute = require('./routes/route')
const userRoute = require('./routes/user')
const mongoose = require('mongoose');
const { RSA_NO_PADDING } = require('constants');
mongoose.connect("mongodb+srv://m001-student:m001-mongodb-basics@sandbox-s5rkh.mongodb.net/mean-stack",{ useNewUrlParser: true })
.then(()=>{
  console.log("connected to db");
})
.catch(()=>{
  console.log("error occured");
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images") ));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"

  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH,PUT,DELETE, OPTIONS"
  );
  next();
});
app.use("/api/posts",postRoute)
app.use("/api/user",userRoute)

module.exports = app;


