const express= require('express');
const bodyParser= require('body-parser');
const mongoose= require('mongoose');

const app= express();

const Post=require('./models/post');

mongoose.connect('mongodb+srv://poulami:Cse2019@cluster0-u2af1.mongodb.net/Node-Angular?retryWrites=true&w=majority',{useNewUrlParser:true})
.then(()=>{console.log("Mongodb connected")})
.catch(()=>console.log("connection fauiled"))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

 app.use((req,res,next)=>{
   res.setHeader("Access-Control-Allow-Origin","*")
   res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type,Accept")
   res.setHeader("Access-Control-Allow-Methods","GET,POST,PATCH,DELETE,OPTIONS,PUT")
   next();
 })

 app.post('/api/post',(req,res,err)=>{
   const post= new Post({
     title: req.body.title,
     content: req.body.content
   });
   post.save();
   res.status(201).json({message:"Post added"})
 })

 app.get('/api/posts',(req,res,err)=>{
  Post.find().then( documents=>{
    res.status(200).json({
      message:'Posts send',
      posts:documents});
      })
   });

  app.delete('/api/posts/:id',(req,res,next)=>{
    Post.deleteOne({_id:req.params.id}).then(res=>{
      console.log(res);
      res.status(200).json({message:"Post deleted"})
    })

  })
 module.exports=app;
