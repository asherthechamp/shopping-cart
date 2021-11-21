const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const shortid = require("shortid");
const app = express();
const config = require('dotenv').config();

app.use(bodyParser.json());

// mongoose.connect("mongodb://localhost/react-shopping-cart-db", {

const user = "asherthechamp";
const pass = "MERNdev123";
const cls = "cluster0.bmbjt";
const db = "shopping-cart";
mongoose.connect(
  `mongodb+srv://${user}:${pass}@${cls}.mongodb.net/${db}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifieidTopology: true,
  }
);
const Product = mongoose.model(
  "products",
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    title: String,
    description: String,
    image: String,
    price: Number,
    availableSizes: [String],
  })
);

app.get("/products", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

app.post("/products", async (req, res) => {
  const newProduct = new Product(req.body);
  const savedProduct = await newProduct.save();
  res.send(savedProduct);
});

app.delete("/products/:id", async (req, res) => {
  const deleteProduct = await Product.findByIdAndDelete(req.params.id);
  res.send(deleteProduct);
});

const Order = mongoose.model(
  "order",
  new mongoose.Schema(
    {
      _id: {
        type: String,
        default: shortid.generate,
      },
      email: String,
      name: String,
      address: String,
      total: Number,
      cartItems: [
        {
          _id: String,
          title: String,
          price: Number,
          count: Number,
        },
      ],
    },
    {
      timestamps: true,
    }
  )
);

app.post("/orders", async (req, res) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.address ||
    !req.body.total ||
    !req.body.cartItems
  ) {
    return res.send({ message: "Data is required." });
  }
  const order = await Order(req.body).save();
  res.send(order);
});

// var dev_db_url = 'mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true'
// var dev_db_url = 'mongodb+srv://asherthechamp:<password>@cluster0.s84uu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
// var mongoDB = process.env.MONGODB_URI || dev_db_url;
// app.listen(mongoDB, () => console.log("serve at github pages"));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("serve at http://localhost:5000"));
