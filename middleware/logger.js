const reqLogger = (req,res,next)=>{
    console.log('hit');
    next()
}

module.exports = reqLogger;