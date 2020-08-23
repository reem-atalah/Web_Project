var bool=false;

check=(req)=>{
    if(req.isAuthenticated())
    {
        bool=true;
        console.log('hello,true');
        return true;
    }
    console.log('hello,false');
    bool=false;
    return false;
}

checkAuthenticated= (req,res,next)=>{
    if(req.isAuthenticated()){
        console.log('hi,auth')
        bool=true;
        return next()
        
    }
    bool=false;
    console.log('bye,auth')
    req.flash('message','You must log in first')
    res.redirect('/login')
};

checkNotAuthenticated= (req,res,next)=>{
    if(! req.isAuthenticated()){
        console.log('hi,notauth')
        bool=false;
        return next()
        
    }
    console.log('bye,notauth')
    bool=true;
    req.flash('message', 'You are arleady logged in')
     res.redirect('/')
};

const obj={
    check: check,
    checkAuth: checkAuthenticated,
    checkNotAuth: checkNotAuthenticated,
    auth:bool
};

module.exports = obj;
