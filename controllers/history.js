const History=require('../models/History')

const createPostHistory=async (req,res,next)=>{
    const {email,id}=req.verified;
    const {postId}=req;
    const requiredHistory=await History.find({userId:id})
    const newHistory={
        type: 'Create',
        post: postId
    }
    console.log(requiredHistory)
    if(requiredHistory.length!==0){
        
        requiredHistory.history.push(newHistory)
        await History.findByIdAndUpdate(requiredHistory._id,requiredHistory)
        res.status(200).send("Post Saved")
        
    }
    else{
        let history=new History({
                userId: id,
                history:[newHistory]
        })
        await history.save()
        res.status(200).send("Post Saved")
    }

}

const showInterestHistory=async(req,res,next)=>{
    console.log("------------------Creating History for interest--------------------")
    const {email,id}=req.verified;
    const {id:postId}=req.params;
    const requiredHistory=await History.findOne({userId:id})
    const newHistory={
        type: 'Interest',
        post: postId
    }
    if(requiredHistory.length!==0){
        
        requiredHistory.history.push(newHistory)
        await History.findByIdAndUpdate(requiredHistory._id,requiredHistory)
        next()
        
    }
    else{
        let history=new History({
                userId: id,
                history:[newHistory]
        })
        await history.save()
        next()
    }
}

const getHistory=async(req,res)=>{
    console.log("----------get a history for a user----------------")
    const {email,id}=req.verified;
    const history=await History.findOne({userId:id})
    if(history){
        res.status(200).send(history)
    }
    else{
        res.status(404).send("No history found")
    }

}

module.exports={showInterestHistory,createPostHistory,getHistory}