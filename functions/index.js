/* eslint-disable max-len */
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51KNGc3CBqQ39smq1RUQUn8upHnMSqQpMgUPJScIEjJqDz5j6rbQvBGP1sCXWRJCCs3dfdNNhFx31U015XtfiZR1800OOBzuM21");

// API

// -App config
const app = express();

// -Middlewares
// eslint-disable-next-line object-curly-spacing
app.use(cors({ origin: true}));
app.use(express.json());

// -API routes
app.get("/", (request, response) => response.status(200).send("Hello, world"));

app.post("/payments/create", async (request, response) => {
    const total = request.query.total;

    //console.log("Payment request received for this amount ", total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, // Subunits of the currency
        currency: "usd",
    });

    //OK - Created (201)
    response.status(201).send({
        clientSecret: paymentIntent.client_secret
    });
});

// -Listen command
exports.api = functions.https.onRequest(app);

// Example endpoint

// http://localhost:5001/clone-d59c6/us-central1/api
