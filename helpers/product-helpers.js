var db=require('../config/connection')
var collection=require('../config/collections')
var objectId=require('mongodb').ObjectID
const { PRODUCT_COLLECTION } = require('../config/collections')
const { response } = require('../app')


module.exports={

    addProduct:(product,callback)=>{
        console.log(product)
        db.get().collection(collection.PRODUCT_COLLECTION).insertOne(product).then((data)=>{
            callback(data.insertedId)
            
        })
    },

    getAllProducts:()=>{
        return new Promise(async(resolve,reject)=>{
            let products=await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(products)
        })
    },
    deleteProduct:(prodId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).deleteOne({_id:objectId(prodId)}).then((response)=>{
                console.log(response);
                resolve(response)
            })
        })
       
    },
    

    



}