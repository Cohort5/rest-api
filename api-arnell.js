const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninjas');

// GET request
router.get("/ninjas", function(req, res, next) {
  Ninja.aggregate([{
    $geoNear: {
      near: {
        type: "Point",
        coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
      },
      distanceField: "dist.calculated",
      includeLocs: "dist.location",
      maxDistance: 100000,
      spherical: true
    }
  }])
    .then(function(ninja) {
      res.send(ninja);
    })
    .catch(next);
});


// POST request | add a new ninja to the db
router.post('/ninjas', function(req, res, next) {
    Ninja.create(req.body).then(function(ninja) {
        res.send(ninja);
    }).catch(next);
});

// UPDATE (put) request to put a new record in the db/collection
router.put('/ninjas/:id', function(req, res, next) {
    Ninja.findByIdAndUpdate({_id:req.params.id}, req.body).then(function() {
        Ninja.findOne({_id:req.params.id}).then(function(ninja) {
           res.send(ninja);  
        });
        
    });
   
});

// DELETE request
router.delete('/ninjas/:id', function(req, res, next) {
    Ninja.findByIdAndRemove({_id:req.params.id}).then(function(ninja) {
        res.send(ninja);
    });
});


module.exports = router;

