const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();

app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@amarclastar.oxggard.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const useCollection = client.db("useProducts").collection("product");
    const categoriCollection = client.db("useProducts").collection("categori");

    app.get("/bikeCollection", async (req, res) => {
      const query = {};
      const options = await useCollection.find(query).toArray();
      res.send(options);
    });

    app.get("/categori/:id", async (req, res) => {
      const id = req.params.id;
      const query = { categori: id };
      const result = await categoriCollection.find(query).toArray();
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.log());

app.get("/", (req, res) => {
  res.send("server is running");
});

app.listen(port, () => {
  console.log(`server is running ${port}`);
});
