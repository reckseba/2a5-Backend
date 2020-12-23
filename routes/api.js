const express = require ('express');
const router = express.Router();
const Url = require('../models/url');

// the get action
router.get('/url', (req, res, next) => {

    res.json({
        error: "Hello there."
    });

    /*
    Url.find({})
        .then(data => res.json(data))
        .catch(next);
    */

});

router.get('/urlLong/:urlShort', (req, res, next) => {

        // /api/urlLong/[urlShort]
        // if urlShort is not given, it would take the /url route line 6

        // at first let's check if there is such url
        Url.countDocuments({urlShort: req.params.urlShort}, function (err, count) {

            // must be at least one
            if(count == 1){
                // match
                Url.findOne({"urlShort": req.params.urlShort})
                    .then(data => res.redirect(301, data.urlLong))
                    .catch(next);
            } else {
                // zero or more entries for that
                // but more cant be because those are unique according to schema
                res.json({
                    error: "There is no such urlShort."
                });
            }
        }); 

});

router.get('/urlQrCode/:urlShort', (req, res, next) => {

        // /api/urlQrCode/[urlShort]
        // if urlShort is not given, it would take the /url route line 6

        // at first let's check if there is such url
        Url.countDocuments({urlShort: req.params.urlShort}, function (err, count) {

            // must be at least one
            if(count == 1){
                // match
                Url.findOne({"urlShort": req.params.urlShort})
                    .then(data => res.json(data.urlQrCode))
                    .catch(next);
            } else {
                // zero or more entries for that
                // but more cant be because those are unique according to schema
                res.json({
                    error: "There is no such urlShort."
                });
            }
        }); 

});

// shorten a new url
router.post('/url', (req, res, next) => {

    if(req.body.urlLong){

        // here some url validate check

        // lookup if already there
        Url.countDocuments({urlLong: req.body.urlLong}, function (err, count) {

            if(count > 0){
                // match
                res.json({
                    error: "This url already exists."
                });
            } else {
                // zero or more entries for that
                // but more cant be because those are unique according to schema
                Url.create(req.body)
                    .then(data => res.json(data))
                    .catch(next)
            }
        });

    } else {
        // if it's empty

        res.json({
            error: "There is no url given."
        })

    }

});

/*
router.delete('/url/:id', (req, res, next) => {
  Url.findOneAndDelete({"_id": req.params.id})
    .then(data => res.json(data))
    .catch(next)
});
*/

module.exports = router;