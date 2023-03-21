// backend/routes/api/spots.js
const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot, SpotImage, Review } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

  router.post('/', handleValidationErrors, async (req, res, next) => {
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

//   router.delete('/', (_req, res) => {
//       res.clearCookie('token');
//       return res.json({ message: 'success' });
//     }
//   );

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

            //get preview image and set it
            // spot.SpotImages.forEach(image => {
            //     if (image) {
            //         spot.previewImage = image.url;
            //     } else {
            //         spot.previewImage = null;
            //     }
            // })
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

  router.get('/current', async (req, res) => {
    const currentUserId = req.user.id;
    let spot = await Spot.findOne({where: {ownerId: currentUserId}});
    res.json(spot)
  })

  module.exports = router;
