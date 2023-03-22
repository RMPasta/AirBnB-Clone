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

router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    let { user } = req;
    let { url } = req.body;
    let id = req.params.reviewId;

    const review = await Review.findByPk(id);

    if (!review) {
        let err = {};
        err.message = "Review couldn\'t be found";
        res.status(404);
        return res.json(err);
    }

    let reviewImages = await ReviewImage.findAll({
        where: { reviewId: id }
    })
    let imageArr = [];
    reviewImages.forEach(image => {
        imageArr.push(image.toJSON());
    })

    if (imageArr.length >= 10) {
        let err = {};
        err.message = "Maximum number of images for this resource was reached";
        res.status(403);
        return res.json(err);
    }

    if (user.id === review.userId) {
        const  image = await ReviewImage.create({
            reviewId: id,
            url,
        });
        res.json({
            id: image.id,
            url: image.url,
        })
    } else {
        let err = {};
        err.message = "Forbidden";
        err.status = 403;
        next(err)
    };
})

module.exports = router;
