// backend/routes/api/spots.js
const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, User, Review, ReviewImage, Booking } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

  router.post('/', [handleValidationErrors, requireAuth], async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const { user } = req;
    try {
        const spot = await Spot.create({
            address,
            ownerId: user.id,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
          });
          res.status(201)
          return res.json(spot);
    } catch (e) {
        res.status(400)
        let err = {};
        err.message = "Bad Request"
        err.errors = {
            address: "Street address is required",
            city: "City is required",
            state: "State is required",
            country: "Country is required",
            lat: "Latitude is not valid",
            lng: "Longitude is not valid",
            name: "Name must be less than 50 characters",
            description: "Description is required",
            price: "Price per day is required"
        }
        return res.json(err)
    }
    }
  );


  //get all spots
  router.get('/', async (req, res) => {
      const spots = await Spot.findAll({
        include: [
            {
                model: SpotImage
            },
            {
                model: Review
            },
        ]
      })
        //adding each spot to json in a list
        let spotsList = [];
        spots.forEach(spot => {
            spotsList.push(spot.toJSON());
        });
        //getting avg rating
        let ratings = [];
        spotsList.forEach(spot => {
            spot.Reviews.forEach(review => {
                ratings.push(review.stars)
            })
            let sum = ratings.reduce((acc, curr) => {
                return acc + curr;
            }, 0)
            console.log(sum)
            let avg = sum / ratings.length;
                spot.avgRating = parseFloat(avg.toFixed(1));

            if (spot.SpotImages) {
                let previewImage = spot.SpotImages[0];
                if (previewImage) {
                    spot.previewImage = previewImage.url;
                }else {
                    spot.previewImage = null;
                }
            }
            delete spot.SpotImages;
            delete spot.Reviews;
        });
        res.json({Spots: spotsList})
    }
  );

  //get all of current users spots
  router.get('/current', requireAuth, async (req, res) => {
    const currentUserId = req.user.id;
    let spot = await Spot.findAll({where: {ownerId: currentUserId}});
    res.json({ Spots: spot })
  });

  //get spot by id
  router.get('/:spotId', async (req, res, next) => {
    const spotId = req.params.spotId;
    // const { id, firstName, lastName } = req.user;
    let spot = await Spot.findByPk(spotId, {
        include: [
            {
                model: SpotImage,
                attributes: ['id', 'url', 'preview']
            },
            {
                model: Review
            }
        ]
    });
    if (spot) {
           //make spot workable
    let spotArr = [];
    spotArr.push(spot.toJSON());
    let currSpot = spotArr[0];
    //get num reviews
    let ratings = [];
    currSpot.Reviews.forEach(review => {
        ratings.push(review.stars)
    })
    let reviewLen = ratings.length;
    currSpot.numReviews = reviewLen;
    //get avg
    let sum = ratings.reduce((acc, curr) => {
        return acc + curr;
    }, 0)
    let avg = sum / ratings.length;
        currSpot.avgStarRating = avg;

    let owner = await User.findByPk(currSpot.ownerId)
    currSpot.Owner = {
        id: owner.id,
        firstName: owner.firstName,
        lastName: owner.lastName
    };

    delete currSpot.Reviews;
    res.json(currSpot)
    } else {
        let err = {};
        err.message = 'Spot couldn\'t be found'
        res.status(404)
        return res.json(err)
    }
  });
  //add new spot image
  router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    let { user } = req;
    let { url, preview } = req.body;
    let id = req.params.spotId;

    const spot = await Spot.findByPk(id);

    if (!spot) {
        let err = {};
        err.message = "Spot couldn\'t be found";
        res.status(404);
        return res.json(err);
    }


    if (user.id === spot.ownerId) {
        const  image = await SpotImage.create({
            spotId: id,
            url,
            preview,
        });
        res.json({
            id: image.id,
            url: image.url,
            preview: image.preview
        })
    } else {
        let err = {};
        err.message = "Forbidden";
        err.status = 403;
        next(err)
    };
  });

//   edit a spot
  router.put('/:spotId', requireAuth, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    if (!address || !city || !state || !country || isNaN(lat) || isNaN(lng) || !name || !description || !price) {
        res.status(400)
        let err = {};
        err.message = "Bad Request"
        err.errors = {
            address: "Street address is required",
            city: "City is required",
            state: "State is required",
            country: "Country is required",
            lat: "Latitude is not valid",
            lng: "Longitude is not valid",
            name: "Name must be less than 50 characters",
            description: "Description is required",
            price: "Price per day is required"
        }
        return res.json(err)
    }
    const { user } = req;
    let id = req.params.spotId;

    const spot = await Spot.findByPk(id);

    if (!spot) {
        let err = {};
        err.message = "Spot couldn\'t be found";
        res.status(404);
        return res.json(err);
    }

    if (user.id === spot.ownerId) {
        await spot.update({
            address,
            ownerId: user.id,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        });
        res.json(spot)
    } else {
        let err = {};
        err.message = "Forbidden";
        err.status = 403;
        next(err)
    };
  });

  //delete a spot
  router.delete('/:spotId', requireAuth, async (req, res, next) => {

    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        let err = {};
        err.message = "Spot couldn\'t be found";
        res.status(404);
        return res.json(err);
    }

    const { user } = req;
    if (user.id === spot.ownerId) {
        await spot.destroy();
        res.json({
            message: "Successfully deleted"
        });
    } else {
        let err = {};
        err.message = "Forbidden";
        err.status = 403;
        next(err)
    };
  });

  //get reviews by spot id
  router.get('/:spotId/reviews', async (req, res, next) => {
      const spot = await Spot.findByPk(req.params.spotId);

      if (!spot) {
          let err = {};
          err.message = "Spot couldn\'t be found";
          res.status(404);
          return res.json(err);
        }

        const reviews = await Review.findAll({
            where: {spotId: req.params.spotId},
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                },
                {
                    model: ReviewImage,
                    attributes: ['id', 'url']
                }

            ]
        });


    res.status(200)
    res.json(reviews)
  });

  //get bookings by spot id
  router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        let err = {};
        err.message = "Spot couldn\'t be found";
        res.status(404);
        return res.json(err);
      }

      const { user } = req;
      if (user.id === spot.ownerId) {
        const bookings = await Booking.findAll({
            where: {spotId: req.params.spotId},
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                }
            ]
        });
        res.status(200)
        res.json(bookings)
      } else {
        const bookings = await Booking.findAll({
            where: {spotId: req.params.spotId},
            attributes: ["spotId", "startDate", "endDate"]
        });
        res.status(200)
        res.json({Bookings: bookings})
      };

});

    //create review for spot
    router.post('/:spotId/reviews', requireAuth, async (req, res, next) => {
        const spot = await Spot.findByPk(req.params.spotId);
        const { review, stars } = req.body;
        const { user } = req;

        const existingReviews = await Review.findOne({where: {userId: user.id, spotId: parseInt(req.params.spotId)}})

        if (existingReviews) {
            res.status(403)
            let err = {};
            err.message = "User already has a review for this spot"
            return res.json(err)
        }

        if (!review || !stars || isNaN(stars) || stars < 1 || stars > 5) {
            res.status(400)
            let err = {};
            err.message = "Bad Request"
            err.errors = {
                review: "Review text is required",
                stars: "Stars must be an integer from 1 to 5",
            }
            return res.json(err)
        }

        if (!spot) {
            let err = {};
            err.message = "Spot couldn\'t be found";
            res.status(404);
            return res.json(err);
        }

        const currReview = await Review.create({
            userId: user.id,
            spotId: parseInt(req.params.spotId),
            review,
            stars
        })
        res.status(200)
        res.json(currReview)
      });

  module.exports = router;
