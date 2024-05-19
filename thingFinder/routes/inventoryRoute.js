const express = require("express");

const inventoryRouter = express.Router();

const inventoryItems = [
  {
    name: "banana",
    type: "food",
    price: 200,
  },
  {
    name: "pants",
    type: "clothing",
    price: 2500,
  },
  {
    name: "basket ball",
    type: "toy",
    price: 1000,
  },
  {
    name: "rockem sockem robots",
    type: "toy",
    price: 1500,
  },
  {
    name: "shirt",
    type: "clothing",
    price: 800,
  },
  {
    name: "soup",
    type: "food",
    price: 300,
  },
  {
    name: "flour",
    type: "food",
    price: 100,
  },
];
//get all
inventoryRouter.get("/", (req, res) => {
  res.send(inventoryItems);
});

//get one
inventoryRouter.get("/item/price/:price", (req, res) => {
  price = Number(req.params.price);
  foundPrice = inventoryItems.find((item) => item.price === price);
  res.send(foundPrice);
});

//get by type and price

inventoryRouter.get("/search", (req, res) => {
  const { type, name, min, max } = req.query;

  let filteredItems = inventoryItems;

  if (type) {
    filteredItems = filteredItems.filter((item) => item.type === type);
  }
  if (name) {
    filteredItems = filteredItems.filter((item) => item.name === name);
  }
  if (min !== undefined && max !== undefined) {
    const minPrice = Number(min);
    const maxPrice = Number(max);
    filteredItems = filteredItems.filter(
      (item) => item.price >= minPrice && item.price <= maxPrice
    );
  } else if (min !== undefined) {
    const minPrice = Number(min);
    filteredItems = filteredItems.filter((item) => item.price >= minPrice);
  } else if (max !== undefined) {
    const maxPrice = Number(max);
    filteredItems = filteredItems.filter((item) => item.price <= maxPrice);
  }
  //   if (price) {
  //     filteredItems = filteredItems.filter(
  //       (item) => item.price === Number(price)
  //     );
  //   }

  res.send(filteredItems);
});
module.exports = inventoryRouter;
