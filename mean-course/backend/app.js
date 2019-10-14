const express= require('express');
const bodyParser= require('body-parser');
const mongoose= require('mongoose');

const postRoutes= require('./routes/posts');
const userRoutes= require('./routes/user');

const app= express();

mongoose.connect('mongodb+srv://poulami:Cse2019@cluster0-u2af1.mongodb.net/Node-Angular?retryWrites=true&w=majority',{useNewUrlParser:true})
.then(()=>{console.log("Mongodb connected")})
.catch(()=>console.log("connection fauiled"))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

 app.use((req,res,next)=>{
   res.setHeader("Access-Control-Allow-Origin","*")
   res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type,Accept,Authorization")
   res.setHeader("Access-Control-Allow-Methods","GET,POST,PATCH,DELETE,OPTIONS,PUT")
   next();
 })

app.use("/api/posts",postRoutes);
app.use("/api/user",userRoutes);

module.exports=app;
