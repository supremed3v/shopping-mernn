/* eslint-disable */

const functions = require("firebase-functions");
const stripe = require("stripe")(
  "sk_test_51Lyc8kAubbU9BPA8N2YZnhRd8Z0Ldqfy5Xi6IORifEja5b9gZcPnJPk6BZVC2PezQOp19fBbfPsUJmNnBLX30hRM00gsYPxvpG"
);
const express = require("express");

const app = express();

app.post("/payment-sheet", async (req, res) => {
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKey.create(
    { customer: customer.id },
    { apiVersion: "2022-08-01" }
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body,
    currency: "usd",
    customer: customer.id,
  });
  res.json({
    paymentIntent: paymentIntent.client_secret,
    customer: customer.id,
    ephemeralKey: ephemeralKey.secret,
    publishableKey:
      "pk_test_51Lyc8kAubbU9BPA8BjH1LE6nm7PnefGDwIqxzeEVXm0IyxXhAO5Rus0MebYmZ7kTVRdJvkii4JYtwpbsVTcpSB4M00COXWYVSs",
  });
});

exports.expressApi = functions.https.onRequest(app);
