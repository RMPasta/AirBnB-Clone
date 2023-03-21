// backend/routes/api/spots.js
const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot, SpotImage, Review } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// const validateLogin = [
//     check('credential')
//       .exists({ checkFalsy: true })
//       .notEmpty()
//       .withMessage('Please provide a valid email or username.'),
//     check('password')
//       .exists({ checkFalsy: true })
//       .withMessage('Please provide a password.'),
//     handleValidationErrors
//   ];

//   router.post(
//     '/',
//     validateLogin,
//     async (req, res, next) => {
//       const { credential, password } = req.body;

//       const user = await User.unscoped().findOne({
//         where: {
//           [Op.or]: {
//             username: credential,
//             email: credential
//           }
//         }
//       });

//       if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
//         const err = new Error('Invalid credentials');
//         err.status = 401;
//         err.title = 'Login failed';
//         err.errors = { credential: 'The provided credentials were invalid.' };
//         return next(err);
//       }

//       const safeUser = {
//         id: user.id,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//         username: user.username,
//       };

//       await setTokenCookie(res, safeUser);

//       return res.json({
//         user: safeUser
//       });
//     }
//   );

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

            spot.SpotImages.forEach(image => {
                if (image) {
                    spot.previewImage = image.url;
                }
            })
            delete spot.SpotImages;
            delete spot.Reviews;
        });
        res.json({Spots: spotsList})
    }
  );


  module.exports = router;
