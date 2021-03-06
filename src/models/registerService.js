import connection from '../config/connectDB';
import bcrypt from 'bcryptjs';
let createNewUser = (user) =>{
    return new Promise( async (resolve, reject)=> {
        try{
            let check = await checkEmailUser(user.email);
            if(check === false){

            let salt = bcrypt.genSaltSync(10);
            let data = {
                fullname: user.fullname,
                email: user.email,
                password: bcrypt.hashSync(user.password, salt)
            };
            connection.query("INSERT INTO users set ?", data, function(error, rows){
                if(error)reject(error);
                resolve('Created User Successfully!');
            })
            }if(check === true){
                reject(`The email ${user.email} has already exist`)
            }
        }catch(e){
            reject(e);
        }
    });
};
let checkEmailUser = (email) => {
    return new Promise((resolve, reject)=>{
        try{
            connection.query("SELECT * from users where email = ?", email, function(error, rows){
                if(error)reject(error);
                if(rows.length > 0) resolve(true);
                resolve(false);
            })
        }catch(e){
            reject(e);
        }
    });
};
module.exports = {
    createNewUser: createNewUser
};