// backend/routes/api/spots.js
const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');
const { Spot, SpotImage, User, Review, ReviewImage, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSpot = [
    check('address')
      .exists({ checkFalsy: true })
      .withMessage("Street address is required"),
    check('city')
      .exists({ checkFalsy: true })
      .withMessage("City is required"),
    check('state')
      .exists({ checkFalsy: true })
      .withMessage("State is required"),
    check('country')
      .exists({ checkFalsy: true })
      .withMessage("Country is required"),
    check('lat')
      .exists({ checkFalsy: true })
      .isFloat({ checkFalsy: true })
      .withMessage("Latitude is not valid"),
    check('lng')
      .exists({ checkFalsy: true })
      .isFloat({ checkFalsy: true })
      .withMessage("Longitude is not valid"),
    check('name')
      .exists({ checkFalsy: true })
      .isLength({ max: 50 })
      .withMessage("Name must be less than 50 characters"),
    check('description')
      .exists({ checkFalsy: true })
      .withMessage("Description is required"),
    check('price')
      .exists({ checkFalsy: true })
      .withMessage("Price per day is required"),
    handleValidationErrors
  ];

  const validateReview = [
    check('review')
      .exists({ checkFalsy: true })
      .withMessage("Review text is required"),
    check('stars')
      .exists({ checkFalsy: true })
      .isNumeric({ checkFalsy: true })
      .custom((value, { req }) => value >= 1 && value <= 5)
      .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
  ];

  router.post('/', [validateSpot, requireAuth], async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const { user } = req;
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
    }
  );


  //get all spots
  router.get('/', async (req, res, next) => {


      let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

      //pagination
      if (page) {
          page = parseInt(page)
        } else {
            page = 1
        }
        if (size) {
            size = parseInt(size)
        } else {
        size = 20
    }
    let limit;
    let offset;
    if (page >= 1 && size >= 1) {
        limit = size;
        offset = size * (page - 1);
        //VALIDATE PAGE
    } else if (page <= 0) {
        let err = {};
        err.status = 400;
        err.message = "Bad Request";
        err.errors = {
            page: "Page must be greater than or equal to 1",
            size: "Size must be greater than or equal to 1",
            maxLat: "Maximum latitude is invalid",
            minLat: "Minimum latitude is invalid",
            minLng: "Maximum longitude is invalid",
            maxLng: "Minimum longitude is invalid",
            minPrice: "Minimum price must be greater than or equal to 0",
            maxPrice: "Maximum price must be greater than or equal to 0"
        }
        return next(err)
        //VALIDATE SIZE
    } else if (size <= 0) {
        let err = {};
        err.status = 400;
        err.message = "Bad Request";
        err.errors = {
            page: "Page must be greater than or equal to 1",
            size: "Size must be greater than or equal to 1",
            maxLat: "Maximum latitude is invalid",
            minLat: "Minimum latitude is invalid",
            minLng: "Maximum longitude is invalid",
            maxLng: "Minimum longitude is invalid",
            minPrice: "Minimum price must be greater than or equal to 0",
            maxPrice: "Maximum price must be greater than or equal to 0"
        }
        return next(err)
    }
    //search queries
    let where = {}
    //VALIDATE MIN AND MAX LAT AND LNG
    if (isNaN(minLat) && minLat || isNaN(maxLat) && maxLat || isNaN(minLng) && minLng || isNaN(maxLng) && maxLng) {
        let err = {};
        err.status = 400;
        err.message = "Bad Request";
        err.errors = {
            page: "Page must be greater than or equal to 1",
            size: "Size must be greater than or equal to 1",
            maxLat: "Maximum latitude is invalid",
            minLat: "Minimum latitude is invalid",
            minLng: "Maximum longitude is invalid",
            maxLng: "Minimum longitude is invalid",
            minPrice: "Minimum price must be greater than or equal to 0",
            maxPrice: "Maximum price must be greater than or equal to 0"
        }
        return next(err)
    }
    //VALIDATE MIN AND MAX PRICE
    if (minPrice < 0 || maxPrice < 0) {
        let err = {};
        err.message = "Bad Request";
        err.errors = {
            page: "Page must be greater than or equal to 1",
            size: "Size must be greater than or equal to 1",
            maxLat: "Maximum latitude is invalid",
            minLat: "Minimum latitude is invalid",
            minLng: "Maximum longitude is invalid",
            maxLng: "Minimum longitude is invalid",
            minPrice: "Minimum price must be greater than or equal to 0",
            maxPrice: "Maximum price must be greater than or equal to 0"
        }
        err.status = 400;
        return next(err)
    }

    if (minLat && maxLat) {
        where.lat = {[Op.between]: [minLat, maxLat]}
    } else {
        if (minLat) where.lat = {[Op.gt]: minLat}
        if (maxLat) where.lat = {[Op.lt]: maxLat}
    }
    if (minLng && maxLng) {
        where.lat = {[Op.between]: [minLng, maxLng]}
    } else {
        if (minLng) where.lng = {[Op.gt]: minLng}
        if (maxLng) where.lng = {[Op.lt]: maxLng}
    }
    if (minPrice && maxPrice) {
        where.price = {[Op.between]: [minPrice, maxPrice]}
    } else {
        if (minPrice && minPrice >= 0) where.price = {[Op.gt]: minPrice}
        if (maxPrice && maxPrice >= 0) where.price = {[Op.lt]: maxPrice}
    }

      const spots = await Spot.findAll({
        where,
        include: [
            {
                model: SpotImage
            },
            {
                model: Review
            },
        ],
        limit,
        offset
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
        res.json({
            Spots: spotsList,
            page: page,
            size: size
        })
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
    currSpot.avgStarRating = parseFloat(avg.toFixed(1));

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
  router.put('/:spotId', [validateSpot, requireAuth], async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
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
    router.post('/:spotId/reviews', [validateReview, requireAuth], async (req, res, next) => {
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

          //create booking for spot
    router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
        const spot = await Spot.findByPk(req.params.spotId);
        let { startDate, endDate } = req.body;
        const { user } = req;

        if (user.id === spot.ownerId) {
            let err = {};
            err.message = "Forbidden";
            err.status = 403;
            next(err)
          }
          //find this spots bookings
        const existingBookings = await Booking.findAll({where: {spotId: parseInt(req.params.spotId)}})

        let bookingsList = [];
        existingBookings.forEach(booking => {
            bookingsList.push(booking.toJSON())
        })

        for (let i = 0; i < bookingsList.length; i++) {
            //for every booking on this spot, check the dates for conflicts with new booking
            let booking = bookingsList[i];
            bookingStartDate = booking.startDate.toJSON().split('T')[0];
            bookingEndDate = booking.endDate.toJSON().split('T')[0];

            let err = {};
            if (startDate >= bookingStartDate && startDate <= bookingEndDate) {
                res.status(403)
                err.message = "Sorry, this spot is already booked for the specified dates"
                err.errors = {}
                err.errors.startDate = "Start date conflicts with an existing booking"
                if (endDate >= bookingStartDate && endDate <= bookingEndDate) {
                    res.status(403)
                    err.message = "Sorry, this spot is already booked for the specified dates"
                    err.errors.endDate = "End date conflicts with an existing booking"
                }
                return res.json(err)
            }
            if (endDate >= bookingStartDate && endDate <= bookingEndDate) {
                res.status(403)
                err.message = "Sorry, this spot is already booked for the specified dates"
                err.errors = {}
                err.errors.endDate = "End date conflicts with an existing booking"
                return res.json(err)
            }
        }

        if (endDate <= startDate) {
            res.status(400)
            let err = {};
            err.message = "Bad Request"
            err.errors = {
                endDate: "endDate cannot be on or before startDate",
            }
            return res.json(err)
        }

        if (!spot) {
            let err = {};
            err.message = "Spot couldn\'t be found";
            res.status(404);
            return res.json(err);
        }

        const currBooking = await Booking.create({
            userId: user.id,
            spotId: parseInt(req.params.spotId),
            startDate,
            endDate
        })
        res.status(200)
        res.json(currBooking)
      });

  module.exports = router;
