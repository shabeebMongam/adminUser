const express = require('express');
const router = express.Router();
const toDB = require('../to_db/adminToDb');
const db = require('../config_db/connection');
const dbVars = require('../config_db/bd-vars');
const { response } = require('express');

router.get('/', (req, res) => {
   if(req.session.loggedInAdmin){
    res.redirect('/admin/adminpanel');
   }else{
    res.render('admin/adminLogin', { notInDb: false });

   }
    
    
})

router.post('/', (req, res) => {
    toDB.adminLogin(req.body, (yesInDb) => {
        req.session.loggedInAdmin = true;
        console.log(yesInDb);
        if (yesInDb) {
            res.redirect('/admin/adminpanel');
        } else {
            res.render('admin/adminLogin', { notInDb: "You dont have an admin Account" })
        }
    })

});

router.get('/adminpanel', (req, res) => {
    toDB.getAllUsers().then((users) => {
        // console.log(products);
        if(req.session.loggedInAdmin){
        res.render('admin/adminPanel', { users })
        }else{
            res.redirect('/admin')
        }
    })
});

router.get('/delete-user/:id',(req,res)=>{
    let userId = req.params.id
    console.log(userId);

    toDB.deleteUser(userId).then((response)=>{
        res.redirect('/admin/adminpanel')

    })
})

router.get('/edit-user/:id',async (req,res)=>{
    console.log(req.params.id);
    let user = await toDB.getUserDetails(req.params.id);
    console.log("this");
    console.log(user._id);
    console.log("this");
    let userId = user._id

    res.render('admin/adminEditUser',{user});
})

router.post('/edit-user/:id',(req, res)=>{
    console.log(req.params.id);
    console.log(req.body);
    toDB.updateUser(req.params.id,req.body).then(()=>{

        res.redirect('/admin/adminpanel')
    })

    

})

router.get('/logout/ad',(req,res)=>{
    req.session.loggedInAdmin = false
    // req.session.destroy();
    // res.send('new')
    res.redirect('/admin')
})








module.exports = router;