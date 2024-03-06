import redis from "redis";
import util from "util";
import express from "express";

const redisURL = "redis://127.0.0.1:6379";
const app = express();
const port = 1245;
let client;

const listProducts = [
  {
    itemId: 1,
    itemName: "Suitcase 250",
    price: 50,
    initialAvailableQuantity: 4,
  },
  {
    itemId: 2,
    itemName: "Suitcase 450",
    price: 100,
    initialAvailableQuantity: 10,
  },
  {
    itemId: 3,
    itemName: "Suitcase 650",
    price: 350,
    initialAvailableQuantity: 2,
  },
  {
    itemId: 4,
    itemName: "Suitcase 1050",
    price: 550,
    initialAvailableQuantity: 5,
  },
];

function getItemById(id) {
  for (let item of listProducts) {
    if (item["itemId"] === id) return item;
  }
}

(async function () {
  client = redis.createClient({ url: redisURL });
  client.on("error", (err) =>
    console.log("Redis client not connected to the server:", err)
  );

  client.on("connect", () =>
    console.log("Redis client connected to the server")
  );
})();

// save to redis
function reserveStockById(itemId, stock) {
  client.set(itemId, stock);
}

const getItem = util.promisify(client.get).bind(client);
async function getCurrentReservedStockById(itemId) {
  return await getItem(itemId);
}

app.get("/list_products", (req, res) => {
  res.send(JSON.stringify(listProducts));
});

app.get("/list_products/:itemId", (req, res) => {
  const { itemId } = req.params;
  const item = getItemById(Number(itemId));
  if (!item) res.send(JSON.stringify({ status: "Product not found" }));

  const currentStock = getCurrentReservedStockById(itemId);
  if (!currentStock) item["currentQuantity"] = currentStock;
  else item["currentQuantity"] = item["initialAvailableQuantity"];
  res.send(JSON.stringify(item));
});

app.get("/reserve_product/:itemId", (req, res) => {
  const { itemId } = req.params;
  const item = getItemById(Number(itemId));
  if (!item) res.send(JSON.stringify({ status: "Product not found" }));
  if (item["initialAvailableQuantity"] <= 1) {
    res.send(
      JSON.stringify({
        status: "Not enough stock available",
        itemId: itemId,
      })
    );
  }
  reserveStockById(itemId, 1);
  res.send(JSON.stringify({ status: "Reservation confirmed", itemId: itemId }));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
