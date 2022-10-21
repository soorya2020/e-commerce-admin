var data = require('../config/admin-details')
const bcrypt = require('bcrypt');
const { response } = require('../app');



module.exports={

  doLogin:(userData)=>{
    
     return new Promise(async(resolve, reject) => {
   
        if(data.email == userData.email){
          
           bcrypt.compare(userData.password, data.password).then((loginTrue)=>{
            
              let response={}
              if(loginTrue){
                 console.log('login successful');
                 response.admin=data;
                 response.status=true;
                 resolve(response);
              }else{
                 console.log("login failed invalid password");
                 resolve({status:false});
              }
           })
        }else{
           console.log('Login failed email');
            resolve({status:false});
        }
        
     })
}
}

