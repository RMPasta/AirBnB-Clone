const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Review, User, Spot, ReviewImage, SpotImage } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


router.get('/current', requireAuth, async (req, res, next) => {
    const currentUserId = req.user.id;
    let reviews = await Review.findAll({
        where: {userId: currentUserId},
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            },
        ]
    });
    let reviewList = [];
    reviews.forEach(review => {
        reviewList.push(review.toJSON())
    })
    for (let i = 0; i < reviewList.length; i++) {
        let review = reviewList[i];
        const spotImage = await SpotImage.findOne({
            where: {spotId: review.spotId},
            attributes: ['url']
        });
        review.Spot.previewImage = spotImage.url;
        delete review.Spot.createdAt;
        delete review.Spot.updatedAt;
    }
    res.json({ Reviews: reviewList })
});



module.exports = router;
