/* eslint-disable */

const functions = require("firebase-functions");
const Stripe = require("stripe");
const stripe = Stripe(
  "sk_test_51Lyc8kAubbU9BPA8N2YZnhRd8Z0Ldqfy5Xi6IORifEja5b9gZcPnJPk6BZVC2PezQOp19fBbfPsUJmNnBLX30hRM00gsYPxvpG"
);
const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 5000;
app.use(cors({ origin: true }));

app.use(express.json());

app.post("/payment", async (req, res) => {
  try {
    let { amount } = req.body;
    amount = parseInt(amount);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "PKR",
      payment_method_types: ["card"],
    });
    const clientSecret = paymentIntent.client_secret;
    res.json({ message: "Payment initiated", clientSecret });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));

exports.expressApi = functions.https.onRequest(app);
