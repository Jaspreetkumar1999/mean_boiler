const express = require('express')
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
router.post("/signup",(req,res,next)=>{
  console.log("req.body", req.body);
  bcrypt.hash(req.body.password, 10 )
  .then( hash =>{
    const user = new User({
      email : req.body.email,
      password : hash
    });
    user.save()
    .then(result =>{
      res.status(200).json({
        message : " User Created",
        result : result
      })
    })
    .catch(err =>{
      console.log("err", err);
      res.status(200).json({
        error : err
      })

    })

  })
})

router.post("/login",(req,res, next) =>{
  let fetchedUser ;
  User.findOne({email: req.body.email})
  .then(user =>{
    if(!user){
      return res.status(401).json({
        message : "Auth Failed"
      });
    }
    fetchedUser = user
  return bcrypt.compare(req.body.password, user.password);


  })
  .then( result =>{
    // console.log("result =>", result);
   if(!result){
    return res.status(401).json({
      message : "Auth Failed"
    });
   }

   const token = jwt.sign({
     email : fetchedUser.email,
     userId : fetchedUser._id,

   }, "secret_this_should_be_longer", { expiresIn : '1h' })

// console.log("token =>", token);
  return res.status(200).json({
    token : token,
    expiresIn : 3600,
    userId : fetchedUser._id

  })

  })
  .catch(err =>{
    console.log("err =>", err);
    return res.status(401).json({
      message : "Auth Failed"
    });

  })

})



module.exports = router;
