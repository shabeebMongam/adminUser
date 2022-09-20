const express = require('express');
const router = express.Router();
const toDB = require('../to_db/userToDb');
const db = require('../config_db/connection');
const dbVars = require('../config_db/bd-vars')

router.get('/',(req,res)=>{
    if(req.session.loggedIn){
        res.redirect('/home');
    }else{
    res.render('login',{notInDb:false});
    }
})
router.post('/',(req,res)=>{
    toDB.loginUser(req.body, (yesInDb)=>{
        req.session.loggedIn=true;
        req.session.user = yesInDb
        // console.log(typeof(yesInDb));
        if(yesInDb){
            res.redirect('/home');
        }else{
            res.render('login',{notInDb:"Invalid Credentials"})
        }
    })
    
})

router.get('/home',(req,res)=>{
    if(req.session.loggedIn){
        let user = req.session.user;
        let userName = user.Name
        // console.log(typeof(user.Name)); 
        res.render('user/home',{userName})
    }else{
        res.redirect('/')
    }
   
})



router.get('/signup',(req,res)=>{
    res.render('signup');
})

router.post('/signup',(req,res)=>{
    // console.log(req.body);
    toDB.addUser(req.body,async (userId)=>{
        console.log(`######################## user added with ID : ${userId} ################################`);
        console.log(await db.get().collection(dbVars.USER_COLLECTION).findOne({_id:userId}));
        console.log("########################################################################################");
    })
    res.redirect('/');

})
router.get('/logout',(req,res)=>{
    req.session.loggedIn = false
    // req.session.destroy();
    res.redirect('/')
})







module.exports = router;