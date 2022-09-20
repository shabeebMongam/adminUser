const db = require('../config_db/connection');
const dbVars = require('../config_db/bd-vars')

module.exports={
    addUser:(user,callback)=>  {
        // console.log(product);

        db.get(). collection(dbVars.USER_COLLECTION).insertOne(user).then((data)=>{
       
            callback(data.insertedId)
        })
    },



    loginUser:async (userData,callback)=>{
       let usersInDbEmail =  await db.get().collection(dbVars.USER_COLLECTION).findOne({Email:userData.Email});
       let usersInDbPassword = await db.get().collection(dbVars.USER_COLLECTION).findOne({Password:userData.Password})
       console.log(usersInDbEmail);
       console.log(usersInDbPassword);
       if(usersInDbEmail && usersInDbPassword != null){
       if(usersInDbEmail.Email === userData.Email && usersInDbPassword.Password === userData.Password){
            callback(usersInDbEmail);
       }}else{
        callback(false)
       }
    }
   
}