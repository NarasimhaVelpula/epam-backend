
const User=require('../models/User')
const jwt=require('jsonwebtoken')

const signup=async(req,res)=>{
    try{
    const {firstName,lastName,email,password}=req.body;

    console.log("-----------------------Registering User---------------------")

    // Checking Email Already Exists
    const emailExists=await User.findOne({email:email})
    if(emailExists){
        console.log(email+" already exists in database, Failed to register again");
        res.status(400).send("Email Already Exists")
        return
    }

    // New User Creation
    const newUser=new User({
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password
    })

    try{
        const savedUser=await newUser.save()
        console.log(email+" created a new user in database")
        res.status(200).send(savedUser)
    }
    catch(err){
        console.log(err);
        res.status(500).send("Something Went wrong, Please Contact naninarasimha27@gmail.com")
    }
}
catch(err){
    console.log("Some parameter is missing")
    res.status(503).send("not a valid request")
}

}

const login=async (req,res)=>{
    console.log("----------------------Login User-------------------------")
    const {email,password}=req.body;
    const requiredUser=await User.findOne({email:email,password:password})
    if(requiredUser){
        const token=jwt.sign({email:email,id:requiredUser._id},process.env.JWT_TOKEN || "epam")
        console.log(email+"Logged in")
        res.status(200).send({token})
    }
    else{
        console.log(email+"User not found")
        res.status(404).send("User not found")
    }
}

module.exports={login,signup}