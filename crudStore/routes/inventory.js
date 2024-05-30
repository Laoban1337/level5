const express = require("express");
const inventoryRouter = express.Router();
const Inventory = require("../models/inventory");

// get all items
inventoryRouter.get("/", async (req, res, next) => {
  Inventory.find((err, items) => {
    const error = new Error("Could not get any items");
    if (err) {
      res.status(500);
      console.log(err);
      return next(err);
    }
    res.status(200).send(items);
  });
});

//get one item
inventoryRouter.get("/:itemId", (req, res, next) => {
  const itemId = req.params.itemId;

  Inventory.findById(itemId, (err, foundItem) => {
    if (err || !foundItem) {
      const error = new Error(
        "the item you were searching for was not found or doesn't exsist!"
      );
      res.status(500);
      return next(error);
    }
    res.status(200).send(foundItem);
  });
});

//get by type
inventoryRouter.get("/search/type", (req, res, next) => {
  const type = req.query.type;
  if (!type) {
    const error = new Error("Type query parameter is required");
    res.status(400);
    return next(error);
  }

  Inventory.find({ type: type }, (err, items) => {
    if (err) {
      const typeError = new Error(err);
      res.status(500);
      return next(typeError);
    }
    res.status(200).send(items);
  });
});

//post one
//"There was an error posting this item"
inventoryRouter.post("/", (req, res, next) => {
  const newItem = new Inventory(req.body);
  newItem.save((err, savedItem) => {
    if (err) {
      const postError = new Error(err);
      res.status(500);
      return next(postError);
    }
    res.status(201).send(savedItem);
  });
});

//update One
inventoryRouter.put("/:itemId", (req, res, next) => {
  const itemId = req.params.itemId;
  const updatedData = req.body
  Inventory.findOneAndUpdate(
    { _id: itemId },
    updatedData,
    { new: true },
    (err, updatedItem) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      res.status(200).send(updatedItem);
    }
  );
});

//delete one
inventoryRouter.delete("/:itemId", (req, res, next) => {
  Inventory.findOneAndDelete({ _id: req.params.itemId }, (err, deletedItem) => {
    if (err) {
      res.status(500);
      if (_id === null) {
        res.status(500);
        return next(err);
      }
    }
    res.status(200).send(`Successfully deleted ${deletedItem.itemName}`);
  });
});

module.exports = inventoryRouter;
