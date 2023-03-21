// backend/routes/api/spots.js
const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot, SpotImage, Review, User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

  router.post('/', handleValidationErrors, async (req, res, next) => {
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
    } catch (err) {
        res.status(400)
        return res.json(err)
    }
    }
  );

//   router.delete('/', (_req, res) => {
//       res.clearCookie('token');
//       return res.json({ message: 'success' });
//     }
//   );

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
        spotsList.forEach(spot => {
            let ratings = [];
            spot.Reviews.forEach(review => {
                ratings.push(review.stars)
            })
            let sum = ratings.reduce((acc, curr) => {
                return acc + curr;
            }, 0)
            let avg = sum / ratings.length;
                spot.avgRating = avg;

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
  router.get('/current', async (req, res) => {
    const currentUserId = req.user.id;
    let spot = await Spot.findAll({where: {ownerId: currentUserId}});
    res.json(spot)
  });

  router.get('/:spotId', async (req, res) => {
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
        currSpot.avgRating = avg;
    //set owner
    // currSpot.Owner = {
    //     id,
    //     firstName,
    //     lastName
    // }
    let owner = await User.findByPk(currSpot.ownerId)
    currSpot.Owner = {
        id: owner.id,
        firstName: owner.firstName,
        lastName: owner.lastName
    };

    delete currSpot.Reviews;
    res.json(currSpot)
    } else {
        res.status(404)
        throw new Error('Spot Couldn\'t be found')
    }
  });

  module.exports = router;
