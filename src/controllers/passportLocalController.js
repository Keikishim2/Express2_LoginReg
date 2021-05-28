import passport from 'passport';
import passportLocal from 'passport-local';
import loginService from '../models/loginService';

let LocalStrategy = passportLocal.Strategy;

let iniPassportLocal = ()=>{
    passport.use('localLogin', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        },
        async (email, password, done)=>{
            try{
                await loginService.findUserByEmail(email).then(async (user)=>{
                    if(!user) return done(null, false, {message: `This email "${email}" doesn't exist!`})
                if(user){
                    let match = await loginService.compareUserPassword(user, password);
                    if(match === true)return done(null, user, null);
                    return done(null, false, {message: match});
                }
                });
            }catch(error){
                return done(null, false, {
                    message: error
                });
            }
        }));
};

passport.serializeUser((user, done)=>{
    done(null, user.id);
});
passport.deserializeUser((id, done)=>{
    loginService.findUserById(id).then((user)=>{
        return done(null, user);
    }).catch(error => {
        return done(error, null)
    });
});

module.exports = iniPassportLocal;