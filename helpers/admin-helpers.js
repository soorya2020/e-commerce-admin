var db=require('../config/connection')
var collection=require('../config/collections')
var objectId=require('mongodb').ObjectID
const { PRODUCT_COLLECTION } = require('../config/collections')
const { response } = require('../app')
const bcrypt=require('bcrypt')
const { ObjectId } = require('mongodb')


module.exports={

    
    getAllUser:()=>{
        return new Promise(async(resolve,reject)=>{
            let user=await db.get().collection(collection.USER_COLLECTION).find().toArray()
            resolve(user)
        })
    },
    deleteUser:(userId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.USER_COLLECTION).deleteOne({_id:objectId(userId)}).then((response)=>{
                console.log(response);
                resolve(response)
            })
        })
       
    },
    addUser:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            userData.Password=await bcrypt.hash(userData.Password,10)
            db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((userData)=>{
                resolve(userData)
            })
        })
    },
    updateUser:(userId,body)=>{
        console.log("test1");
        return new Promise(async(resolve,reject)=>{
           await db.get().collection(collection.USER_COLLECTION).updateOne({_id:objectId(userId)},
            {$set:{
                Name:body.Name,
                Email:body.Email
            }}).then((response)=>{
                console.log("sdfsd");
                resolve()
            })
        })
       
    },
    getUser:(userId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.USER_COLLECTION).findOne({_id:objectId(userId)}).then((user)=>{
                resolve(user)
        })
            })
            
    }

    
  

}