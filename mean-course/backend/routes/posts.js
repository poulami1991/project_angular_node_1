const express= require('express');
const multer= require('multer');
const router= express.Router();
const checkAuth= require("../middleware/check-auth")
const storage= multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"backend/images")
  },
  filename:(req,file,cb)=>{
    const name= file.originalname.toLowerCase().split(' ').join('-');
  }
});
const Post=require('../models/post');

router.post('',checkAuth,(req,res,err)=>{
  const post= new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save().then(result=>{
    res.status(201).json({message:"Post added",newId:result._id})
   });
}
)

router.put('/:id',checkAuth,(req,res,err)=>{
const post= new Post({
  _id:req.body.id,
  title: req.body.title,
  content: req.body.content,
});
Post.updateOne({_id:req.params.id},post).then(result=>{
  res.status(200).json({message:'Update'});
})
})

router.get('/:id',(req,res,err)=>{
Post.findById({_id:req.params.id}).then( document=>{
  debugger;
  res.status(200).json({
    message:'Post send',
    postData:document});
    })
 });

router.get('',(req,res,err)=>{
Post.find().then( documents=>{
  res.status(200).json({
    message:'Posts send',
    postData:documents});
    })
 });

router.delete('/:id',checkAuth,(req,res,next)=>{
  Post.deleteOne({_id:req.params.id}).then(result=>{
   res.status(200).json({message:"Post deleted"})
  })
})
module.exports= router;
