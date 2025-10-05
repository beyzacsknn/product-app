const express = require("express");
const cors = require("cors");
const fs = require("fs");
const axios = require("axios");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

const GOLD_API_KEY = process.env.GOLD_API_KEY;

async function getGoldPrice() {
  try {
    const response = await axios.get("https://www.goldapi.io/api/XAU/USD", {
      headers: { "x-access-token": GOLD_API_KEY },
    });
    return response.data.price_gram_24k;
  } catch (error) {
    console.error("Altın fiyatı alınamadı:", error);
    return 65;
  }
}

app.get("/api/products", async (req, res) => {
  try {
    const productsData = JSON.parse(
      fs.readFileSync(path.join(__dirname, "data", "products.json"), "utf8")
    );
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

const frontendPath = path.join(__dirname, "frontend/dist");

app.use(express.static(frontendPath));

app.get("/*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Backend + Frontend çalışıyor: http://localhost:${PORT}`);
});
