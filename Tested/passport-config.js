const localStrategy = require('passport-local').Strategy
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const { deserializeUser } = require('passport');

initialize = (passport) => {
    const authenticateUser = async (username, password, done) => {
        try {
            const user = await User.findOne({ username: username });
           
            if (!user) {
                return done(null, false, { message: 'No user with this user name' })
            }
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            }
            else {
                return done(null, false, { message: 'Password incorrect' })
            
            }
        } catch (error) {
            return done(error)
        }
    }
    passport.use(new localStrategy(authenticateUser))
    passport.serializeUser((user, done) => {  
       done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        })
    })

}
 
const obj={
    initialize:initialize
    
};
module.exports = obj;
