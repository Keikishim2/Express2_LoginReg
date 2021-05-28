import registerService from '../models/registerService';


let registerPage = (req, res) =>{
    return res.render('register.ejs');
};
let createNewUser = async(req, res) =>{
    try{
        let data = {
            fullname: req.body.fullName,
            email: req.body.email,
            password: req.body.password
        };
        await registerService.createNewUser(data);
        return res.status(200).json({
            message: 'User created' 
        })
    }catch(e){
        return res.status(500).json(e);
    }
};
module.exports = {
    registerPage: registerPage,
    createNewUser: createNewUser
};