const express = require("express");
const { v4: uuidv4 } = require("uuid");

const bountyRouter = express.Router();

const bounties = [
  {
    firstName: "Darth",
    lastName: "Vader",
    living: false,
    bountyAmount: 5000000,
    type: "Sith",
    _id: uuidv4(),
  },
  {
    firstName: "Emperor",
    lastName: "Palpatine",
    living: false,
    bountyAmount: 10000000,
    type: "Sith",
    _id: uuidv4(),
  },
  {
    firstName: "Darth",
    lastName: "Maul",
    living: false,
    bountyAmount: 3000000,
    type: "Sith",
    _id: uuidv4(),
  },
  {
    firstName: "Count",
    lastName: "Dooku",
    living: false,
    bountyAmount: 4000000,
    type: "Sith",
    _id: uuidv4(),
  },
  {
    firstName: "Kylo",
    lastName: "Ren",
    living: false,
    bountyAmount: 6000000,
    type: "Sith",
    _id: uuidv4(),
  },
  {
    firstName: "Asajj",
    lastName: "Ventress",
    living: false,
    bountyAmount: 2500000,
    type: "Sith",
    _id: uuidv4(),
  },
  {
    firstName: "General",
    lastName: "Grievous",
    living: false,
    bountyAmount: 3500000,
    type: "Sith",
    _id: uuidv4(),
  },
  {
    firstName: "Darth",
    lastName: "Sidious",
    living: false,
    bountyAmount: 8000000,
    type: "Sith",
    _id: uuidv4(),
  },
  {
    firstName: "Snoke",
    lastName: " ",
    living: false,
    bountyAmount: 7000000,
    type: "Sith",
    _id: uuidv4(),
  },
  {
    firstName: "Savage",
    lastName: "Opress",
    living: false,
    bountyAmount: 2000000,
    type: "Sith",
    _id: uuidv4(),
  },
];
//get all bounties
bountyRouter.get("/", (req, res) => {
  res.send(bounties);
});

//get one 
bountyRouter.get("/:bountyId",(req,res)=>{
  const bountyId = req.params.bountyId
  const foundBounty =bounties.find((bounty)=> bounty._id ===bountyId)
  res.send(foundBounty)
})
//post one bounty
bountyRouter.post("/", (req, res) => {
  const newBounty = req.body;
  newBounty._id = uuidv4();
  bounties.push(newBounty);
  res.send(`successfully added ${newBounty.firstName} to the bounty list`);
});

//update one Bounty
bountyRouter.put("/:bountyId", (req, res) => {
  const bountyId = req.params.bountyId;
  const newBounty = req.body;
  const bountyIndex = bounties.findIndex((bounty) => bounty._id === bountyId);
  const updatedBounty = Object.assign(bounties[bountyIndex], newBounty);
  res.send(updatedBounty);
});

//delete a bounty
bountyRouter.delete("/:bountyId", (req, res) => {
  const bountyId = req.params.bountyId;
  const bountyIndex = bounties.findIndex((bounty) => bounty._id === bountyId);

  bounties.splice(bountyIndex, 1);

  res.send(`Successfully deleted the item with the ID ${bountyId}`);
});

module.exports = bountyRouter;
