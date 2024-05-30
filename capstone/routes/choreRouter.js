const express = require(`express`);
const choreRouter = express.Router();
const Chore = require("../models/chore");

//get all cleaners
choreRouter.get("/", (req, res, next) => {
  Chore.find((err, chore) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    res.status(200).send(chore);
  });
});

//get by cleaner
choreRouter.get("/cleaners/:cleanerID", (req, res, next) => {
  const cleanerID = req.params.cleanerID;
  Chore.find({ cleaner: cleanerID }, (err, chores) => {
    if (err) {
      res.status(500);
      console.log(err);
      return next(err);
    }
    if (!chores || chores.length === 0) {
      res.status(404).send("'No chores found for this cleaner.'");
      return next(err);
    } else {
      res.status(200).send(chores);
    }
  });
});

//get one chore
choreRouter.get("/:choreId", (req, res, next) => {
  const choreId = req.params.choreId;
  Chore.findById(choreId, (err, foundChore) => {
    if (err) {
      res.status(500);
      console.log(err);
      return next(err);
    }
    if (!foundChore) {
      res.status(404).send(`No chores found matching that ID`);
    } else {
      res.status(200).send(foundChore);
    }
  });
});

//post one chore

choreRouter.post("/", (req, res, next) => {
  const { cleanerId, ...choreData } = req.body;
  choreData.cleaner = cleanerId;

  const newChore = new Chore(choreData);
  newChore.save((err, savedChore) => {
    if (err) {
      console.error('Error creating chore:', err);
      res.status(500).send('Internal Server Error');
      return next(err);
    }
    res.status(201).json(savedChore);
  });
});

// choreRouter.post("/:cleanerID", (req, res, next) => {
//   req.body.cleaner = req.params.cleanerID;
//   const newChore = new Chore(req.body);
//   newChore.save((err, savedChore) => {
//     if (err) {
//       res.status(500);
//       console.log(err);
//       return next(err);
//     }
//     res.status(200).send(savedChore);
//   });
// });

//update one
choreRouter.put("/:choreId", (req, res, next) => {
  const choreId = req.params.choreId;
  Chore.findByIdAndUpdate(
    { _id: choreId },
    req.body,
    { new: true },
    (err, updatedChore) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      res.status(200).send(updatedChore);
    }
  );
});

//delete one

choreRouter.delete("/:choreId", (req, res, next) => {
  const choreId = req.params.choreId;
  Chore.findOneAndDelete({ _id: choreId }, (err, deletedChore) => {
    if (err) {
      res.status(500);
      console.log(err);
      return next(err);
    }
    if (!deletedChore) {
      res.status(404).send(`Chore not found`);
    } else {
      res
        .status(200)
        .send(
          `The Chore with the name ${deletedChore.choreName} and the id ${choreId}`
        );
    }
  });
});

module.exports = choreRouter;
