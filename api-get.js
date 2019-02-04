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