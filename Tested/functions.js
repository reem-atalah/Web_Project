
checkAuthenticated= (req,res,next)=>{
    if(req.isAuthenticated()){
        return next()
        
    }
    req.flash('primary','You must log in first')
    res.redirect('/log_in')
};

checkNotAuthenticated= (req,res,next)=>{
    if(! req.isAuthenticated()){
        return next()
        
    }
    req.flash('info', 'You are arleady logged in')
     res.redirect('/')
};

const obj={
    checkAuth: checkAuthenticated,
    checkNotAuth: checkNotAuthenticated
};

module.exports = obj;
