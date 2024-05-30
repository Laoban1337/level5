const express = require(`express`);
const cleanerRouter = express.Router();
const Cleaner = require(`../models/cleaner`);

//get all cleaners
cleanerRouter.get("/", (req, res, next) => {
  Cleaner.find((err, cleaner) => {
    if (err) {
      res.status(500);
      console.log(err);
      return next(err);
    }
    res.status(200).send(cleaner);
  });
});


//get one cleaner
cleanerRouter.get("/:cleanerId",(req,res,next)=>{
    const cleanerId = req. params.cleanerId
    Cleaner.findById(cleanerId,(err,foundCleaner)=>{
        if (err) {
            res.status(500)
            console.log(err)
            return next(err)
            
        }
        res.status(200).send(foundCleaner)
    })
})

//post one cleaner
cleanerRouter.post("/",(req,res, next)=>{
const newCleaner = new Cleaner(req.body)
newCleaner.save((err,savedCleaner)=>{
    if (err) {
        res.status(500)
        console.log(err)
        return next(err)
    }
    res.status(200).send(savedCleaner)
})
})

//update one by ID
cleanerRouter.put("/:cleanerId",(req,res,next)=>{
    const cleanerId = req.params.cleanerId
   Cleaner.findByIdAndUpdate(
    {_id:cleanerId},
    req.body,
    {new:true},
    (err,updatedCleaner)=>{
        if (err) {
            res.status(500)
            console.log(err);
            return next(err)
        }
        res.status(200).send(updatedCleaner)
    }
   )
})


//delete one

cleanerRouter.delete("/:cleanerId",(req,res,next)=>{
    const cleanerId = req.params.cleanerId
    Cleaner.findOneAndDelete({_id:cleanerId},(err,deletedCleaner)=>{
        if (err||_id === undefined) {
            res.status(500)
            console.log(err)
            return next(err)
        }
        if (!deletedCleaner) {
            res.status(404).send({ message: 'Cleaner not found' });
            return;
          }
        res.status(200).send(`The Cleaner with the name ${deletedCleaner.cleanerName} and the id ${cleanerId}`)
    })
})

module.exports = cleanerRouter
