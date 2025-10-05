const express = require("express");
const cors = require("cors");
const fs = require("fs");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(cors());

const GOLD_API_KEY = process.env.GOLD_API_KEY;


async function getGoldPrice() {
  try {
    const response = await axios.get("https://www.goldapi.io/api/XAU/USD", {
      headers: { "x-access-token": process.env.GOLD_API_KEY }
    });

    return response.data.price_gram_24k;

  } catch (error) {
    console.error("Altın fiyatı alınamadı:", error);
    return 65;
  }
}


app.get("/api/products", async (req, res) => {
  try {
    const productsData = JSON.parse(fs.readFileSync("data/products.json", "utf8"));
    const goldPrice = await getGoldPrice();

    const products = productsData.map((p) => {
      const price = (p.popularityScore + 1) * p.weight * goldPrice; 
      return {
        ...p,
        price: price.toFixed(2),
        popularityScore5: (p.popularityScore * 5).toFixed(1),
      };
    });

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sunucu hatası" });
  }
});

app.listen(PORT, () => {
  console.log(` Backend API çalışıyor: http://localhost:${PORT}/api/products`);
});
