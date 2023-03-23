const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Booking, User, Spot, ReviewImage, SpotImage } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


router.get('/current', requireAuth, async (req, res, next) => {
    const currentUserId = req.user.id;
    let bookings = await Booking.findAll({
        where: {userId: currentUserId},
        include: [
            {
                model: Spot
            }
        ]
    });
    let bookingList = [];
    bookings.forEach(booking => {
        bookingList.push(booking.toJSON())
    })
    for (let i = 0; i < bookingList.length; i++) {
        let booking = bookingList[i];
        const spotImage = await SpotImage.findOne({
            where: {spotId: booking.spotId},
            attributes: ['url']
        });
        booking.Spot.previewImage = spotImage.url;
        delete booking.Spot.createdAt;
        delete booking.Spot.updatedAt;
    }
    res.json({ Bookings: bookingList })
});

//   edit a booking
router.put('/:reviewId', requireAuth, async (req, res, next) => {
    let { review, stars } = req.body;
    stars = parseInt(stars);
    console.log(review, stars)
    if (!review || isNaN(stars) || stars < 1 || stars > 5) {
        res.status(400)
        let err = {};
        err.message = "Bad Request"
        err.errors = {
            review: "Review text is required",
            stars: "Stars must be an integer from 1 to 5",
        }
        return res.json(err)
    }
    const { user } = req;
    let id = req.params.reviewId;

    const currbooking = await booking.findByPk(id);

    if (!currbooking) {
        let err = {};
        err.message = "booking couldn\'t be found";
        res.status(404);
        return res.json(err);
    }

    if (user.id === currbooking.userId) {
        await currbooking.update({
            booking: booking,
            stars,
        });
        res.json(currbooking)
    } else {
        let err = {};
        err.message = "Forbidden";
        err.status = 403;
        next(err)
    };
  });

  //delete a booking
  router.delete('/:bookingId', requireAuth, async (req, res, next) => {

    const booking = await booking.findByPk(req.params.bookingId);

    if (!booking) {
        let err = {};
        err.message = "booking couldn\'t be found";
        res.status(404);
        return res.json(err);
    }

    const { user } = req;
    if (user.id === booking.userId) {
        await booking.destroy();
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

module.exports = router;
