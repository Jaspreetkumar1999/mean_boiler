const express = require('express')
const multer = require('multer')

const router = express.Router();
const Post = require('../models/post')
const checkAuth = require('../middleware/check-auth')

const MIME_TYPE_MAP = {
  'image/png' : 'png',
  'image/jpeg' : 'jpg',
  'image/jpg' : 'jpg'

};

const storage = multer.diskStorage({
  destination : (req, file, cb) =>{
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if(isValid){
      error = null;
    }
    cb(error, "backend/images");
  },
  filename : (req,file,cb)=>{
    const name = file.originalname.toLowerCase().split('').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name+'-'+ Date.now() + '.'+ext);
  }
});

//no Need to execute checkAuth just pass refrence

router.post("",
checkAuth
,multer({storage : storage}).single('image') ,(req, res, next) => {
  const url = req.protocol + '://' + req.get("host");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath : url + '/images/' + req.file.filename,
    creater : req.userData.userId
  });
  // console.log("req.userData", req.userData);
  // return
  post.save().then(createdPost => {
    res.status(201).json({
      message: "Post added successfully",
      post : {
        ...createdPost,
        id : createdPost._id

      }
    });
  });
});

router.get("/:id",(req,res,next)=>{
  console.log("inside getby id");
  Post.findById(req.params.id).then(post=>{
    // console.log("post");
    // console.log(post);
    if(post){
      res.status(200).json({message : "post found successfully", postData : post})
    }
    else {
      res.status(200).json({
        message: "sorry no data exist with this id"
      })
    }
  })

})
router.get("", (req, res, next) => {
  // console.log("req.querry",req.query);
 const pageSize = +req.query.pagesize;
 const currentPage = +req.query.page;
 let fetchedPosts;
 const postQuery = Post.find();
 if( pageSize && currentPage){
 postQuery
 .skip( pageSize * (currentPage -1))
 .limit(pageSize)

 }
 postQuery
 .then(documents =>{
  fetchedPosts = documents;
   return Post.count();
 })
 .then(count => {
    // console.log("document", documents);
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: fetchedPosts,
      maxPosts : count
    });
  });
});

router.delete("/:id", checkAuth,(req, res, next) => {
  Post.deleteOne({ _id: req.params.id,  creater : req.userData.userId }).then(result => {
    // console.log("result =>",result);
    if(result.n > 0){
      // console.log("updated");
      res.status(200).json({ message : "Deleted successfully"

      })
    } else{
      res.status(401).json({
        message : "User is not authorized"
      })
    }
  }).catch(err =>{
    console.log("err occured");
    console.log(err);
  })
});



router.put("/:id",checkAuth,multer({storage : storage}).single('image'),(req,res,next)=>{

  let imagePath = req.body.imagePath ;
 if(req.file){

  const url = req.protocol + '://' + req.get("host");
  imagePath = url + '/images/' + req.file.filename

 }
  const post = new Post({
    _id : req.body.id,
    title : req.body.title,
    content : req.body.content,
    imagePath : imagePath,
    creater : req.userData.userId

  })
  // console.log("post data befor update", post);
  Post.updateOne({
    _id : req.params.id,
    creater : req.userData.userId
  }, post).then((result)=>{
    // console.log("update result =>", result);
    if(result.nModified > 0){
      // console.log("updated");
      res.status(200).json({ message : "updated successfully"

      })
    } else{
      res.status(401).json({
        message : "User is not authrazed"
      })
    }

  }).catch(err =>{
    console.log("ann error occured", err);
  })
})
module.exports = router;
