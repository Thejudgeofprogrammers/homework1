const express = require('express');
const redis = require('redis');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4000;
const REDIS_URL = process.env.REDIS_URL || 'localhost'
const client = redis.createClient({ url: REDIS_URL });

(async () => {
  await client.connect();
})();

app.post("/counter/:title", async (req, res) => {
  const { title } = req.params;
  try {
    const cnt = await client.incr(title);
    res.json({ msg: `Мы посмотрели`, cnt });
  } catch (error) {
    res.status(500).json({ msg: "Redis is not" });
  };
});

app.get("/morecounter/:title", async (req, res) => {
  try {
    const { title } = req.params
    const count = await client.get(title);
    res.json({ count });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server http://localhost:${PORT}`);
});