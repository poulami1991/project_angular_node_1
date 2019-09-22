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
      content: req.body.content,
    });
    post.save().then(result=>{
      res.status(201).json({message:"Post added",newId:result._id})
     });
  }
 )

 app.put('/api/posts/:id',(req,res,err)=>{
  const post= new Post({
    _id:req.body.id,
    title: req.body.title,
    content: req.body.content,
  });
  Post.updateOne({_id:req.params.id},post).then(result=>{
    res.status(200).json({message:'Update'});
  })
 })

 app.get('/api/posts/:id',(req,res,err)=>{
  Post.findById({_id:req.params.id}).then( document=>{
    debugger;
    res.status(200).json({
      message:'Post send',
      postData:document});
      })
   });

 app.get('/api/posts',(req,res,err)=>{
  Post.find().then( documents=>{
    res.status(200).json({
      message:'Posts send',
      postData:documents});
      })
   });

  app.delete('/api/posts/:id',(req,res,next)=>{
    Post.deleteOne({_id:req.params.id}).then(result=>{
     res.status(200).json({message:"Post deleted"})
    })
  })
 module.exports=app;
