const express = require("express")
const router = express.Router()
const paypal = require('paypal-rest-sdk')
const ListingsModel = require('../models/listing')
const generateMail = require('./mailgenration')
const {clientID, clientSecret} = process.env

paypal.configure({
    'mode': 'sandbox',
    'client_id': clientID,
    'client_secret': clientSecret
})
// payment Page Redirect you to paypal

router.get('/pay', async (req, res) => {

    let bookNowListing = await ListingsModel.findById(req.query).lean()
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/success",
            "cancel_url": "http://localhost:3000/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": bookNowListing.housename,
                    "sku": Math.floor(Math.random() * 999999),
                    "price": bookNowListing.price,
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": bookNowListing.price
            },
            "description": "Hat for the best team ever"
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            console.log(error);
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    res.redirect(payment.links[i].href);
                }
            }
        }
    });

});

// payment Success Page

router.get('/success', (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
        "payer_id": payerId,

    };

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            let result = []
            result.push((payment))
            generateMail.generateMail(req.session.user.email, req.session.user.name,
                `Thank you!!!.

                Your Payment Has Been SucessFully Created,
                And Your Booking Has Been Confirmed.
                
                Your Payment Details Are,
                Payment Id: ${paymentId}
                Payer Id : ${payerId}.
                Requested You To Kindly Take This Print Out With You.
                
                Regards:
                Team HAFH
            `)
            res.render('paypal', { result });

        }
    });
});

// if payment cancelled

router.get('/cancel', (req, res) => res.send('Cancelled'));

module.exports = router