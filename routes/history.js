const router=require('express').Router()
const validation=require('./TokenValidation')

const {getHistory}=require('../controllers/history')

router.get('/',validation,getHistory)

module.exports=router