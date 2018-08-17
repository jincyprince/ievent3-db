const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Booking = require('../models/Booking');


router.get('/', (req, res) => {
        let search = {};

    //     if (!!req.params.qCode) {
    //         search['name'] = req.params.qCode;
    //     }

    Booking.find(search)
        .then(bks => res.json(bks))
        .catch(err => console.log(err));
});

router.post('/', (req, res) => {

    const newBooking = new Booking({
        school: req.body.school,
        city: req.body.city,
        date: req.body.date,
        duration: req.body.duration,
        time: req.body.time,
        sports: req.body.sports.split(','),
    });

    newBooking
        .save()
        .then(sch => res.json(sch))
        .catch(err => console.log(err));

});
module.exports = router;
