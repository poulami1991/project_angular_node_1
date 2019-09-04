const express= require('express');
 const app= express();

 app.use((req,res,next)=>{
   res.setHeader("Access-Control-Allow-Origin","*")
   res.setHeader("Access-Control-Allow-Methods","GET,POST,PATCH,DELETE,OPTIONS,PUT")
   next();
 })
 app.use('/api/posts',(req,res,err)=>{

  const posts=[
    { id:'1', title:'First', content:'First Post'},
    { id:'2', title:'Second', content:'Second Post'}
  ]
   res.status(200).json({
    message:'Posts send',
    posts:posts});

   });
 module.exports=app;
