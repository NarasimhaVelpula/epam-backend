const jwt=require('jsonwebtoken')

module.exports=function(req,res,next){
    console.log("-------------Validating JWT--------------------")
    const token=req.headers.authtoken
    if(token){
        const verified=jwt.verify(token,process.env.JWT_TOKEN || "epam")
        console.log(verified)
        if(verified){
            req.verified={email:verified.email,id:verified.id}
            next();
        }
        else{
            res.status(401).send("invalid token")
        }
    }
    else{
        console.log("validation Failed")
        res.status(401).send('access denied')
    }
}