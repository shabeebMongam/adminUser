const db = require('../config_db/connection');
const dbVars = require('../config_db/bd-vars');
const { resolve } = require('express-hbs/lib/resolver');
const objectId = require('mongodb').ObjectId;


module.exports={
    adminLogin:async(adminData,callback)=>{
        let adminInDbEmail =  await db.get().collection(dbVars.ADMIN_COLLECTION).findOne({Email:adminData.Email});
        let adminInDbPassword = await db.get().collection(dbVars.ADMIN_COLLECTION).findOne({Password:adminData.Password})
        console.log(adminInDbEmail);
        console.log(adminInDbPassword);
        if(adminInDbEmail && adminInDbPassword != null){
        if(adminInDbEmail.Email === adminData.Email && adminInDbPassword.Password === adminData.Password){
             callback(true);
        }}else{
         callback(false)
        }
    },

    getAllUsers:()=>{
        return new Promise(async(resolve,reject)=>{
            let users = await db.get().collection(dbVars.USER_COLLECTION).find().toArray();
            resolve(users);
            // reject()
        })
    },

    deleteUser:async (userId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(dbVars.USER_COLLECTION).deleteOne({_id:objectId(userId) }).then((response)=>{
                console.log(response);
                resolve(response)
            })   
        })
            // let id = `new ObjectId("${userId}")`
            // console.log(id);
            // console.log(userId + "new"); 
            // let userWithId = await db.get().collection(dbVars.USER_COLLECTION).deleteOne({_id:objectId(userId)})
            // console.log(userWithId);


           
    },

    getUserDetails:(userId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(dbVars.USER_COLLECTION).findOne({_id:objectId(userId)}).then((user)=>{
                resolve(user); 
            })
        })

    },

    updateUser:(userId,userDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(dbVars.USER_COLLECTION).updateOne(
                {_id:objectId(userId)},
                {$set:{
                    Name:userDetails.Name,
                    Email:userDetails.Email
                }}).then((response)=>{
                    resolve()
                })
        })
    }





}